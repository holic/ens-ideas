import type { NextApiRequest, NextApiResponse } from "next";
import { isAddress, getAddress, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETHEREUM_RPC_URL),
});

const firstParam = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param;
};

const resolve = (from: string, to: string) => {
  const resolvedUrl = new URL(to, new URL(from, "resolve://"));
  if (resolvedUrl.protocol === "resolve:") {
    const { pathname, search, hash } = resolvedUrl;
    return `${pathname}${search}${hash}`;
  }
  return resolvedUrl.toString();
};

type Data = {
  address: string | null;
  name: string | null;
  displayName: string;
  avatar: string | null;
  error?: string;
};

const resolveAddress = async (
  lowercaseAddress: string,
  res: NextApiResponse<Data>
) => {
  const start = Date.now();
  const address = getAddress(lowercaseAddress);
  let displayName = address.replace(
    /^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i,
    "$1…$2"
  );

  try {
    const name = await publicClient.getEnsName({ address });
    if (name) {
      displayName = name;
    }

    const avatar = name
      ? await publicClient.getEnsAvatar({ name: normalize(name) })
      : null;

    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .setHeader("X-Resolve-Time", `${Date.now() - start}ms`)
      .json({ address, name, displayName, avatar });
  } catch (error: any) {
    res
      .status(500)
      .setHeader("X-Resolve-Time", `${Date.now() - start}ms`)
      .json({
        address,
        name: null,
        displayName,
        avatar: null,
        error: error.message,
      });
  }
};

const resolveName = async (name: string, res: NextApiResponse<Data>) => {
  const start = Date.now();
  const displayName = name;
  try {
    const [address, avatar] = await Promise.all([
      publicClient.getEnsAddress({ name: normalize(name) }),
      publicClient.getEnsAvatar({ name: normalize(name) }),
    ]);
    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .setHeader("X-Resolve-Time", `${Date.now() - start}ms`)
      .json({ address, name, displayName, avatar });
  } catch (error: any) {
    res
      .status(500)
      .setHeader("X-Resolve-Time", `${Date.now() - start}ms`)
      .json({
        address: null,
        name,
        displayName,
        avatar: null,
        error: error.message,
      });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const inputAddress = firstParam(req.query.address);
  const lowercaseAddress = inputAddress.toLowerCase();

  if (inputAddress !== lowercaseAddress) {
    return res.redirect(307, resolve(req.url!, lowercaseAddress));
  }

  return isAddress(lowercaseAddress)
    ? resolveAddress(lowercaseAddress, res)
    : resolveName(lowercaseAddress, res);
}

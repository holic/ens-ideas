// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddress } from "@ethersproject/address";
import url from "url";

// Cloudflare ETH node has a 1k req/minute limit
const provider = new StaticJsonRpcProvider("https://cloudflare-eth.com");

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

type Data =
  | {
      address: string;
      name: string | null;
      displayName: string;
      avatar: string | null;
    }
  | { address: string; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const inputAddress = firstParam(req.query.address);
  const address = getAddress(inputAddress.toLowerCase());

  if (address !== inputAddress) {
    return res.redirect(308, resolve(req.url!, address));
  }

  try {
    const name = await provider.lookupAddress(address);
    const displayName =
      name ||
      address.replace(/^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i, "$1…$2");

    const avatar = name ? await provider.getAvatar(name) : null;

    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .json({ address, name, displayName, avatar });
  } catch (error: any) {
    res.status(500).json({ address, error: error.message });
  }
}

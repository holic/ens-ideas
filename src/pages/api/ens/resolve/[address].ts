// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

const provider = new StaticJsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

const firstParam = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param;
};

type Data =
  | {
      address: string;
      name: string | null;
      avatar: string | null;
    }
  | { address: string; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = firstParam(req.query.address);

  try {
    const name = await provider.lookupAddress(address);
    const avatar = name ? await provider.getAvatar(name) : null;

    res
      .status(200)
      .setHeader(
        "Cloudflare-CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .setHeader(
        "X-Sent-Cloudflare-CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .json({ address, name, avatar });
  } catch (error: any) {
    res.status(500).json({ address, error: error.message });
  }
}

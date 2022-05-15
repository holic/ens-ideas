// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddress, isAddress } from "@ethersproject/address";
import url from "url";

const provider = new StaticJsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

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
  description: string | null;
  url: string | null;
  twitter: string | null;
  github: string | null;
  telegram: string | null;
  email: string | null;
  error?: string;
};

const resolveAddress = async (
  lowercaseAddress: string,
  res: NextApiResponse<Data>,
  requestsRecords: boolean
) => {
  const address = getAddress(lowercaseAddress);
  let displayName = address.replace(
    /^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i,
    "$1…$2"
  );

  try {
    const name = await provider.lookupAddress(address);
    if (name) {
      displayName = name;
    }

    const avatar = name ? await provider.getAvatar(name) : null;

    let resolver;

    if (requestsRecords) {
      resolver = name ? await provider.getResolver(name) : null;
    }

    const description = resolver ? await resolver.getText('description') : null;
    const url = resolver ? await resolver.getText('url') : null;
    const twitter = resolver ? await resolver.getText('com.twitter') : null;
    const github = resolver ? await resolver.getText('com.github') : null;
    const telegram = resolver ? await resolver.getText('org.telegram') : null;
    const email = resolver ? await resolver.getText('email') : null;

    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .json({ address, name, displayName, avatar, description, url, twitter, github, telegram, email });
  } catch (error: any) {
    res.status(500).json({
      address,
      name: null,
      displayName,
      avatar: null,
      description: null,
      url: null,
      twitter: null,
      github: null,
      telegram: null,
      email: null,
      error: error.message,
    });
  }
};

const resolveName = async (
  name: string,
  res: NextApiResponse<Data>,
  requestsRecords: boolean
) => {
  const displayName = name;
  try {
    const address = await provider.resolveName(name);
    const avatar = await provider.getAvatar(name);
    
    let resolver;

    if (requestsRecords) {
      resolver = name ? await provider.getResolver(name) : null;
    }
    
    const description = resolver ? await resolver.getText('description') : null;
    const url = resolver ? await resolver.getText('url') : null;
    const twitter = resolver ? await resolver.getText('com.twitter') : null;
    const github = resolver ? await resolver.getText('com.github') : null;
    const telegram = resolver ? await resolver.getText('org.telegram') : null;
    const email = resolver ? await resolver.getText('email') : null;

    res
      .status(200)
      .setHeader(
        "CDN-Cache-Control",
        `s-maxage=${60 * 60 * 24}, stale-while-revalidate`
      )
      .json({ address, name, displayName, avatar, description, url, twitter, github, telegram, email });
  } catch (error: any) {
    res.status(500).json({
      address: null,
      name,
      displayName,
      avatar: null,
      description: null,
      url: null,
      twitter: null,
      github: null,
      telegram: null,
      email: null,
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

  const requestsRecords = req.query.full !== undefined;

  return isAddress(lowercaseAddress)
    ? resolveAddress(lowercaseAddress, res, requestsRecords)
    : resolveName(lowercaseAddress, res, requestsRecords);
}

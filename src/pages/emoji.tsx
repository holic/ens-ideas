import type { NextPage } from "next";
import emojis from "../emoji.json";
import { graph } from "../urql";
import { gql } from "urql";
// @ts-ignore
import { DateTime } from "luxon";
import useAsync from "react-use/lib/useAsync"; // https://github.com/streamich/react-use/pull/2101
import chunk from "lodash/chunk";
import flatten from "lodash/flatten";
import classNames from "classnames";
import { Header } from "../Header";
import Head from "next/head";

const BulkRegistrationQuery = gql`
  query BulkRegistrationQuery($names: [String!]!, $earliestExpiry: Int!) {
    registrations(
      where: { labelName_in: $names, expiryDate_gt: $earliestExpiry }
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

// Registrations subgraph includes expired domains, but we can filter them out
// with an `expiryDate` filter to account for the 90 day grace period.
//
// We set this up here so that `useQuery` can cache for the duration of the session.
const earliestExpiry = Math.floor(
  DateTime.now().minus({ days: 90 }).toSeconds()
);

type EmojiProps = {
  emoji: string;
  isPending: boolean;
  isRegistered: boolean;
};

const Emoji = ({ emoji, isPending, isRegistered }: EmojiProps) => (
  <a
    href={`https://app.ens.domains/name/${encodeURIComponent(`${emoji}.eth`)}`}
    target="_blank"
    rel="noreferrer"
    className={classNames(
      "p-8 flex flex items-center justify-center leading-none rounded-xl hover:opacity-100 transition",
      (() => {
        if (isPending) {
          return "animate-pulse";
        }
        if (isRegistered) {
          return "opacity-50 hover:bg-red-400 hover:bg-opacity-50";
        }
        return "bg-green-400 bg-opacity-50 hover:bg-opacity-80";
      })()
    )}
  >
    <span className="text-5xl">{emoji}</span>
    <span>.eth</span>
  </a>
);

const EmojiPage: NextPage = () => {
  const { value, loading } = useAsync(async (): Promise<string[]> => {
    return flatten(
      await Promise.all(
        chunk(emojis, 100).map(async (names) => {
          const { data } = await graph
            .query(BulkRegistrationQuery, {
              names,
              earliestExpiry,
            })
            .toPromise();
          const registrations = data.registrations.map(
            (registration: any) => registration.labelName
          );
          return registrations;
        })
      )
    );
  });

  return (
    <>
      <Head>
        <title>Available emoji .eth domains</title>

        <meta name="og:title" content="Available emoji .eth domains" />
        <meta name="og:url" content="https://ensideas.com/emoji" />
        <meta
          name="og:description"
          content={`Check which of the ${emojis.length.toLocaleString()} emoji .eth domains are still available to register. 👀`}
        />
        <meta name="og:image" content="https://ensideas.com/twitter-card.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@frolic" />
      </Head>
      <div className="w-screen min-h-screen flex flex-col bg-indigo-400 text-indigo-900 sm:pt-12 px-4 sm:px-12 pb-40 space-y-12">
        <Header />
        <div>
          <h1 className="text-4xl font-medium leading-tight">
            Available emoji .eth domains
          </h1>
          <p className="text-lg text-indigo-700">
            There are {emojis.length.toLocaleString()} emojis that are
            considered valid ENS names.{" "}
            {value ? (
              <>
                <span className="pb-1 border-b-4 border-green-400 border-opacity-50">
                  {(emojis.length - value.length).toLocaleString()} of them are
                  available!
                </span>{" "}
                👀
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emojis.map((emoji) => (
            <Emoji
              key={emoji}
              emoji={emoji}
              isPending={loading || !value}
              isRegistered={value ? value.includes(emoji) : false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EmojiPage;

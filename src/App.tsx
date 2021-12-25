import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRegistration } from "./useRegistration";
// @ts-ignore
import { normalize } from "@ensdomains/eth-ens-namehash";
import { useRecentRegistrations } from "./useRecentRegistrations";
import { RelativeTime } from "./RelativeTime";
import { DateTime } from "luxon";

const toYears = (from: DateTime, to: DateTime): string => {
  const seconds = to.toSeconds() - from.toSeconds();
  const years = Math.round(seconds / (60 * 60 * 24 * 365));
  return years === 1 ? "1 year" : `${years} years`;
};

export const App = () => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const recentRegistrations = useRecentRegistrations();

  useEffect(() => {
    try {
      setName(
        normalize(
          query
            .replace(/[\s\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]/g, "")
            .replace(/^-+|-+$/g, "")
        )
      );
    } catch (error) {}
  }, [query]);

  const { isRegistered, registration, error, fetching } = useRegistration(name);

  const url = `https://app.ens.domains/name/${encodeURIComponent(
    `${name}.eth`
  )}`;

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col bg-indigo-400 text-indigo-900 pb-40">
        <div className="container mx-auto sm:py-4 md:py-8 lg:py-12">
          <div className="px-4 space-y-8 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-end">
                <div className="text-xl text-white font-semibold bg-indigo-500 px-3 py-1 rounded-b-xl sm:rounded-t-xl">
                  ENS Ideas 🤔
                </div>
                <div className="text-indigo-700">
                  by{" "}
                  <a
                    href="https://twitter.com/frolic"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-900 hover:underline"
                  >
                    frolic.eth
                  </a>
                </div>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  window.open(url, "_blank");
                }}
                className="-mx-2"
              >
                <input
                  className="w-full outline-none transition bg-white text-indigo-800 focus:ring-4 focus:ring-indigo-500 rounded-full px-6 py-3 text-2xl sm:text-3xl"
                  placeholder="Search .eth domains"
                  value={query}
                  onChange={(event) => {
                    event.preventDefault();
                    try {
                      setQuery(event.currentTarget.value);
                    } catch (error) {}
                  }}
                  autoFocus
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  minLength={3}
                />
              </form>

              {name !== "" ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={classNames(
                    "block p-6 rounded-xl hover:translate-x-1 text-white transition",
                    (() => {
                      if (name !== "" && !fetching && isRegistered === true) {
                        return "bg-red-600 bg-opacity-80 hover:bg-red-700 hover:bg-opacity-80";
                      }
                      if (name !== "" && !fetching && isRegistered === false) {
                        return "bg-green-700 bg-opacity-80 hover:bg-green-800 hover:bg-opacity-80";
                      }
                      return "animate-pulse opacity-70";
                    })()
                  )}
                >
                  <span className="flex gap-4 justify-between text-3xl sm:text-4xl font-semibold">
                    <span className="group-hover:underline">{name}.eth</span>
                    <span>&rarr;</span>
                  </span>
                  {registration ? (
                    <span className="block opacity-80">
                      registered{" "}
                      <RelativeTime
                        date={DateTime.fromSeconds(
                          +registration.registrationDate
                        )}
                      />
                      , expires{" "}
                      <RelativeTime
                        date={DateTime.fromSeconds(+registration.expiryDate)}
                      />
                    </span>
                  ) : null}
                </a>
              ) : null}
            </div>

            <div className="overflow-hidden space-y-1 text-indigo-700 relative">
              {recentRegistrations.map((registration) => (
                <div key={registration.name}>
                  <a
                    href={`https://app.ens.domains/name/${encodeURIComponent(
                      registration.name
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-900 font-bold hover:underline"
                  >
                    {registration.name}
                  </a>{" "}
                  <span>
                    <span className="hidden sm:inline">was registered</span> for{" "}
                    {toYears(
                      registration.registrationDate,
                      registration.expiryDate
                    )}
                  </span>{" "}
                  ✨{" "}
                  <span className="hidden sm:inline opacity-40 px-2">
                    <RelativeTime date={registration.registrationDate} />
                  </span>
                </div>
              ))}
              <div className="fixed left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-indigo-400 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

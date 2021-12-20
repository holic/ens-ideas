import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRegistration } from "./useRegistration";
// @ts-ignore
import { normalize } from "@ensdomains/eth-ens-namehash";
import { useRecentRegistrations } from "./useRecentRegistrations";
import { RelativeTime } from "./RelativeTime";

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

  const { isRegistered, error, fetching } = useRegistration(name);

  const url = `https://app.ens.domains/name/${encodeURIComponent(
    `${name}.eth`
  )}`;

  return (
    <>
      <div className="w-screen h-screen flex flex-col bg-indigo-400 text-indigo-900">
        <div className="container mx-auto sm:py-4 md:py-8 lg:py-12">
          <div className="px-4 space-y-6 md:space-y-8 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
            <div className="space-y-2 md:space-y-4">
              <div className="flex flex-wrap justify-between items-end">
                <div className="text-xl text-white font-semibold bg-indigo-500 px-3 py-1 rounded-b-xl sm:rounded-t-xl">
                  ENS Ideas 🤔
                </div>
                <div className="text-indigo-700">
                  by{" "}
                  <a
                    href="https://twitter.com/frolic"
                    target="_blank"
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
            </div>

            {name !== "" ? (
              <a
                href={url}
                target="_blank"
                className={classNames(
                  "flex flex-wrap gap-6 justify-between p-6 text-3xl sm:text-4xl font-semibold rounded-xl hover:translate-x-1 text-white transition",
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
                <span className="flex flex-col flex">
                  <span className="group-hover:underline">{name}.eth</span>
                </span>
                <span className="">&rarr;</span>
              </a>
            ) : null}

            <div className="h-60 overflow-hidden text-indigo-700 flex flex-col gap-1 relative">
              {recentRegistrations.slice(0, 20).map((registration) => (
                <div key={registration.name}>
                  <a
                    href={`https://app.ens.domains/name/${encodeURIComponent(
                      `${registration.name}.eth`
                    )}`}
                    target="_blank"
                    className="text-indigo-900 font-bold hover:underline"
                  >
                    {registration.name}.eth
                  </a>{" "}
                  <span className="hidden sm:inline">was registered</span>{" "}
                  <RelativeTime date={registration.date} /> ✨
                </div>
              ))}
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-indigo-400"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

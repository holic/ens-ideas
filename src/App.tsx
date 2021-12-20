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
      setName(normalize(query.replace(/\s/g, "")));
    } catch (error) {}
  }, [query]);

  const { isRegistered, error, fetching } = useRegistration(name);
  const nameClassName = (() => {
    if (!fetching) {
      return isRegistered ? "text-red-500" : "text-green-500";
    }
    return "text-gray-500 animate-pulse";
  })();

  const url = `https://app.ens.domains/name/${encodeURIComponent(
    `${name}.eth`
  )}`;

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center bg-indigo-400">
      <div className="w-2/3 px-4 text-2xl text-indigo-900 font-bold">
        ENS Ideas 🤔
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          window.open(url, "_blank");
        }}
        className="w-2/3 flex flex-col flex-wrap gap-8 transition p-10 bg-white text-gray-600 rounded-xl shadow-2xl"
      >
        <input
          type="search"
          className="outline-none border-4 border-gray-200 focus:border-blue-300 rounded-full px-6 py-3 text-3xl"
          placeholder="Find a .eth domain"
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
        <div className="p-6 text-4xl font-bold">
          {name !== "" ? (
            <a
              href={url}
              target="_blank"
              className={classNames(
                "group flex flex-wrap gap-6 items-center justify-between",
                nameClassName
              )}
            >
              <span className="group-hover:underline">{name}.eth</span>{" "}
              <span className="">&rarr;</span>
            </a>
          ) : (
            <>&nbsp;</>
          )}
        </div>
      </form>
      <div className="w-2/3 h-60 overflow-hidden p-4 text-indigo-700 flex flex-col gap-1 relative">
        {recentRegistrations.map((registration) => (
          <div key={registration.name}>
            <span className="text-indigo-900 font-bold">
              {registration.name}.eth
            </span>{" "}
            was registered <RelativeTime date={registration.date} />. ✨
          </div>
        ))}
        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-indigo-400"></div>
      </div>
    </div>
  );
};

import { useState } from "react";
import classNames from "classnames";
import { useRegistration } from "./useRegistration";

export const App = () => {
  const [query, setQuery] = useState("");

  const { isRegistered, error, fetching } = useRegistration(query);

  const url = `https://app.ens.domains/name/${encodeURIComponent(
    `${query}.eth`
  )}`;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-indigo-400">
      <form
        action={url}
        target="_blank"
        className="w-2/3 flex flex-col flex-wrap gap-8 transition p-10 bg-white text-gray-600 rounded-xl shadow-2xl"
      >
        <input
          className="outline-none border-4 border-gray-200 focus:border-blue-300 rounded-full px-6 py-3 text-3xl"
          placeholder="Find a .eth domain"
          value={query}
          onChange={(event) => {
            event.preventDefault();
            setQuery(
              event.currentTarget.value
                // TODO: support emoji
                // TODO: normalize domain with some library
                .replace(/[^\w-]/g, "")
                .replace(/_/g, "")
                .toLocaleLowerCase()
            );
          }}
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
        <div className="p-6 text-4xl font-bold">
          {query !== "" ? (
            <a
              href={url}
              target="_blank"
              className={classNames(
                "group flex flex-wrap gap-6 items-center justify-between",
                {
                  "text-gray-500 animate-pulse": fetching || error,
                  "text-green-500": !fetching && !isRegistered,
                  "text-red-500": !fetching && isRegistered,
                }
              )}
            >
              <span className="group-hover:underline">{query}.eth</span>{" "}
              <span className="">&rarr;</span>
            </a>
          ) : (
            <>&nbsp;</>
          )}
        </div>
      </form>
    </div>
  );
};

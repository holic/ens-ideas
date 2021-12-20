import { JsonRpcProvider } from "@ethersproject/providers";
import { ETHRegistrarController__factory } from "../typechain-types";
import { useAsync } from "react-use";
import { useState } from "react";
import classNames from "classnames";
import createStore from "zustand";

const provider = new JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

const contract = ETHRegistrarController__factory.connect(
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
  provider
);

type Store = {
  availability: Partial<Record<string, Promise<boolean>>>;
};

const useStore = createStore<Store>(() => ({
  availability: {},
}));

export const App = () => {
  const [query, setQuery] = useState("");
  const availability = useStore((state) => state.availability[query]);

  const state = useAsync(async () => {
    if (availability) return availability;
    const promise = contract.available(query);
    useStore.setState((state) => ({
      availability: {
        ...state.availability,
        [query]: promise,
      },
    }));
    return promise;
  }, [query]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-indigo-400">
      <div className="w-2/3 flex flex-col flex-wrap gap-8 transition p-10 bg-white text-gray-600 rounded-xl shadow-2xl">
        <input
          className="outline-none border-4 border-gray-200 focus:border-blue-300 rounded-full px-6 py-3 text-3xl"
          type="url"
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
        />
        <div className="p-6 text-4xl font-bold">
          {query !== "" ? (
            <a
              href={`https://app.ens.domains/name/${encodeURIComponent(
                `${query}.eth`
              )}`}
              target="_blank"
              className={classNames(
                "group flex flex-wrap gap-6 items-center justify-between",
                {
                  "text-gray-500 animate-pulse": state.loading || state.error,
                  "text-green-500": !state.loading && state.value,
                  "text-red-500": !state.loading && !state.value,
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
      </div>
    </div>
  );
};

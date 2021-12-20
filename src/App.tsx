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
    <div className="p-10 text-4xl">
      <input
        className="border-2"
        value={query}
        onChange={(event) => {
          event.preventDefault();
          setQuery(event.currentTarget.value);
        }}
      />
      {query !== "" ? (
        <div
          className={classNames({
            "text-gray-500": state.loading || state.error,
            "text-green-500": !state.loading && state.value,
            "text-red-500": !state.loading && !state.value,
          })}
        >
          {query}.eth
        </div>
      ) : null}
    </div>
  );
};

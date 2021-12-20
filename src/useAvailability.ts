import { JsonRpcProvider } from "@ethersproject/providers";
import { ETHRegistrarController__factory } from "../typechain-types";
import createStore from "zustand";
import useAsync from "react-use/lib/useAsync"; // https://github.com/streamich/react-use/pull/2101

const provider = new JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

const contract = ETHRegistrarController__factory.connect(
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
  provider
);

type Store = {
  names: Partial<Record<string, Promise<boolean>>>;
};

const useStore = createStore<Store>(() => ({
  names: {},
}));

export const useAvailability = (name: string) => {
  const result = useStore((state) => state.names[name]);

  return useAsync(async () => {
    if (result) return result;

    const promise = contract.available(name);

    useStore.setState((state) => ({
      names: {
        ...state.names,
        [name]: promise,
      },
    }));

    return promise;
  }, [name, result]);
};

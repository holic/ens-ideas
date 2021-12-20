import { JsonRpcProvider } from "@ethersproject/providers";
import { ETHRegistrarController__factory } from "../typechain-types";
import createStore from "zustand";
import { DateTime } from "luxon";

const provider = new JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

const contract = ETHRegistrarController__factory.connect(
  "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
  provider
);

type Registration = {
  name: string;
  date: DateTime;
};

type Store = {
  registrations: Registration[];
};

const useStore = createStore<Store>(() => ({
  registrations: [],
}));

const filter = contract.filters.NameRegistered();

contract.on(filter, (name) => {
  console.log("new name registered:", name);
  useStore.setState((state) => ({
    registrations: [{ name, date: DateTime.now() }, ...state.registrations],
  }));
});

export const useRecentRegistrations = () => {
  return useStore((state) => state.registrations);
};

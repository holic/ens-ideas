/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ETHRegistrarControllerInterface extends utils.Interface {
  functions: {
    "MIN_REGISTRATION_DURATION()": FunctionFragment;
    "available(string)": FunctionFragment;
    "commit(bytes32)": FunctionFragment;
    "commitments(bytes32)": FunctionFragment;
    "isOwner()": FunctionFragment;
    "makeCommitment(string,address,bytes32)": FunctionFragment;
    "makeCommitmentWithConfig(string,address,bytes32,address,address)": FunctionFragment;
    "maxCommitmentAge()": FunctionFragment;
    "minCommitmentAge()": FunctionFragment;
    "owner()": FunctionFragment;
    "register(string,address,uint256,bytes32)": FunctionFragment;
    "registerWithConfig(string,address,uint256,bytes32,address,address)": FunctionFragment;
    "renew(string,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rentPrice(string,uint256)": FunctionFragment;
    "setCommitmentAges(uint256,uint256)": FunctionFragment;
    "setPriceOracle(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "valid(string)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "MIN_REGISTRATION_DURATION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "available", values: [string]): string;
  encodeFunctionData(functionFragment: "commit", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "commitments",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "makeCommitment",
    values: [string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "makeCommitmentWithConfig",
    values: [string, string, BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "maxCommitmentAge",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minCommitmentAge",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerWithConfig",
    values: [string, string, BigNumberish, BytesLike, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renew",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rentPrice",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setCommitmentAges",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPriceOracle",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "valid", values: [string]): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "MIN_REGISTRATION_DURATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "available", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "commit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "commitments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeCommitment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "makeCommitmentWithConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxCommitmentAge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minCommitmentAge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerWithConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renew", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rentPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setCommitmentAges",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPriceOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "valid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "NameRegistered(string,bytes32,address,uint256,uint256)": EventFragment;
    "NameRenewed(string,bytes32,uint256,uint256)": EventFragment;
    "NewPriceOracle(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NameRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NameRenewed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPriceOracle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type NameRegisteredEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  {
    name: string;
    label: string;
    owner: string;
    cost: BigNumber;
    expires: BigNumber;
  }
>;

export type NameRegisteredEventFilter = TypedEventFilter<NameRegisteredEvent>;

export type NameRenewedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  { name: string; label: string; cost: BigNumber; expires: BigNumber }
>;

export type NameRenewedEventFilter = TypedEventFilter<NameRenewedEvent>;

export type NewPriceOracleEvent = TypedEvent<[string], { oracle: string }>;

export type NewPriceOracleEventFilter = TypedEventFilter<NewPriceOracleEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ETHRegistrarController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ETHRegistrarControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;

    available(name: string, overrides?: CallOverrides): Promise<[boolean]>;

    commit(
      commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commitments(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isOwner(overrides?: CallOverrides): Promise<[boolean]>;

    makeCommitment(
      name: string,
      owner: string,
      secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    makeCommitmentWithConfig(
      name: string,
      owner: string,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    maxCommitmentAge(overrides?: CallOverrides): Promise<[BigNumber]>;

    minCommitmentAge(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    register(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renew(
      name: string,
      duration: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rentPrice(
      name: string,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setCommitmentAges(
      _minCommitmentAge: BigNumberish,
      _maxCommitmentAge: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPriceOracle(
      _prices: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    valid(name: string, overrides?: CallOverrides): Promise<[boolean]>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  available(name: string, overrides?: CallOverrides): Promise<boolean>;

  commit(
    commitment: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commitments(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  isOwner(overrides?: CallOverrides): Promise<boolean>;

  makeCommitment(
    name: string,
    owner: string,
    secret: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  makeCommitmentWithConfig(
    name: string,
    owner: string,
    secret: BytesLike,
    resolver: string,
    addr: string,
    overrides?: CallOverrides
  ): Promise<string>;

  maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

  minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  register(
    name: string,
    owner: string,
    duration: BigNumberish,
    secret: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerWithConfig(
    name: string,
    owner: string,
    duration: BigNumberish,
    secret: BytesLike,
    resolver: string,
    addr: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renew(
    name: string,
    duration: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rentPrice(
    name: string,
    duration: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setCommitmentAges(
    _minCommitmentAge: BigNumberish,
    _maxCommitmentAge: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPriceOracle(
    _prices: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceID: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  valid(name: string, overrides?: CallOverrides): Promise<boolean>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    available(name: string, overrides?: CallOverrides): Promise<boolean>;

    commit(commitment: BytesLike, overrides?: CallOverrides): Promise<void>;

    commitments(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<boolean>;

    makeCommitment(
      name: string,
      owner: string,
      secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    makeCommitmentWithConfig(
      name: string,
      owner: string,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<string>;

    maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

    minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    register(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    registerWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renew(
      name: string,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rentPrice(
      name: string,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setCommitmentAges(
      _minCommitmentAge: BigNumberish,
      _maxCommitmentAge: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPriceOracle(_prices: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    valid(name: string, overrides?: CallOverrides): Promise<boolean>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "NameRegistered(string,bytes32,address,uint256,uint256)"(
      name?: null,
      label?: BytesLike | null,
      owner?: string | null,
      cost?: null,
      expires?: null
    ): NameRegisteredEventFilter;
    NameRegistered(
      name?: null,
      label?: BytesLike | null,
      owner?: string | null,
      cost?: null,
      expires?: null
    ): NameRegisteredEventFilter;

    "NameRenewed(string,bytes32,uint256,uint256)"(
      name?: null,
      label?: BytesLike | null,
      cost?: null,
      expires?: null
    ): NameRenewedEventFilter;
    NameRenewed(
      name?: null,
      label?: BytesLike | null,
      cost?: null,
      expires?: null
    ): NameRenewedEventFilter;

    "NewPriceOracle(address)"(
      oracle?: string | null
    ): NewPriceOracleEventFilter;
    NewPriceOracle(oracle?: string | null): NewPriceOracleEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    MIN_REGISTRATION_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    available(name: string, overrides?: CallOverrides): Promise<BigNumber>;

    commit(
      commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commitments(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<BigNumber>;

    makeCommitment(
      name: string,
      owner: string,
      secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    makeCommitmentWithConfig(
      name: string,
      owner: string,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

    minCommitmentAge(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    register(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renew(
      name: string,
      duration: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rentPrice(
      name: string,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setCommitmentAges(
      _minCommitmentAge: BigNumberish,
      _maxCommitmentAge: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPriceOracle(
      _prices: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    valid(name: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    MIN_REGISTRATION_DURATION(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    available(
      name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commit(
      commitment: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commitments(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    makeCommitment(
      name: string,
      owner: string,
      secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    makeCommitmentWithConfig(
      name: string,
      owner: string,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxCommitmentAge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minCommitmentAge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    register(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerWithConfig(
      name: string,
      owner: string,
      duration: BigNumberish,
      secret: BytesLike,
      resolver: string,
      addr: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renew(
      name: string,
      duration: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rentPrice(
      name: string,
      duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setCommitmentAges(
      _minCommitmentAge: BigNumberish,
      _maxCommitmentAge: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPriceOracle(
      _prices: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    valid(
      name: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

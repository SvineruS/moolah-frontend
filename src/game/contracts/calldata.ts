import { Address, encodeFunctionData } from "viem";
import { ACTIONS_ABI } from "./abi.ts";
import { SolidityBytes } from "abitype/src/abi.ts";
import { ContractOrder } from "../../types/marketplace.ts";


export const register = (referrer: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'player_register',
  args: [referrer]
});

export const setRelayer = (relayer: Address, tgId: bigint, sign: SolidityBytes) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'metatx_setRelayer',
  args: [relayer, tgId, sign]
});

export const addCows = (pastureAddress: Address, cowId: bigint, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_addCows',
  args: [pastureAddress, cowId, count]
});

export const claimMilk = (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_claimMilk',
  args: [pastureAddress]
});

export const feedCows = (pastureAddress: Address, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_feedCows',
  args: [pastureAddress, count]
});

export const useApple = (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_useApple',
  args: [pastureAddress]
});

export const upgradePasture = (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_upgrade',
  args: [pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier]
});

export const supplyCratesClaim = () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'supplyCrates_claim',
  args: []
});


export const exchangeCraft = (recipeIndex: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_craft',
  args: [recipeIndex]
});


export const exchangeClaim = () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_claim',
  args: []
});


export const marketplaceAcceptOrder = (order: ContractOrder, signature: string) => encodeFunctionData(
  {
    abi: ACTIONS_ABI,
    functionName: 'marketplace_acceptOrder',
    args: [order, signature]
  }
);

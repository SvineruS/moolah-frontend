import { Address, encodeFunctionData } from "viem";
import { ACTIONS_ABI } from "./abi.ts";
import { SolidityBytes } from "abitype/src/abi.ts";


export const register = async (referrer: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'player_register',
  args: [referrer]
});

export const setRelayer = async (relayer: Address, tgId: bigint, sign: SolidityBytes) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'metatx_setRelayer',
  args: [relayer, tgId, sign]
});

export const addCows = async (pastureAddress: Address, cowId: bigint, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_addCows',
  args: [pastureAddress, cowId, count]
});

export const claimMilk = async (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_claimMilk',
  args: [pastureAddress]
});

export const feedCows = async (pastureAddress: Address, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_feedCows',
  args: [pastureAddress, count]
});

export const useApple = async (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_useApple',
  args: [pastureAddress]
});

export const upgradePasture = async (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_upgrade',
  args: [pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier]
});

export const supplyCratesClaim = async () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'supplyCrates_claim',
  args: []
});


export const exchangeCraft = async (recipeIndex: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_craft',
  args: [recipeIndex]
});


export const exchangeClaim = async () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_claim',
  args: []
});

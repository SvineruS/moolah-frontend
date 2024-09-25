import { _backend } from "./backend/_backend.ts";
import { Address, encodeFunctionData } from "viem";
import { ACTIONS_ABI } from "./contracts/abi.ts";


export class GameActions {
  constructor(public auth: string) {
  }

  register = async (referrer: Address) =>
    this.action(await register(referrer));

  // note: can be only called by wallet, cos relay is not set yet!
  setRelayer = async (relayer: Address) =>
    this.action(await setRelayer(relayer));

  addCows = async (pastureAddress: Address, cowId: bigint, count: bigint) =>
    this.action(await addCows(pastureAddress, cowId, count));

  claimMilk = async (pastureAddress: Address) =>
    this.action(await claimMilk(pastureAddress));

  feedCows = async (pastureAddress: Address, count: bigint) =>
    this.action(await feedCows(pastureAddress, count));

  useApple = async (pastureAddress: Address) =>
    this.action(await useApple(pastureAddress));

  upgradePasture = async (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) =>
    this.action(await upgradePasture(pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier));

  supplyCratesClaim = async () => this.action(await supplyCratesClaim());

  exchangeCraft = async (recipeIndex: number) => this.action(await exchangeCraft(recipeIndex));
  exchangeClaim = async () => this.action(await exchangeClaim());

  async action(calldata: string) {
    // todo: depending on user preferences, use backend OR send transaction via wallet
    return _backend("/game/forwardRequest", { tgAuth: this.auth, calldata })
  }

}





const register = async (referrer: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'player_register',
  args: [referrer]
});

const setRelayer = async (relayer: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'metatx_setRelayer',
  args: [relayer]
});

const addCows = async (pastureAddress: Address, cowId: bigint, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_addCows',
  args: [pastureAddress, cowId, count]
});

const claimMilk = async (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_claimMilk',
  args: [pastureAddress]
});

const feedCows = async (pastureAddress: Address, count: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_feedCows',
  args: [pastureAddress, count]
});

const useApple = async (pastureAddress: Address) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_useApple',
  args: [pastureAddress]
});

const upgradePasture = async (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_upgrade',
  args: [pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier]
});

const supplyCratesClaim = async () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'supplyCrates_claim',
  args: []
});


const exchangeCraft = async (recipeIndex: bigint) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_craft',
  args: [recipeIndex]
});


const exchangeClaim = async () => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'exchanger_claim',
  args: []
});

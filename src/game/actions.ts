import { _backend } from "./backend/_backend.ts";
import { encodeFunctionData } from "viem";
import { ACTIONS_ABI } from "./contracts/abi.ts";


export class GameActions {
  constructor(public auth: string) {
  }

  register = async (referrer: string) =>
    this.action(await register(referrer));

  // note: can be only called by wallet, cos relay is not set yet!
  setRelayer = async (relayer: string) =>
    this.action(await setRelayer(relayer));

  addCows = async (pastureAddress: string, cowId: number, count: number) =>
    this.action(await addCows(pastureAddress, cowId, count));

  claimMilk = async (pastureAddress: string) =>
    this.action(await claimMilk(pastureAddress));

  feedCows = async (pastureAddress: string, count: number) =>
    this.action(await feedCows(pastureAddress, count));

  useApple = async (pastureAddress: string) =>
    this.action(await useApple(pastureAddress));

  upgradePasture = async (pastureAddress: string, cowCapacity: number, milkCapacity: number, milkRateMultiplier: number) =>
    this.action(await upgradePasture(pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier));


  async action(calldata: string) {
    // todo: depending on user preferences, use backend OR send transaction via wallet
    return _backend("/game/forwardRequest", { auth: this.auth, calldata })
  }

}





const register = async (referrer: string) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'player_register',
  args: [referrer]
});

const setRelayer = async (relayer: string) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'player_setRelayer',
  args: [relayer]
});

const addCows = async (pastureAddress: string, cowId: number, count: number) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_addCows',
  args: [pastureAddress, cowId, count]
});

const claimMilk = async (pastureAddress: string) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_claimMilk',
  args: [pastureAddress]
});

const feedCows = async (pastureAddress: string, count: number) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_feedCows',
  args: [pastureAddress, count]
});

const useApple = async (pastureAddress: string) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_useApple',
  args: [pastureAddress]
});

const upgradePasture = async (pastureAddress: string, cowCapacity: number, milkCapacity: number, milkRateMultiplier: number) => encodeFunctionData({
  abi: ACTIONS_ABI,
  functionName: 'pasture_upgrade',
  args: [pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier]
});

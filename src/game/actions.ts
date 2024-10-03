import { _backend } from "./backend/_backend.ts";
import { Address } from "viem";
import * as calldata from "./contracts/calldata.ts";
import { ContractOrderToSign } from "../types/marketplace.ts";
import { walletSendAction, walletSignOrder } from "./utils.ts";
import { SDKProvider } from "@metamask/sdk";

export class GameActions {
  constructor(
    public tgAuth: string,
    public walletProvider: SDKProvider,
    public useTg = true,
  ) {
  }

  register = async (referrer: Address = "0x0000000000000000000000000000000000000000") =>
    this.action(await calldata.register(referrer));

  // // note: can be only called by wallet, cos relay is not set yet!
  // setRelayer = async (relayer: Address) =>
  //   this.action(await calldata.setRelayer(relayer));

  addCows = async (pastureAddress: Address, cowId: bigint, count: bigint) =>
    this.action(await calldata.addCows(pastureAddress, cowId, count));

  claimMilk = async (pastureAddress: Address) =>
    this.action(await calldata.claimMilk(pastureAddress));

  feedCows = async (pastureAddress: Address, count: bigint) =>
    this.action(await calldata.feedCows(pastureAddress, count));

  useApple = async (pastureAddress: Address) =>
    this.action(await calldata.useApple(pastureAddress));

  upgradePasture = async (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) =>
    this.action(await calldata.upgradePasture(pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier));

  supplyCratesClaim = async () => this.action(await calldata.supplyCratesClaim());

  exchangeCraft = async (recipeIndex: number) => this.action(await calldata.exchangeCraft(recipeIndex));
  exchangeClaim = async () => this.action(await calldata.exchangeClaim());

  marketplaceSignOrder = async (order: ContractOrderToSign) => {
    if (this.useTg) {
      const { signature } = await _backend("/metatx/marketplaceSignOrder", { tgAuth: this.tgAuth, order })
      return signature;
    }
    return walletSignOrder(this.walletProvider, order);
  }


  async action(calldata: string) {
    // todo: depending on user preferences, use backend OR send transaction via wallet
    if (this.useTg)
      return _backend("/game/forwardRequest", { tgAuth: this.tgAuth, calldata })

    return walletSendAction(this.walletProvider, calldata);

  }

}


import { Address } from "viem";
import * as calldata from "./contracts/calldata.ts";
import { ContractOrder, ContractOrderToSign } from "../types/marketplace.ts";
import { walletSendAction, walletSignOrder } from "./utils.ts";
import { SDKProvider } from "@metamask/sdk";
import { forwardRequest, marketplaceSignOrder } from "./backend/methods.ts";

export class GameActions {
  constructor(
    public tgAuth: string,
    public walletProvider: SDKProvider,
    public useTg = true,
  ) {
  }

  register = async (referrer: Address = "0x0000000000000000000000000000000000000000") =>
    this.action(calldata.register(referrer));

  // // note: can be only called by wallet, cos relay is not set yet!
  // setRelayer = async (relayer: Address) =>
  //   this.action(calldata.setRelayer(relayer));

  addCows = async (pastureAddress: Address, cowId: bigint, count: bigint) =>
    this.action(calldata.addCows(pastureAddress, cowId, count));

  claimMilk = async (pastureAddress: Address) =>
    this.action(calldata.claimMilk(pastureAddress));

  feedCows = async (pastureAddress: Address, count: bigint) =>
    this.action(calldata.feedCows(pastureAddress, count));

  useApple = async (pastureAddress: Address) =>
    this.action(calldata.useApple(pastureAddress));

  upgradePasture = async (pastureAddress: Address, cowCapacity: bigint, milkCapacity: bigint, milkRateMultiplier: bigint) =>
    this.action(calldata.upgradePasture(pastureAddress, cowCapacity, milkCapacity, milkRateMultiplier));

  supplyCratesClaim = async () => this.action(calldata.supplyCratesClaim());

  exchangeCraft = async (recipeIndex: number) => this.action(calldata.exchangeCraft(recipeIndex));

  exchangeClaim = async () => this.action(calldata.exchangeClaim());

  marketplaceSignOrder = async (order: ContractOrderToSign) => {
    if (this.useTg) {
      const { signature } = await marketplaceSignOrder({ tgAuth: this.tgAuth, order })
      return signature;
    }
    return walletSignOrder(this.walletProvider, order);
  }

  marketplaceAcceptOrder = async (order: ContractOrder, signature: string) =>
    this.action(calldata.marketplaceAcceptOrder(order, signature));



  async action(calldata: string) {
    //  depending on user preferences, use backend OR send transaction via wallet
    if (this.useTg)
      return forwardRequest({ tgAuth: this.tgAuth, calldata })

    return walletSendAction(this.walletProvider, calldata);

  }

}


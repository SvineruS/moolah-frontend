import { ACTIONS_ADDRESS, eip712Params } from "./config.ts";
import { ContractOrder, ContractOrderToSign } from "../types/marketplace.ts";
import { SDKProvider } from "@metamask/sdk";


export async function walletSignOrder(provider: SDKProvider, order: ContractOrder) {
  const orderToSign: ContractOrderToSign = {
    you: order.seller,
    give: order.buy,
    receive: order.sell,
    validUntil: order.validUntil,
    salt: order.salt,
  }
  // await sdk?.connect();
  return await send_eth_signTypedData_v4(provider!, orderToSign);
}

export async function walletSendAction(provider: SDKProvider, calldata: string) {
  return await provider.request({
    method: 'eth_sendTransaction',
    params: [{
      to: ACTIONS_ADDRESS,
      from: provider.getSelectedAddress(),
      value: '0',
      calldata
    }],
  });
}


const send_eth_signTypedData_v4 = async (provider: any, message: any) => {
  const msgParams = JSON.stringify({ ...eip712Params, message });
  const from = provider.getSelectedAddress();
  if (!from) {
    alert(`Invalid account -- please connect using eth_requestAccounts first`);
    return;
  }
  const params = [from, msgParams];

  try {
    return await provider.request({ method: 'eth_signTypedData_v4', params });
  } catch (e) {
    console.log(e);
    return "Error: " + e.message;
  }
};


export const generateRandomBytes = () => {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);

  const toHexString = (byteArray) => {
    // eslint-disable-next-line
    // @ts-ignore
    return Array.from(byteArray, byte => ('0' + byte.toString(16)).slice(-2)).join('');
  };
  return "0x" + toHexString(randomBytes);
};

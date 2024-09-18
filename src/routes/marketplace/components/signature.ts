import { eip712Params } from "../../../game/config.ts";
import { OrderItems } from "../../../types/marketplace.ts";


export async function sign(sdk: MetaMaskSDK, provider: SDKProvider, you: string, give: OrderItems, receive: OrderItems, salt: string, validUntil: number) {
    const orderToSign = {you, give, receive, validUntil, salt};
    await sdk?.connect();
    return await send_eth_signTypedData_v4(provider!, orderToSign);
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

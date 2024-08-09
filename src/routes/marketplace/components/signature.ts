import { eip712Params } from "../../../config/config.ts";
import { OrderItems } from "../../../backend/marketplace.ts";


export async function sign(sdk: MetaMaskSDK, provider: SDKProvider, you: string, give: OrderItems, receive: OrderItems, salt: string) {
    const orderToSign = {you, give, receive, salt};
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

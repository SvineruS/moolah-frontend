import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { Order, OrderItems, submitOrder } from "../../backend/marketplace.ts";
import { sign } from "./components/signature.ts";
import InputOrderItems from "./components/InputOrderItems.tsx";

export type OrderType = "fixed-price" | "auction-quickbuy" | "auction";



export default function CreateOrder() {
    const { sdk, provider, account } = useSDK();


    const [orderType, setOrderType] = useState<OrderType>('fixed-price')
    const [sellOrderItems, setSellOrderItems] = useState<OrderItems>({
        erc20: [{ tokenAddress: '0x3452aA7E0920446c3aE8812C14A262AEfAbaBeeF', amount: 100 }],
        erc721: [],
        erc1155: [],
    });
    const [buyOrderItems, setBuyOrderItems] = useState<OrderItems>({
        erc20: [],
        erc721: [],
        erc1155: [],
    });


    async function createOrder() {
        const order: Order = {
            creator: account,
            items: sellOrderItems,
            isAuction: orderType == "auction-quickbuy",
        }
        if (orderType === "fixed-price" || orderType == "auction-quickbuy") {
            order.quickBuy = {
                items: buyOrderItems,
                salt: generateRandomBytes(),
                signature: "",
            }

            order.quickBuy.signature = await sign(sdk, provider,
                order.creator, order.items, order.quickBuy.items, order.quickBuy.salt);
        }

        const result = await submitOrder(order);
        console.log(result);
        if (result.error)
            alert(JSON.stringify(result.error));

        return;
    }


    return (<div>
        <h2>Create order</h2>

        <select value={orderType} onChange={(e) => setOrderType(e.target.value as OrderType)}>
            <option value="fixed-price">Fixed price</option>
            <option value="auction">Auction</option>
            <option value="auction-quickbuy">Auction with quick buy</option>
        </select>

        <div>
            Select items to sell:
            <InputOrderItems orderItems={sellOrderItems} setOrderItems={setSellOrderItems}/>
        </div>

        {
            orderType !== 'auction' &&
          <div>
            Select items to buy:
            <InputOrderItems orderItems={buyOrderItems} setOrderItems={setBuyOrderItems}/>
          </div>
        }

        <div>
            Valid to:
            <input type="datetime-local"/>
        </div>


        <br/>
        <button onClick={createOrder}>Create order</button>
    </div>)
}

const generateRandomBytes = () => {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);

    const toHexString = (byteArray) => {
        // eslint-disable-next-line
        // @ts-ignore
        return Array.from(byteArray, byte => ('0' + byte.toString(16)).slice(-2)).join('');
    };
    return "0x" + toHexString(randomBytes);
};

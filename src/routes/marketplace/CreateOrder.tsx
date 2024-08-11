import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { submitOrder } from "../../backend/marketplace.ts";
import { generateRandomBytes, sign } from "./components/signature.ts";
import InputOrderCows, { OrderCow } from "./components/InputOrderCows.tsx";
import { COW_TOKEN_ADDRESS, MOO_TOKEN_ADDRESS } from "../../config/config.ts";
import { Order, OrderItems } from "../../types/marketplace.ts";

export type OrderType = "fixed-price" | "auction-quickbuy" | "auction";


export default function CreateOrder() {
    const { sdk, provider, account } = useSDK();


    const [orderType, setOrderType] = useState<OrderType>('fixed-price')
    const [orderCows, setOrderCows] = useState<OrderCow[]>([{ tokenId: 1, amount: 100 }]);
    const [orderPriceMoo, setOrderPriceMoo] = useState<string>("0");
    const [orderValidUntil, setOrderValidUntil] = useState<number>(Date.now() + 1000 * 60 * 60 * 24);

    async function createOrder() {
        const orderItems: OrderItems = {
            erc20: [], erc721: [],
            erc1155: orderCows.map((orderCow) => ({ ...orderCow, tokenAddress: COW_TOKEN_ADDRESS })),
        };
        const order: Order = {
            creator: account,
            items: orderItems,
            validUntil: orderValidUntil,
            isAuction: orderType == "auction-quickbuy",
        }
        if (orderType === "fixed-price" || orderType == "auction-quickbuy") {
            const quickBuyItems: OrderItems = {
                erc20: [{ tokenAddress: MOO_TOKEN_ADDRESS, amount: +orderPriceMoo }],
                erc721: [], erc1155: [],
            }
            order.quickBuy = {
                items: quickBuyItems,
                salt: generateRandomBytes(),
                signature: "",
            }

            order.quickBuy.signature = await sign(sdk, provider,
                order.creator, order.items, order.quickBuy.items, order.quickBuy.salt);
        }

        console.log(order)
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
            <InputOrderCows orderCows={orderCows} setOrderCows={setOrderCows}/>
        </div>

        {
            orderType !== 'auction' &&
          <div>
            Select price in MOO:
            <input value={orderPriceMoo} onChange={(e) => setOrderPriceMoo(e.target.value)}/>
          </div>
        }

        <div>
            Valid to:
            <input type="datetime-local" onChange={(e) => setOrderValidUntil(+e.target.value)}/>
        </div>


        <br/>
        <button onClick={createOrder}>Create order</button>
    </div>)
}


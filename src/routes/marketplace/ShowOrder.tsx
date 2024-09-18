import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrder, submitBid } from "../../game/backend/marketplace.ts";
import { ShowOrderPreview } from "./components/Order.tsx";
import { AuctionBid, Order, OrderItems } from "../../types/marketplace.ts";
import { MOO_TOKEN_ADDRESS } from "../../game/config.ts";
import { generateRandomBytes, sign } from "./components/signature.ts";
import { useSDK } from "@metamask/sdk-react";

export default function ShowOrder() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrder(orderId).then(setOrder);
    }, [orderId])

    if (order == null) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <h2>Order {orderId}</h2>
            <ShowOrderPreview order={order} />
            {order.quickBuy && <FixedPriceBuy order={order}/>}
            {order.isAuction && <MakeBid order={order}/>}
        </div>
    );
}


function MakeBid({ order }: {order: Order}) {
    const [bidAmount, setBidAmount] = useState("0")
    const { sdk, provider, account } = useSDK();

    async function makeBid() {
        const bidItems: OrderItems = {
            erc20: [{ tokenAddress: MOO_TOKEN_ADDRESS, amount: +bidAmount }],
            cows: [],
        }
        const auctionBid: AuctionBid = {
            bidder: account,
            bid: {
                items: bidItems,
                salt: generateRandomBytes(),
                signature: "",
            }
        }
        auctionBid.bid.signature = await sign(sdk, provider,
            auctionBid.bidder, auctionBid.bid.items, order.items, auctionBid.bid.salt);

        const result = await submitBid(order._id, auctionBid);
        console.log(result);
        if (result.error)
            alert(JSON.stringify(result.error));

    }


    return <div>
        <h3>Make bid</h3>
        <input placeholder="Bid amount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
        <button onClick={makeBid}>Make bid</button>
    </div>
}

function FixedPriceBuy({ order }: {order: Order}) {

    function buy() {
        const contractOrder = {
            seller: order.creator,
            sell: order.items,
            buy: order.quickBuy.items,
            salt: order.quickBuy.salt,
        };
        console.log(contractOrder)
    }

    return <div>
        <h3>Quick Buy</h3>
        <button onClick={buy}>Buy</button>
    </div>
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrder, Order } from "../../backend/marketplace.ts";

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
            <pre>{JSON.stringify(order, undefined, 2)}</pre>
            {order.quickBuy && <FixedPriceBuy order={order}/>}
            {order.isAuction && <MakeBid order={order}/>}
        </div>
    );
}


function MakeBid({ order }: {order: Order}) {
    return <div>
        <h3>Make bid</h3>
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

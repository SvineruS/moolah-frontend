import { Order, OrderItems } from "../../../../types/marketplace.ts";
import { CowImg } from "../../../../components/CowImg.tsx";

export function ShowOrderPreview({ order }: { order: Order }) {
    console.log(order)
    return <div>
        Id: {order._id}<br/>
        Seller: {order.creator} <br/>
        Sell: <ShowOrderItems orderItems={order.items}/><br/>
        {order.quickBuy && <div>
          <strong>Quick Buy</strong> Price: {order.quickBuy.items.erc20[0]?.amount ?? "N/A"} $MOO
        </div>
        }
        {order.isAuction && <div>
          <strong>Auction:</strong> <br/>
          <div className={"mx-2"}>
          Bids: {order.bids?.length ?? 0} <br/>
          Last Bid: {order.bids?.[order.bids.length - 1]?.bid.items.erc20[0]?.amount ?? "N/A"} $MOO
          </div>
        </div>}

    </div>
}

export function ShowOrderItems({ orderItems }: { orderItems: OrderItems }) {
    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {orderItems.cows.map(item => (<div key={item.cowId}>
            <CowImg id={item.cowId} />
            x{item.amount}<br/>
        </div>))}
    </div>
}

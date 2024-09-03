import { OrderItems, OrderWithBids } from "../../../types/marketplace.ts";
import { CowImg } from "../../../components/CowImg.tsx";

export function ShowOrderPreview({ order }: { order: OrderWithBids }) {
    console.log(order)
    return <div>
        Id: {order._id}<br/>
        Seller: {order.creator} <br/>
        Sell: <ShowOrderItems orderItems={order.items}/><br/>
        {order.quickBuy && <div>
          Quick Buy Price: {order.quickBuy.items.erc20[0]?.amount ?? "N/A"} $MOO
        </div>
        }
        {order.isAuction && <div>
          Auction: <br/>
          Bids: {order.bids?.length ?? 0} <br/>
          Last Bid: {order.bids?.[order.bids.length - 1]?.bid.items.erc20[0]?.amount ?? "N/A"} $MOO
        </div>}

    </div>
}

export function ShowOrderItems({ orderItems }: { orderItems: OrderItems }) {
    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {orderItems.erc1155.map(item => (<div key={item.tokenId}>
            <CowImg id={item.tokenId} />
            x{item.amount}<br/>
        </div>))}
    </div>
}

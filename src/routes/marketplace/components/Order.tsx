import { COW_IMG_URI } from "../../../config/config.ts";
import { OrderItems, OrderWithId } from "../../../types/marketplace.ts";

export function ShowOrderPreview({ order }: { order: OrderWithId }) {
    console.log(order)
    return <div>
        Id: {order._id}<br/> <br/>
        Seller: {order.creator} <br/><br/>
        Sell: <ShowOrderItems orderItems={order.items}/><br/>
        {order.isAuction && <div>
          Auction:
        </div>}
        {order.quickBuy && <div>
          Quick Buy Price: {order.quickBuy.items.erc20[0]?.amount ?? "N/A"} $MOO
        </div>
        }
    </div>
}

export function ShowOrderItems({ orderItems }: { orderItems: OrderItems }) {
    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {orderItems.erc1155.map(item => (<div key={item.tokenId}>
            <img src={`${COW_IMG_URI}${item.tokenId}.png`} width="100" height="100" alt="cow"/>
            {/*CowId: {item.tokenId} <br/>*/}
            x{item.amount}<br/>
        </div>))}
    </div>
}

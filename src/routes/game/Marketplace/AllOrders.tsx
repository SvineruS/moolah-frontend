import { useEffect, useState } from "react";
import { getOrders } from "../../../game/backend/methods.ts";
import { NavLink } from "react-router-dom";
import { ShowOrderItems } from "./components/OrderItems.tsx";
import Button from "react-bootstrap/Button";

export default function AllOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    (async () => {
      const orders = await getOrders();
      setOrders(orders)
    })()
  }, [])


  return (
    <div>
      <h2>All Orders</h2>
      <hr/>

      {orders.map((order) => <>
        <Order key={order._id} order={order}/>
        <hr/>
      </>)}

    </div>
  );
}

function Order({ order }) {
  return <div>
    Id: {order._id}<br/>
    Seller: {order.creator} <br/>
    Sell: <ShowOrderItems orderItems={order.items}/><br/>

    {order.quickBuy && <div>
      <strong>Quick Buy</strong> Price: {order.quickBuy.items.erc20[0]?.amount ?? "N/A"} $MOO
    </div>}

    {order.isAuction && <div>
      <strong>Auction:</strong> <br/>
      <div className={"mx-2"}>
        Bids: {order.auction?.count ?? 0} <br/>
        Last Bid: {order.auction?.maxAmount ?? "N/A"} $MOO
      </div>
    </div>}

    <NavLink to={`/game/marketplace/order/${order._id}`}><Button>View</Button></NavLink>
  </div>
}

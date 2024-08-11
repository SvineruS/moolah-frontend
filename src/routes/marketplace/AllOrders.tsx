import { useEffect, useState } from "react";
import { getOrders } from "../../backend/marketplace.ts";
import { NavLink } from "react-router-dom";
import { ShowOrderPreview } from "./components/Order.tsx";

export default function AllOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        // fetch orders
        (async () => {
            const orders = await getOrders();
            setOrders(orders)
        })()
    }, [])


    return (
        <div>
            <h2>All Orders</h2>
            <div>
                {orders.map((order) =>
                    <Order key={order._id} order={order} />)}
            </div>
        </div>
    );
}

function Order({ order }) {
    return <div>
        <h3>Order</h3>
        <ShowOrderPreview order={order} />
        <NavLink to={`/marketplace/order/${order._id}`}>View</NavLink>
    </div>
}

import { OrderItems } from "../../../../types/marketplace.ts";
import { CowImg } from "../../../../components/CowImg.tsx";


export function ShowOrderItems({ orderItems }: { orderItems: OrderItems }) {
    return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {orderItems.cows.map(item => (<div key={item.cowId}>
            <CowImg id={item.cowId} />
            x{item.amount}<br/>
        </div>))}
    </div>
}

import { useState } from "react";
import { submitOrder } from "../../../game/backend/methods.ts";
import InputOrderCows, { OrderCow } from "./components/InputOrderCows.tsx";
import { MOO_TOKEN_ADDRESS } from "../../../game/config.ts";
import { Order } from "../../../types/marketplace.ts";
import { useGame } from "../../../hooks/gameContext.ts";
import { generateRandomBytes } from "../../../game/utils.ts";
import Button from "react-bootstrap/Button";
import { Form, FormSelect } from "react-bootstrap";

export type OrderType = "fixed-price" | "auction-quickbuy" | "auction";


export default function CreateOrder() {
  const { gameActions, playerAddress } = useGame()

  async function createOrder(orderType: OrderType, orderCows: OrderCow[], orderPriceMoo: string, orderValidUntil: number) {
    const order: Order = {
      creator: playerAddress,
      items: { erc20: [], cows: orderCows },
      salt: generateRandomBytes(),
      validUntil: orderValidUntil,
      isAuction: orderType == "auction-quickbuy" || orderType == "auction",
    }

    if (orderType === "fixed-price" || orderType == "auction-quickbuy") {
      order.quickBuy = {
        items: { erc20: [{ tokenAddress: MOO_TOKEN_ADDRESS, amount: +orderPriceMoo }], cows: [] },
        signature: "",
      }

      const contractOrder = {
        seller: order.creator,
        sell: order.items,
        buy: order.quickBuy.items,
        validUntil: order.validUntil,
        salt: order.salt,
      }
      order.quickBuy.signature = await gameActions.marketplaceSignOrder(contractOrder);
    }

    console.log(order)
    const result = await submitOrder(order);
    alert(JSON.stringify(result));
  }


  return (<CreateOrderHTML callback={createOrder}/>)
}


function CreateOrderHTML({ callback }) {
  const [orderType, setOrderType] = useState<OrderType>('fixed-price')
  const [orderCows, setOrderCows] = useState<OrderCow[]>([{ cowId: 1, amount: 1 }]);
  const [orderPriceMoo, setOrderPriceMoo] = useState<string>("0");
  const [orderValidUntil, setOrderValidUntil] = useState<string>(getDefaultDate());


  function getDefaultDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().substring(0, 19);
  }

  function createOrder() {
    callback(orderType, orderCows, orderPriceMoo, new Date(orderValidUntil).getTime() / 1000)
  }

  return (<div>
    <h2>Create order</h2>

    <div>
      Auction Type:
      <FormSelect value={orderType} onChange={(e) => setOrderType(e.target.value as OrderType)}>
        <option value="fixed-price">Fixed price</option>
        <option value="auction">Auction</option>
        <option value="auction-quickbuy">Auction with quick buy</option>
      </FormSelect>
    </div>

    <div>
      Select items to sell:
      <InputOrderCows orderCows={orderCows} setOrderCows={setOrderCows}/>
    </div>

    {
      orderType !== 'auction' &&
      <div>
        Select price in MOO:
        <Form.Control value={orderPriceMoo} onChange={(e) => setOrderPriceMoo(e.target.value)}/>
      </div>
    }

    <div>
      Valid to:
      <Form.Control type="datetime-local" value={orderValidUntil} onChange={(e) => setOrderValidUntil(e.target.value)}/>
    </div>

    <Button onClick={createOrder}>Create order</Button>
  </div>)
}


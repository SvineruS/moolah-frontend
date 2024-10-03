import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrder, submitBid } from "../../../game/backend/methods.ts";
import { ShowOrderPreview } from "./components/Order.tsx";
import { AuctionBid, ContractOrder, Order, OrderItems } from "../../../types/marketplace.ts";
import { MOO_TOKEN_ADDRESS } from "../../../game/config.ts";
import { useGame } from "../../../hooks/gameContext.ts";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default function ShowOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>(null);

  useEffect(() => {
    getOrder(orderId).then(setOrder);
  }, [orderId])

  if (order == null) {
    return <div>Loading...</div>
  }


  return (
    <div>
      <h2>Order {orderId}</h2>
      <ShowOrderPreview order={order}/>
      {order.quickBuy && <FixedPriceBuy order={order}/>}
      {order.isAuction &&
        <>
          <MakeBid order={order}/>
          <hr/>
          <Bids order={order}/>
        </>
      }
    </div>
  );
}

function FixedPriceBuy({ order }: { order: Order }) {
  const { gameActions } = useGame();

  async function buy() {
    const contractOrder: ContractOrder = {
      seller: order.creator,
      sell: order.items,
      buy: order.quickBuy.items,
      salt: order.salt,
      validUntil: order.validUntil,
    };

    const result = await gameActions.marketplaceAcceptOrder(contractOrder, order.quickBuy.signature)
    console.log(result)
    alert(JSON.stringify(result));
  }

  return <div>
    <h3>Quick Buy</h3>
    <Button onClick={buy}>Buy</Button>
  </div>
}


function MakeBid({ order }: { order: Order }) {
  const [bidAmount, setBidAmount] = useState("0")
  const { gameActions, playerAddress } = useGame()

  async function makeBid() {
    const bidItems: OrderItems = {
      erc20: [{ tokenAddress: MOO_TOKEN_ADDRESS, amount: +bidAmount }],
      cows: [],
    }
    const auctionBid: AuctionBid = {
      bidder: playerAddress,
      bid: {
        items: bidItems,
        signature: "",
      }
    }

    const orderToSign = {
      you: auctionBid.bidder,
      give: auctionBid.bid.items,
      receive: order.items,
      validUntil: order.validUntil,
      salt: order.salt,
    }

    auctionBid.bid.signature = await gameActions.marketplaceSignOrder(orderToSign);

    const result = await submitBid(order._id, auctionBid);
    console.log(result);
    alert(JSON.stringify(result));

  }


  return <div>
    <h3>Make bid</h3>
    <Form.Control placeholder="Bid amount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
    <Button onClick={makeBid}>Make bid</Button>
  </div>
}

function Bids({ order }: { order: Order }) {
  const { gameActions, playerAddress } = useGame();
  const canAccept = order.creator == playerAddress;

  async function acceptBid(bid: AuctionBid) {
    const contractOrder: ContractOrder = {
      seller: bid.bidder,
      sell: bid.bid.items,
      buy: order.items,
      validUntil: order.validUntil,
      salt: order.salt,
    }
    const result = await gameActions.marketplaceAcceptOrder(contractOrder, bid.bid.signature)
    console.log(result)
    alert(JSON.stringify(result));
  }

  return <div>
    <h3>Bids</h3>
    {order.bids.map((bid, i) =>
      <div className={"m-2"} key={i}>
        Bidder: {bid.bidder} <br/>
        Amount: {bid.bid.items.erc20[0].amount} $MOO
        {canAccept && <Button variant={"success"} onClick={() => acceptBid(bid)}>Accept</Button>}
      </div>
    )}
  </div>
}

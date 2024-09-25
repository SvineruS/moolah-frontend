import { AuctionBid, Order } from "../../types/marketplace.ts";
import { _backend } from "./_backend.ts";



export async function submitOrder(order: Order) {
    return _backend("/marketplace/submitOrder", { order })
}

export async function submitBid(auctionId: string, bid: AuctionBid) {
    return _backend("/marketplace/submitBid", { auctionId, bid })
}


export async function getOrders() {
    return _backend("/marketplace/getOrders")
}

export async function getOrder(orderId: string) {
    return _backend("/marketplace/getOrder", { orderId })
}

export async function getRelay(data: { tgId?: number, playerAddress?: string}) {
    return _backend("/game/getRelay", data)
}

export async function createRelay(data: { playerAddress: string, tgAuth: string }) {
    return _backend("/game/createRelay", data)
}

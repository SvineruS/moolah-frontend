import { AuctionBid, ContractOrder, Order } from "../../types/marketplace.ts";
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
    return _backend("/metatx/getRelay", data)
}

export async function createRelay(data: { playerAddress: string, tgAuth: string }) {
    return _backend("/metatx/createRelay", data)
}

export async function forwardRequest(data: { tgAuth: string, calldata: string }) {
    return _backend("/metatx/forwardRequest", data)
}

export async function marketplaceSignOrder(data: { tgAuth: string, order: ContractOrder }) {
  return _backend("/metatx/marketplaceSignOrder", data)
}

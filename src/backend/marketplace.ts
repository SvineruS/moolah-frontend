import { backendHttpUrl } from "../config/config.ts";
import { AuctionBid, Order } from "../types/marketplace.ts";



export async function submitOrder(order: Order) {
    return await _fetch("/marketplace/submitOrder", { order })
}

export async function submitBid(auctionId: string, bid: AuctionBid) {
    return await _fetch("/marketplace/submitBid", { auctionId, bid })
}


export async function getOrders() {
    return await _fetch("/marketplace/getOrders")
}

export async function getOrder(orderId: string) {
    return await _fetch("/marketplace/getOrder", { orderId })
}


export async function _fetch(url: string, data: any = {}) {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // "X-Auth": authString,
        }

    }
    const res = await fetch(backendHttpUrl + url, init)

    if (res.status >= 400)
        throw new Error(res.statusText + ": " + await res.text())

    return await res.json()


}

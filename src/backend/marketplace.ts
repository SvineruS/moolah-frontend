import { backendHttpUrl } from "../config/config.ts";


export interface Order {
    creator: string;
    items: OrderItems;
    quickBuy?: QuickBuyableOrder;
    isAuction?: boolean;
}

export interface AuctionBid {
    bidder: string;
    bid: QuickBuyableOrder;
}

export interface QuickBuyableOrder {
    items: OrderItems;
    salt: string;
    signature: string;
}

export interface OrderItems {
    erc20: {tokenAddress: string, amount: number}[];
    erc721: {tokenAddress: string, tokenId: number}[];
    erc1155: {tokenAddress: string, tokenId: number, amount: number}[];
}




export async function submitOrder(order: Order) {
    return await _fetch("/marketplace/submitOrder", { order })
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

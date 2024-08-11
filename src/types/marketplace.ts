
export interface OrderWithBids extends OrderWithId {
    bids: AuctionBid[];
}

export interface OrderWithId extends Order {
    _id: string;
}

export interface Order {
    creator: string;
    items: OrderItems;
    validUntil: number;
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





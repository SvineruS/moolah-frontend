
export interface Order {
  _id?: string
  creator: string;
  items: OrderItems;
  quickBuy?: QuickBuyableOrder;
  isAuction?: boolean;
  validUntil?: number;
  bids?: AuctionBid[]
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
  cows: {cowId: number, amount: number}[];
}

export interface Order {
  _id?: string
  creator: string;
  items: OrderItems;
  salt: string;
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
  signature: string;
}

export interface OrderItems {
  erc20: {tokenAddress: string, amount: number}[];
  cows: {cowId: number, amount: number}[];
}


export interface ContractOrder {
  seller: string;
  sell: OrderItems;
  buy: OrderItems;
  validUntil: number;
  salt: string;
}

export interface ContractOrderToSign {
  you: string;
  give: OrderItems;
  receive: OrderItems;
  validUntil: number;
  salt: string;
}

export interface Order {
  creator: string;
  items: OrderItems;
  salt: string;
  quickBuy?: QuickBuyableOrder;
  isAuction?: boolean;
  validUntil?: number;

  // for existing orders
  _id?: string
  status?: boolean;
  createdAt?: number;
  bids?: AuctionBid[]
  auction?: {count: number, maxAmount: number}
}

export interface AuctionBid {
  bidder: string;
  bid: QuickBuyableOrder;

  createdAt?: number;
}

export interface QuickBuyableOrder {
  items: OrderItems;
  signature: string;
  hash?: string;
}

export interface OrderItems {
  erc20: { tokenAddress: string, amount: number }[];
  cows: { cowId: number, amount: number }[];
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

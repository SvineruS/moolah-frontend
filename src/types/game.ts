export const erc20Tokens = ["milk", "beef", "moo", "hay", "apple"] as const;
export type Erc20Tokens = typeof erc20Tokens[number];

export interface Player {
  address: string;

  relayAddress: string;
  relayAmbBalance?: number;

  balances: { [token in Erc20Tokens]: number }

  pastures: string[];

  cows: {id: number, count: number}[];

}

export interface Pasture {
  address: string;
  owner: string;

  cowCapacityLevel: number;
  milkCapacityLevel: number;
  milkRateMultiplierLevel: number;

  cowType: number;
  cows: number;

  milkLastUpdate: number;
  milkNotClaimed: number;

  foodAtLastUpdate: number;
  foodLastUpdate: number;
  appleTime: number;

  deathFromHungerTime: number;
}

export interface Constants {
  cowStats: CowStats[];
  pastureUpgrades: PastureUpgrades;
}

export interface PastureUpgrades {
  cowCapacity: PastureUpgradeLevel[];
  milkCapacity: PastureUpgradeLevel[];
  milkRateMultiplier: PastureUpgradeLevel[];
}

export interface PastureUpgradeLevel {
  level: number;
  upgradePrice: number;
  cumulativePrice: number;
  value: number;
}

export interface CowStats {
  id: number;
  name: string;
  milkRate: number;
  beefRate: number;
  foodRate: number;
}


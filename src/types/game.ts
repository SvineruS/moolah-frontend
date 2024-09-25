export const erc20Tokens = ["milk", "beef", "moo", "hay", "apple"] as const;
export type Erc20Tokens = typeof erc20Tokens[number];

export interface Player {
  isRegistered: boolean;
  relayAddress: string;
  address: string;
  balances: { [token in Erc20Tokens]: number }
  pastures: string[];
  cows: {id: number, count: number}[];

  exchangerCrafts: ExchangerCraft[];
  supplyCrates: SupplyCratesStatus;


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
  exchangerRecipes: ExchangerRecipe[];
  supplyCrates: SupplyCrateDay[];
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

export interface ExchangerRecipe {
  id: number;
  ingredientToken: string;
  ingredientAmount: number;
  time: number;
  resultMooAmount: number;
  name: string;
}


export interface ExchangerCraft {
  recipeId: number;
  endTime: number;
}


export interface SupplyCrateDay {
  day: number;
  hay: number;
  apples: number;
  mooTokens: number;
}

export interface SupplyCratesStatus {
  lastClaimTime: number;
  nextClaimTime: number;
  claimsInARow: number;
}

export interface CowStats {
  id: number;
  name: string;
  milkRate: number;
  beefRate: number;
  foodRate: number;
}


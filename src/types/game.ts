export interface Game {
    player: Player;
    constants: Constants;
}

export interface Player {
    address: string;

    relayAddress: string;
    relayAmbBalance: number;

    milkBalance: number;
    beefBalance: number;
    mooBalance: number;

    pastures: Pasture[];

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

    milkRate: number;

    milkLastUpdate: number;
    milkNotClaimed: number;
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
export type pastureUpgradesKeys = keyof PastureUpgrades;


export interface PastureUpgradeLevel {
    level: number;
    upgradePrice: number;
    cumulativePrice: number;
    value: number;
}

export interface CowStats {
    id: number;
    milkRate: number;
    beefRate: number;
}

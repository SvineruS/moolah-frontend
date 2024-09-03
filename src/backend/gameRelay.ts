import { _backend } from "./_backend.ts";



export interface GameActions {
    addCows(pastureAddress: string, cowId: number, count: number): Promise<void>
    claimMilk(pastureAddress: string): Promise<void>
    feedCows(pastureAddress: string, count: number): Promise<void>
    useApple(pastureAddress: string): Promise<void>
    upgradePasture(pastureAddress: string, cowCapacity: number, milkCapacity: number, milkRateMultiplier: number): Promise<void>
}


export class GameRelay implements GameActions {

    constructor(public auth: string) {}

    async addCows(pastureAddress: string, cowId: number, count: number) {
        return _backend("/game/addCows", { auth: this.auth, pastureAddress, cowId, count })
    }

    async claimMilk(pastureAddress: string) {
        return _backend("/game/claimMilk", { auth: this.auth, pastureAddress })
    }

    async feedCows(pastureAddress: string, count: number) {
        return _backend("/game/feedCows", { auth: this.auth, pastureAddress, count })
    }

    async useApple(pastureAddress: string) {
        return _backend("/game/useApple", { auth: this.auth, pastureAddress })
    }

    async upgradePasture(pastureAddress: string, cowCapacity: number, milkCapacity: number, milkRateMultiplier: number) {
        return _backend("/game/upgradePasture", {
            auth: this.auth,
            pastureAddress,
            cowCapacity,
            milkCapacity,
            milkRateMultiplier
        })
    }
}


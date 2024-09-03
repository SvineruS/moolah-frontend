import { createContext, useContext } from "react";
import { Constants, Pasture, Player } from "../types/game.ts";
import { GameActions } from "../backend/gameRelay.ts";



export interface GameContextData {
    player: Player,
    pastures: Pasture[],
    constants: Constants,
    gameActions: GameActions,
}


export const GameContext = createContext<GameContextData>(null);

export const useGame = () => useContext(GameContext)

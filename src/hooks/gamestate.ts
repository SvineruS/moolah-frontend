import { createContext, useContext } from "react";
import { Game } from "../types/game.ts";

export const GameContext = createContext<Game>(null);

export const useGame = () => useContext(GameContext)

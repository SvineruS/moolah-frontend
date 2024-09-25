import useStorage from "../../hooks/useStorage.ts";
import { NavLink, Outlet } from "react-router-dom";
import { GameContext, GameContextData } from '../../hooks/gameContext.ts';
import { useWebSocket } from "../../hooks/gameWebsocket.ts";
import { useState } from "react";
import { GameActions } from "../../game/actions.ts";


export default function GameHTML() {
  const [tgAuth] = useStorage("tgAuth");
  const [playerAddress] = useStorage("playerAddress");

  console.log("tgAuth", tgAuth);
  console.log("playerAddress", playerAddress);

  const [game, setGame] = useState<GameContextData>({
    player: null,
    constants: null,
    pastures: [],
    gameActions: new GameActions(tgAuth),
  });
  useWebSocket(playerAddress, onMessage);

  function onMessage(msg) {
    console.log('onMessage', msg);
    setGame((oldGame) => ({ ...oldGame, ...msg }));
  }

  if (!game?.player) {
    return <div>Loading...</div>
  }
  console.log(game?.player)

  return (
    <div>
      <GameContext.Provider value={game}>
        <Menu/>
        <hr/>
        <Outlet/>
      </GameContext.Provider>
    </div>
  );
}


function Menu() {
  const classNames = ({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""

  return <div>
    <NavLink to="/game/farm" className={classNames}> Farm </NavLink>•
    <NavLink to="/game/inventory" className={classNames}> Inventory </NavLink>•
    <NavLink to="/game/supplyCrates" className={classNames}> Supply crates </NavLink>•
    <NavLink to="/game/exchange" className={classNames}> Exchange </NavLink>•
    <NavLink to="/game/quests" className={classNames}> Quests </NavLink>
  </div>
}



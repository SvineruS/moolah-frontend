import useStorage from "../../hooks/useStorage.ts";
import { NavLink, Outlet } from "react-router-dom";
import { GameContext, GameContextData, useGame } from '../../hooks/gameContext.ts';
import { useWebSocket } from "../../hooks/gameWebsocket.ts";
import { useState } from "react";
import { GameActions } from "../../game/actions.ts";
import Button from "react-bootstrap/Button";


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

  console.log("game", game)
  if (!game?.player) return <div>Loading...</div>

  return (
    <div>
      <GameContext.Provider value={game}>
        <GameContent/>
      </GameContext.Provider>
    </div>
  );

}


function GameContent() {
  const {player} = useGame()

  if (!player.isRegistered)
    return <Register/>

  return (
    <div>
      <Menu/>
      <hr/>
      <Outlet/>
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


function Register() {
  const {gameActions} = useGame()

  return <div>
    You are not registered!
    <Button onClick={() => gameActions.register()}>Register!</Button>
  </div>
}

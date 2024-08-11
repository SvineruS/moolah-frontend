import { useEffect, useState } from 'react';
import useAuth from "../../hooks/auth.ts";
import { backendWsUrl } from "../../config/config.ts";
import { Game } from "../../types/game.ts";
import { NavLink, Outlet } from "react-router-dom";
import { GameContext } from '../../hooks/gamestate.ts';


export default function GameHTML() {

    const {auth} = useAuth();

    const [websocket, setWebsocket] = useState<WebSocket | null>(null);
    const [game, setGame] = useState<Game>(null);

    useEffect(() => {
        console.log("use Effect", auth, websocket==null);
        if (auth == null) return;
        if (websocket != null) return;


        const url = `${backendWsUrl}?auth=${auth}`;
        const ws = new WebSocket(url);
        setWebsocket(ws);

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const msg = event.data;
            console.log(msg);
            try {
                setGame(JSON.parse(msg));
            } catch (e) {
                console.error('Failed to parse message', e);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    if (game == null) {
        return <div>Loading...</div>
    }



    return (
        <div>
            <GameContext.Provider value={game}>
                <Menu/>
                <Outlet/>
            </GameContext.Provider>
        </div>
    );
}


function Menu() {
    const classNames = ({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""

    return <div>
        <NavLink to="/game/farm" className={classNames}> Farm </NavLink>
        <NavLink to="/game/inventory" className={classNames}> Inventory </NavLink>
        <NavLink to="/game/quests" className={classNames}> Quests </NavLink>
    </div>
}



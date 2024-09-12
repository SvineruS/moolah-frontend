import { useEffect, useRef } from 'react';
import { backendWsUrl } from "../game/config.ts";

export function useWebSocket(auth?: string, onMessage?: (msg: any) => void) {
    const websocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (auth == null || websocketRef.current != null) return;

        const connectWebSocket = () => {
            const url = `${backendWsUrl}?auth=${auth}`;
            const ws = new WebSocket(url);
            websocketRef.current = ws;

            ws.onopen = () => {
                console.log('Connected to WebSocket server');
            };

            ws.onmessage = (event) => {
                const msg = event.data;
                console.log(msg);
                try {
                    onMessage(JSON.parse(msg));
                } catch (e) {
                    console.error('Failed to parse message', e);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error', error);
                ws.close();
                console.log('Disconnected from WebSocket server, attempting to reconnect...');
                websocketRef.current = null;
                setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
                websocketRef.current = null;
            };

        };

        console.log('useEffect setup', auth, backendWsUrl);
        connectWebSocket();

        return () => {
            console.log('useEffect cleanup');
            websocketRef.current?.close();
        };
    }, [auth, backendWsUrl]);

    return { websocket: websocketRef.current };
}

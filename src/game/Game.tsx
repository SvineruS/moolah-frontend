import React, { useEffect, useState } from 'react';

export default function Game({auth}: {auth: string | null}) {
  const [message, setMessage] = useState<string>("");
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log("use Effect", auth, websocket==null);
    if (auth == null) return;
    if (websocket != null) return;


    const url = `wss://www.savagaysmall.pp.ua/ws?auth=${auth}`;
    const ws = new WebSocket(url);
    setWebsocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const msg = event.data;
      console.log(msg);
      try {
        const parsed = JSON.parse(msg);
        setMessage(JSON.stringify(parsed, undefined, 4));

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

  return (
      <div>
        <pre>{message}</pre>
      </div>
  );
};

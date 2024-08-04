import React, { useEffect, useState } from 'react';

export default function Game({auth}: {auth: string | null}) {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const url = `wss://www.savagaysmall.pp.ua/ws?auth=${auth}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      console.log(event);
      setMessage(JSON.stringify(event.data, undefined, 2));
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
        {message}
      </div>
  );
};

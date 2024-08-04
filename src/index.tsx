import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MetaMaskProvider } from "@metamask/sdk-react";
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import App from "./App";


const sdkOptions = {
    dappMetadata: {
        name: "Moolah",
        url: window.location.href,
    },
    useDeeplink: true,
    openDeeplink: (url: string) => window.open(url, '_system')
}

const tgWebAppOptions = {
    smoothButtonsTransition: true,
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <WebAppProvider options={tgWebAppOptions}>
            <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                <App/>
            </MetaMaskProvider>
        </WebAppProvider>
    </React.StrictMode>
);


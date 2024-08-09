import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import Auth from "./routes/auth.tsx";
import Game from "./routes/game.tsx";
import Marketplace from "./routes/marketplace/Marketplace.tsx";
import { sdkOptions, tgWebAppOptions } from "./config/config.ts";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { MetaMaskProvider } from '@metamask/sdk-react';
import CreateOrder from "./routes/marketplace/CreateOrder.tsx";
import ShowOrder from "./routes/marketplace/ShowOrder.tsx";
import AllOrders from "./routes/marketplace/AllOrders.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "auth",
                element: <Auth />,
            },
            {
                path: "game",
                element: <Game />,
            },
            {
                path: "marketplace",
                element: <Marketplace />,
                children: [
                    {
                        path: "/marketplace/",
                        element: <AllOrders />,
                    },
                    {
                        path: "/marketplace/order/:orderId",
                        element: <ShowOrder />,
                    },
                    {
                        path: "/marketplace/create",
                        element: <CreateOrder />,
                    },
                ]
            }
        ],

    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <WebAppProvider options={tgWebAppOptions}>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
              <RouterProvider router={router} />
          </MetaMaskProvider>
      </WebAppProvider>
  </React.StrictMode>,
)



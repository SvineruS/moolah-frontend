import ReactDOM from 'react-dom/client'

import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { MetaMaskProvider } from '@metamask/sdk-react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { sdkOptions, tgWebAppOptions } from "./config/config.ts";

import Root from "./routes/root.tsx";
import Auth from "./routes/auth.tsx";
import GameHTML from "./routes/game/game.tsx";
import Marketplace from "./routes/marketplace/Marketplace.tsx";
import CreateOrder from "./routes/marketplace/CreateOrder.tsx";
import ShowOrder from "./routes/marketplace/ShowOrder.tsx";
import AllOrders from "./routes/marketplace/AllOrders.tsx";
import Farm from "./routes/game/Farm/Farm.tsx";
import Inv from "./routes/game/Inventory/Inventory.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


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
                element: <GameHTML />,
                children: [
                    {
                        path: "/game/farm",
                        element: <Farm />,
                    },
                    {
                        path: "/game/inventory/",
                        element: <Inv/>,
                    }
                ]
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
  // <React.StrictMode>
      <WebAppProvider options={tgWebAppOptions}>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
              <RouterProvider router={router} />
          </MetaMaskProvider>
      </WebAppProvider>
  // </React.StrictMode>,
)



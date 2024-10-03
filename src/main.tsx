import ReactDOM from 'react-dom/client'

import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { MetaMaskProvider } from '@metamask/sdk-react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { sdkOptions, tgWebAppOptions } from "./game/config.ts";

import Root from "./routes/root.tsx";
import Auth from "./routes/auth/auth.tsx";
import GameHTML from "./routes/game/game.tsx";
import Marketplace from "./routes/game/Marketplace/Marketplace.tsx";
import CreateOrder from "./routes/game/Marketplace/CreateOrder.tsx";
import ShowOrder from "./routes/game/Marketplace/ShowOrder.tsx";
import AllOrders from "./routes/game/Marketplace/AllOrders.tsx";
import Farm from "./routes/game/Farm/Farm.tsx";
import Inv from "./routes/game/Inventory/Inventory.tsx";
import SupplyCrates from "./routes/game/SupplyCrates/index.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Exchange from "./routes/game/Exchange";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      { path: "auth", element: <Auth/>, },
      {
        path: "game", element: <GameHTML/>,
        children: [
          { path: "/game/farm", element: <Farm/>, },
          { path: "/game/inventory/", element: <Inv/>, },
          { path: "/game/supplyCrates/", element: <SupplyCrates/>, },
          { path: "/game/exchange", element: <Exchange/>, },
          {
            path: "/game/marketplace", element: <Marketplace/>,
            children: [
              { path: "/game/marketplace/", element: <AllOrders/>, },
              { path: "/game/marketplace/order/:orderId", element: <ShowOrder/>, },
              { path: "/game/marketplace/create", element: <CreateOrder/>, },
            ]
          }
        ]
      }
    ],

  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <WebAppProvider options={tgWebAppOptions}>
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <RouterProvider router={router}/>
    </MetaMaskProvider>
  </WebAppProvider>
  // </React.StrictMode>,
)



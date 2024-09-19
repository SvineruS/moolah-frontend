import { useSDK } from "@metamask/sdk-react";
import { NavLink, Outlet } from "react-router-dom";


export default function Marketplace() {
    const { connected, connecting, chainId, account, balance } = useSDK();

    // const { auth } = useAuth();

    const classNames = ({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""

    return (
        <div>
            <h2>Metamask</h2>
            <p>{`Connected chain: ${chainId} / Is AirDao Testnet: ${chainId === '0x5618' ? 'true' : 'false'}`}</p>
            <p>{`Connected account: ${account} / Account balance: ${balance}`}</p>
            <p>{`Connected: ${connected} / Connecting: ${connecting}`}</p>

            <hr/>

            <>
                <NavLink to="/marketplace" className={classNames}> All Orders </NavLink>•
                <NavLink to="/marketplace/create" className={classNames}> Create </NavLink>

                <Outlet/>
            </>
        </div>
    );
}


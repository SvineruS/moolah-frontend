import React, { useState } from 'react';
import { useInitData } from "@vkruglikov/react-telegram-web-app";

import { useSDK } from "@metamask/sdk-react";
import Game from "./game/Game";


const airdaoTestnet = {
    chainId: '0x5618',
    chainName: 'AirDAO Testnet',
    blockExplorerUrls: ['https://testnet.airdao.io/explorer/'],
    nativeCurrency: { symbol: 'AMB', decimals: 18 },
    rpcUrls: ['https://network.ambrosus-test.io/'],
}


export default function App() {
    const [initDataUnsafe, initData] = useInitData()
    const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();

    const [fakeAuth, setFakeAuth] = useState<string>("");
    const [auth, setAuth_] = useState<string | null>(() => localStorage.getItem('auth'));

    const setAuth = (auth: string | null) => {
        setAuth_(auth);
        if (auth) localStorage.setItem('auth', auth);
        else localStorage.removeItem('auth');
    }

    const connect = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`failed to connect..`, err);
        }
    };

    const addNetwork = async () => {
        if (!provider) throw new Error(`invalid ethereum provider`);
        await provider.request({ method: 'wallet_addEthereumChain', params: [airdaoTestnet] })
    };
    const changeNetwork = async (hexChainId: string) => {
        console.debug(`switching to network chainId=${hexChainId}`);
        try {
            await provider?.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hexChainId }] });
        } catch (e) {
            await addNetwork()
        }
    };

    const sendTransaction = async () => {
        const transactionParameters = {
            to: '0x0000000000000000000000000000000000000000', //
            from: provider?.getSelectedAddress(),
            value: '0x5AF3107A4000',
        };

        try {
            const txHash = (await provider?.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            })) as string;
            alert(txHash);
        } catch (e) {
            console.log(e);
        }
    };

    const disconnect = () => {
        sdk?.terminate();
    };


    async function login() {
        const tgId = initDataUnsafe?.user?.id;
        try {
            const signature = await sdk?.connectAndSign({ msg: formatMessageForWeb3Auth(tgId!), });
            const auth = {
                web3Auth: { signature, tgId, address: sdk?.activeProvider?.getSelectedAddress() },
                tgAuth: initDataUnsafe
            }
            setAuth(JSON.stringify(auth));
        } catch (err) {
            console.warn(`failed to connect..`, err);
        }

    }


    return (
        <div className="App">
            <div>
                <h2>Metamask</h2>
                <p>{`Connected chain: ${chainId} / Is AirDao Testnet: ${chainId === '0x5618' ? 'true' : 'false'}`}</p>
                <p>{`Connected account: ${account} / Account balance: ${balance}`}</p>
                <p>{`Connected: ${connected} / Connecting: ${connecting}`}</p>

                <button onClick={connect}> Connect</button>
                <button onClick={disconnect}> Disconnect</button>
                <button onClick={sendTransaction}> Send transaction</button>
                <button onClick={() => changeNetwork('0x5618')}> Switch to AirDao Testnet</button>
                {/*<button onClick={addNetwork}> Add AirDao Testnet</button>*/}
            </div>
            <hr/>
            <div>
                <h2>Telegram</h2>
                <p>{`Telegram user id: ${initDataUnsafe?.user?.id}`}</p>
                <p>{`Telegram user name: ${initDataUnsafe?.user?.username}`}</p>
                <p>{`Telegram auth: ${JSON.stringify(initDataUnsafe)}`}</p>
                <pre>{initData}</pre>
            </div>
            <hr/>
            <div>
                <h2>Auth</h2>
                <p>{`Auth: ${auth}`}</p>
                <button onClick={login}>Sign in</button>
                <button onClick={() => setAuth(null)}>Sign out</button>
                <button onClick={() => setAuth(fakeAuth)}>Fake sign in</button>
                <input value={fakeAuth} onChange={(e) => setFakeAuth(e.target.value)} placeholder={"fake auth json"}/>
            </div>

            <hr/>
            <h2>Game</h2>
            {auth ? <Game auth={auth}/> : <div>Sign in to play</div>}
        </div>
    );

};


function formatMessageForWeb3Auth(tgId: number) {
    return `Yes, let me play with tgId ${tgId}`;
}

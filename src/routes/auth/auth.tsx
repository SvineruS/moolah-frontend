import { useState } from 'react';
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useSDK } from "@metamask/sdk-react";
import useStorage from "../../hooks/useStorage.ts";
import { ACTIONS_ADDRESS, airdaoTestnet } from "../../game/config.ts";
import { createRelay, getRelay } from "../../game/backend/methods.ts";
import { setRelayer } from "../../game/contracts/calldata.ts";


export default function Auth() {


  return (
    <div className="App">
      <Metamask/>
      <hr/>
      <Telegram/>
      <hr/>
      <AuthOverriding/>
      <hr/>
      <BackendPermissions/>
    </div>
  );

}


function Metamask() {
  const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();


  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      alert(`failed to connect.. ${JSON.stringify(err)}`);
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
      value: '0',
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

  return <div>
    <h2>Metamask</h2>
    <p>{`Connected chain: ${chainId} / Is AirDao Testnet: ${chainId === '0x5618' ? 'true' : 'false'}`}</p>
    <p>{`Connected account: ${account} / Account balance: ${balance}`}</p>
    <p>{`Connected: ${connected} / Connecting: ${connecting}`}</p>

    <button onClick={connect}> Connect</button>
    <button onClick={disconnect}> Disconnect</button>
    <button onClick={sendTransaction}> Send transaction</button>
    <button onClick={() => changeNetwork('0x5618')}> Switch to AirDao Testnet</button>
    <button onClick={addNetwork}> Add AirDao Testnet</button>
  </div>
}

function Telegram() {
  const [initDataUnsafe, initData] = useInitData()

  return <div>
    <h2>Telegram</h2>
    <p>{`Telegram user id: ${initDataUnsafe?.user?.id}`}</p>
    <p>{`Telegram user name: ${initDataUnsafe?.user?.username}`}</p>
    <pre>{initData}</pre>
  </div>
}

function AuthOverriding() {
  const [, initData] = useInitData()
  const { account } = useSDK();


  const [tgAuth, setTgAuth] = useStorage("tgAuth");
  const [playerAddress, setPlayerAddress] = useStorage("playerAddress");

  const [fakeTgAuth, setFakeTgAuth] = useState<string>("");
  const [fakePlayerAddress, setFakePlayerAddress] = useState<string>("");


  return <div>
    <h2>Auth overriding</h2>
    (in prod in <code>playerAddress</code> should be fetched from backend (by tg id) or from metamask!)
    <br/> <br/>

    Player Address: <pre>{playerAddress}</pre>
    <button onClick={() => setPlayerAddress(account)}>Save address from metamask</button>
    <button onClick={() => setPlayerAddress(null)}>Clear player address</button>
    <button onClick={() => setPlayerAddress(fakePlayerAddress)}>Set fake player address</button>
    <input value={fakePlayerAddress} onChange={(e) => setFakePlayerAddress(e.target.value)}
           placeholder={"fake player address"}/>

    <hr/>

    (im using <code>tgAuth</code> from local storage for dev purposes, in prod <code>initData</code> should be used
    as tgAuth directly!)
    <br/> <br/>


    Tg Auth: <pre>{tgAuth}</pre>
    <button onClick={() => setTgAuth(initData)}>Save auth from telegram</button>
    <button onClick={() => setTgAuth(null)}>Clear tg auth</button>
    <button onClick={() => setTgAuth(fakeTgAuth)}>Set fake tg auth</button>
    <input value={fakeTgAuth} onChange={(e) => setFakeTgAuth(e.target.value)} placeholder={"fake tg auth json "}/>

  </div>

}

function BackendPermissions() {
  const { provider } = useSDK();

  const [tgAuth] = useStorage("tgAuth");
  const [playerAddress] = useStorage("playerAddress");

  const [resp, setResp] = useState();

  let tgId
  try {  tgId = JSON.parse(tgAuth)?.user?.id; } catch (e) { }


  const setRelay = async () => {
    const { relayAddress, registerSign } = await createRelay({ tgAuth, playerAddress })
    const calldata = await setRelayer(relayAddress, tgId, registerSign);

    const transactionParameters = { to: ACTIONS_ADDRESS, from: playerAddress, data: calldata, };

    try {
      const txHash = (await provider?.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })) as string;
      alert(txHash);
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
    }
  };


  return <div>
    <h2>Backend permissions</h2>
    Using tg auth and player address from local storage (Auth overriding section)
    <br/><br/>
    <button onClick={() => getRelay({ tgId }).then(setResp).catch(alert)}>
      Get player info (by tg id)
    </button>
    <button onClick={() => getRelay({ playerAddress }).then(setResp).catch(alert)}>
      Get player info (by player address)
    </button>
    <button onClick={() => createRelay({ tgAuth, playerAddress }).then(setResp).catch(alert)}>
      Get register info for `metatx_setRelayer`
    </button>
    <button onClick={setRelay}>Make `metatx_setRelayer` transaction</button>


    <pre>{JSON.stringify(resp)}</pre>
  </div>
}

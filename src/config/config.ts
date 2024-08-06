

export const airdaoTestnet = {
    chainId: '0x5618',
    chainName: 'AirDAO Testnet',
    blockExplorerUrls: ['https://enhance-events.db719thmlw0ad.amplifyapp.com/'],
    nativeCurrency: { symbol: 'AMB', decimals: 18 },
    rpcUrls: ['https://network.ambrosus-test.io/'],
}


export const sdkOptions = {
    dappMetadata: {
        name: "Moolah",
        url: window.location.href,
    },
    useDeeplink: true,
    openDeeplink: (url: string) => window.open(url, '_system')
}

export const tgWebAppOptions = {
    smoothButtonsTransition: true,
}

// export const backendWsUrl = "wss://www.savagaysmall.pp.ua/ws";
export const backendWsUrl = "ws://localhost:8000/ws";

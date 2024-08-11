

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


export const COW_TOKEN_ADDRESS = "0x0d7A2204fcbEd77d411EB890f0058575d713505b";
export const MOO_TOKEN_ADDRESS = "0x05C95cbF6D0D946303059893c92d1DFA0Bf9e82b";

export const COW_IMG_URI = "http://localhost:8111/";

const eip712Domain = {
    chainId: 22040,
    name: 'Moolah',
    verifyingContract: '0x93549AD90A3a21941E16987A63D4fF26ccd1EA79',
    version: '1',
}

export const eip712Params = {
    domain: eip712Domain,
    primaryType: 'Order',
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        OrderErc20: [
            { name: "tokenAddress", type: "address" },
            { name: "amount", type: "uint256" }
        ],
        OrderErc721: [
            { name: "tokenAddress", type: "address" },
            { name: "tokenId", type: "uint256" }
        ],
        OrderErc1155: [
            { name: "tokenAddress", type: "address" },
            { name: "tokenId", type: "uint256" },
            { name: "amount", type: "uint256" }
        ],
        OrderItems: [
            { name: "erc20", type: "OrderErc20[]" },
            { name: "erc721", type: "OrderErc721[]" },
            { name: "erc1155", type: "OrderErc1155[]" }
        ],
        Order: [
            { name: "you", type: "address" },
            { name: "give", type: "OrderItems" },
            { name: "receive", type: "OrderItems" },
            { name: "salt", type: "uint256" }
        ]
    },
}


// export const backendHttpUrl = "https://www.savagaysmall.pp.ua/";
export const backendHttpUrl = "http://localhost:8000";


// export const backendWsUrl = "wss://www.savagaysmall.pp.ua/ws";
export const backendWsUrl = "ws://localhost:8000/ws";

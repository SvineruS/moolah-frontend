

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


export const COW_TOKEN_ADDRESS = "0x7eF4392f8A54C3FE53a1F3627342f0FFED3EDd36";
export const MOO_TOKEN_ADDRESS = "0xC77979C1C22cFb850f8413439DbE0d6D7C26c969";
export const MARKETPLACE_ADDRESS = "0x56d582c37B4b32041cC5afcC78ec95Da451F876b"

export const COW_IMG_URI = "/cows/";

const eip712Domain = {
    chainId: 22040,
    name: 'Moolah',
    verifyingContract: MARKETPLACE_ADDRESS,
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


// export const backendHttpUrl = "https://moolah-api.ambrosus-test.io";
export const backendHttpUrl = "http://localhost:8000";

// export const backendWsUrl = "wss://moolah-api.ambrosus-test.io/ws";
export const backendWsUrl = "ws://localhost:8000/ws";

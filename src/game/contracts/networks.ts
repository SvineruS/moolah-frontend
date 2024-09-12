import { defineChain } from "viem";

export const airdaoDevnet = defineChain({
  id: 30746,
  name: 'airdao',
  urlParam: 'airdao',
  networkLayer: 0,
  explorer: 'https://devnet.airdao.io/explorer',
  label: 'AirDao Devnet',
  nativeCurrency: { name: 'Amber', symbol: 'AMB', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://network.ambrosus-dev.io'],
    },
  },
});

export const airdaoTestnet = defineChain({
  id: 22040,
  name: 'airdao',
  urlParam: 'airdao',
  explorer: 'https://testnet.airdao.io/explorer',
  label: 'AirDao Testnet',
  nativeCurrency: { name: 'Amber', symbol: 'AMB', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://test-rpc.airdao.io'],
    },
  },
});

export const airdaoMainnet = defineChain({
  id: 16718,
  name: 'airdao',
  urlParam: 'airdao',
  explorer: 'https://airdao.io/explorer',
  label: 'AirDao Mainnet',
  nativeCurrency: { name: 'Amber', symbol: 'AMB', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://network.ambrosus.io'],
    },
  },
});

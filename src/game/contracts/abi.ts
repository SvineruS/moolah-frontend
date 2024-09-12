export const ACTIONS_ABI = [
  {
    "inputs": [],
    "name": "exchanger_claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "milkRecipeId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "beefRecipeId",
        "type": "uint256"
      }
    ],
    "name": "exchanger_craft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "relayer",
        "type": "address"
      }
    ],
    "name": "metatx_setRelayer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "cowType",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "pasture_addCows",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      }
    ],
    "name": "pasture_claimMilk",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "pasture_feedCows",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "pasture_removeCow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "cowCapacityLevel",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "milkCapacityLevel",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "milkRateMultiplierLevel",
        "type": "uint64"
      }
    ],
    "name": "pasture_upgrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pastureAddress",
        "type": "address"
      }
    ],
    "name": "pasture_useApple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cowsId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "player_burnCows",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      }
    ],
    "name": "player_register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "player_tutorialEnd",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "supplyCrates_claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

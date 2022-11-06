

// Do not change function name.
const actionFn = async (context, periodicEvent) => {

    console.log(periodicEvent)

    // To access project's secret
    // let secret = await context.secrets.get('MY-SECRET')

    // To access project's storage
    // let value = await context.storage.getStr('MY-KEY')
    // await context.storage.putStr('MY-KEY', 'MY-VALUE')

    // Your logic goes here :)
    //import { ethers } from "ethers";
    const ethers = require("ethers");


    let contractAddress = "0xced3ed4376a1329ea18895d35cff7d6cd990ea9d";
    let privateKey = "ce4d218a507da034ebf8e6c56c33e4673d0c64fd918f4e9d6854cffc9a304b13";

    let abi = [
    {
      "inputs": [],
      "name": "amountBatched",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initAccount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usdc",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_communicator",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "releaseFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sendBatched",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "senderBatched",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

    let signer = new ethers.Wallet(privateKey);
    let provider=new ethers.providers.JsonRpcProvider("https://opt-goerli.g.alchemy.com/v2/f2uu1y8jCL_JP0SZ_iOQUTmIgN38nq2y",420);
    signer=signer.connect(provider);
    const tokenContract = new ethers.Contract(contractAddress, abi, signer);
    const transaction = await tokenContract.sendBatched({gasLimit:10000000})
    console.log(transaction)




}
// Do not change this.
module.exports = { actionFn }
#!/bin/bash
#tr '\r' '\n' < .env > .env.unix
source .env

node script/helpers/cleanJson.js deployTest.json

mkdir -p ./script/addresses

echo "Deploying on Mumbai"
export CHAINID=1
forge script script/deployModules.s.sol:DeployConnector --ffi --rpc-url $MUMBAI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


echo "Deploying on Fuji"
export CHAINID=2
forge script script/deployModules.s.sol:DeployUserDeposit --ffi --rpc-url $FUJI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


echo "Deploying on Goerli"
export CHAINID=3
forge script script/deployModules.s.sol:DeployUserDeposit --ffi --rpc-url $OPTIMISM_GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv




echo "Init Communicator on Mumbai"
export CHAINID=1
forge script script/initCommunicator.s.sol:InitCommunicator --ffi  --rpc-url $MUMBAI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


echo "Init Communicator on Fuji"
export CHAINID=2
forge script script/initCommunicator.s.sol:InitCommunicator --ffi --rpc-url $FUJI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv

echo "Init Communicator on Goerli"
export CHAINID=3
forge script script/initCommunicator.s.sol:InitCommunicator --ffi --rpc-url $OPTIMISM_GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


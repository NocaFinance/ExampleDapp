
source .env

export contractDeposit="0xcab85be2c1d684b64a760e336d4c06b216461ade"

#fund wallet
#cast send --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY  --value 100000000000 $contractSatellite

#initiate cross chain comm
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "initAccount()"
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "deposit(uint256)" 500
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "deposit(uint256)" 500
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "sendBatched()"


#cast send --rpc-url https://polygon-mumbai.g.alchemy.com/v2/TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx --private-key ce4d218a507da034ebf8e6c56c33e4673d0c64fd918f4e9d6854cffc9a304b13 0xdfc6e49de5166234b5a8740e04480697c347fc81 "depositFunds(address,uint256)" 0x7AaadAcFE9F92820dD28DA5FCAB4a752080eF812 100







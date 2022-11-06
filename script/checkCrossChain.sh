
source .env

export contractDeposit="0xcab85be2c1d684b64a760e336d4c06b216461ade"

#fund wallet
#cast send --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY  --value 100000000000 $contractSatellite

#initiate cross chain comm
#cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "initAccount()"
#cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "deposit(uint256)" 500
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "deposit(uint256)" 500
cast send --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY $contractDeposit "sendBatched()"




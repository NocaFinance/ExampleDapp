import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { initCommunicatorSSol, InoERC20, UserDeposit } from "../../types/ethers-contracts";
import { Pool } from "../components/Pool";
import { useWeb3Context } from "../components/Web3ContextProvider";
import { DEPOSIT_ADDRESS, evmChainId, NetworkId, NETWORKS, pools, tokens } from "../utils/constants";
import UserDepositABI from "../../out/contracts/UserDeposit.sol/UserDeposit.json";
import InoERC20ABI from "../../out/tokens/InoERC20.sol/InoERC20.json";
import { formatEther } from "ethers/lib/utils";
import { useSwitchNetwork } from "../utils/useNetworkSwitch";
import { idToHexString } from "../utils/networkHelpers";
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import * as PushAPI from "@pushprotocol/restapi";
export default function Home() {
  const { address, connected, networkId, provider } = useWeb3Context();
  const switchChain = useSwitchNetwork();
  const toast = useToast();
  async function init() {
    // await provider.send("wallet_switchEthereumChain", [
    //   { chainId: idToHexString(evmChainId[NetworkId.POLYGON_TESTNET]) },
    // ]);
    // await PushAPI.channels.subscribe({
    //   signer: provider.getSigner() as any,
    //   channelAddress: 'eip155:80001:' + address, // channel address in CAIP
    //   userAddress: 'eip155:80001:' + address, // user address in CAIP
    //   onSuccess: () => {
    //     console.log('opt in success');
    //   },
    //   onError: () => {
    //     console.error('opt in error');
    //   },
    //   env: 'staging'
    // });

    console.log("fn4i", tokens[0]);
    console.log("fn4i", NetworkId.AVALANCHE_TESTNET);
    console.log("fn4i", tokens[0].networks[NetworkId.AVALANCHE_TESTNET]);
    const tokenContract = new ethers.Contract(
      tokens[0].networks.find((network) => network.network == NetworkId.AVALANCHE_TESTNET)!.address,
      InoERC20ABI.abi,
      new ethers.providers.JsonRpcProvider(NETWORKS[NetworkId.AVALANCHE_TESTNET].rpcUrls[0], NETWORKS[NetworkId.AVALANCHE_TESTNET].chainId)
    ) as InoERC20;
    const amount = await tokenContract.balanceOf(address);
    if (parseFloat(formatEther(amount)) == 0) {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: idToHexString(evmChainId[NetworkId.AVALANCHE_TESTNET]) },
      ]);
      let depositContract = new ethers.Contract(
        DEPOSIT_ADDRESS[NetworkId.AVALANCHE_TESTNET],
        UserDepositABI.abi,
        provider.getSigner()
      ) as UserDeposit;
      await depositContract.initAccount({ gasLimit: 1000000 });
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: idToHexString(
            evmChainId[NetworkId.OPTIMISM_TESTNET]
          ),
        },
      ]);
      depositContract = new ethers.Contract(
        DEPOSIT_ADDRESS[NetworkId.OPTIMISM_TESTNET],
        UserDepositABI.abi,
        provider.getSigner()
      ) as UserDeposit;
      await depositContract.initAccount({ gasLimit: 1000000 });
      toast({
        title: "Initiated user account.",
        description: "Please refresh the page.",
        status: "success",
        duration: 20000,
        isClosable: true,
      });
    }
    else {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: idToHexString(evmChainId[NetworkId.OPTIMISM_TESTNET]) },
      ]);
    }
  }

  useEffect(() => {
    if (connected) {
      init();
    }
  }, [address, connected]);
  return (
    <Box flex="1" display="flex" flexDir={"column"}>
      <Box
        flexDir={"row"}
        display="flex"
        borderBottom="1px"
        borderColor={"blue"}
        width="100%"
        justifyContent={"space-between"}
        padding="5px"
      >
        <Text>Lending pools</Text>
        <Text>TVL: $10,000,000</Text>
        <Text>All-time Borrowed: $50,000,000</Text>
      </Box>
      <Box
        flexDir={"row"}
        flexWrap="wrap"
        display={"flex"}
        justifyContent="space-between"
      >
        {pools.map((pool, index) => (
          <Pool pool={pool} key={index} />
        ))}
      </Box>
    </Box>
  );
}

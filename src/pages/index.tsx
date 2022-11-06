import { Box, Text, useToast } from "@chakra-ui/react";
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
export default function Home() {
  const { address, connected, networkId, provider } = useWeb3Context();
  const switchChain = useSwitchNetwork();
  const toast = useToast();
  async function init() {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: idToHexString(evmChainId[NetworkId.AVALANCHE_TESTNET]) },
    ]);

    console.log("fn4i", tokens[0]);
    console.log("fn4i", NetworkId.AVALANCHE_TESTNET);
    console.log("fn4i", tokens[0].networks[NetworkId.AVALANCHE_TESTNET]);
    const tokenContract = new ethers.Contract(
      tokens[0].networks.find((network) => network.network == NetworkId.AVALANCHE_TESTNET)!.address,
      InoERC20ABI.abi,
      provider.getSigner()
    ) as InoERC20;
    const amount = await tokenContract.balanceOf(address);
    if (parseFloat(formatEther(amount)) == 0) {
      let depositContract = new ethers.Contract(
        DEPOSIT_ADDRESS[NetworkId.AVALANCHE_TESTNET],
        UserDepositABI.abi,
        provider.getSigner()
      ) as UserDeposit;
      await depositContract.initAccount({ gasLimit: 1000000 });
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: idToHexString(
            evmChainId[NetworkId.ETHEREUM_TESTNET]
          ),
        },
      ]);
      depositContract = new ethers.Contract(
        DEPOSIT_ADDRESS[NetworkId.ETHEREUM_TESTNET],
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

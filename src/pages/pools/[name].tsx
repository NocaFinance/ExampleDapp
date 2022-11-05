import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NetworkButton from "../../components/NetworkButton";
import { useWeb3Context } from "../../components/Web3ContextProvider";
import { NetworkId, pools, tokens } from "../../utils/constants";
import { pool } from "../../utils/pools";

const PoolDetails: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const pool = pools.find((pool) => pool.name == name);
  if (pool) {
    return (
      <Box w="100%">
        <Box
          flexDirection="row"
          display="flex"
          marginX="5"
          marginY="1"
          padding="2"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box flexDir={"row"} display="flex">
            <Box alignItems={"center"} display={"flex"} marginLeft="5px">
              <Text fontWeight={"bold"}>{pool.name}</Text>
            </Box>
          </Box>
          <Box flexDir={"column"} width="250px">
            <Text textAlign={"right"}>Max APY:</Text>
            <Text textAlign={"right"}>Credit Rating:</Text>
          </Box>
          <Box flexDir={"column"} marginLeft="5px">
            <Text fontWeight={"bold"}>{pool.maxAPY}</Text>
            <Text fontWeight={"bold"}>{pool.creditRating}</Text>
          </Box>
        </Box>
        <Box flexDir={"row"} display="flex">
          <Box>
            <Heading size="md">General</Heading>
            <Text>{pool.long_desc}</Text>
          </Box>
          <Tabs marginX="5px" align="center" width="300px">
            <TabList width="300px">
              <Tab>Deposit</Tab>
              <Tab>Withdraw</Tab>
            </TabList>

            <TabPanels backgroundColor={"#303641"}>
              <TabPanel>
                <DepositBox pool={pool} />
              </TabPanel>
              <TabPanel>Withdraw</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    );
  } else {
    return <Text>Not found</Text>;
  }
};

const DepositBox = ({ pool }: { pool: pool }) => {
  const [amount, setAmount] = useState(undefined as number | undefined);
  const [maxAmount, setMaxAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { provider, address, networkId, isMetamask, connected } =
    useWeb3Context();
  console.log("chainid", networkId);
  useEffect(() => {
    if (isMetamask) {
      // const tokenContract = new ethers.Contract(
      //           tokens[0].networks[networkId].address,
      //           InoERC20ABI.abi,
      //           provider.getSigner()
      //         ) as InoERC20;
      //setMaxAmount(tokenContract.balanceOf(address));
    } else {
      // const tokenContract = new ethers.Contract(
      //           tokens[0].networks[MASTER_CHAIN].address,
      //           InoERC20ABI.abi,
      //           provider.getSigner()
      //         ) as InoERC20;
      //setMaxAmount(tokenContract.balanceOf(address));
    }
    setLoading(false);
  }, []);
  const toast = useToast();
  async function invest() {
    toast({
      title: "Initiating investment",
      description: "Please wait a few seconds",
      status: "loading",
      duration: 5000,
      isClosable: true,
    });
    // for (const network of Object.keys(amounts)) {
    //   if (amounts[parseFloat(network) as NetworkId] > 0) {
    //     console.log("chosenToken", chosenToken);
    //     console.log("network", network);
    //     await provider.send("wallet_switchEthereumChain", [
    //       {
    //         chainId: idToHexString(
    //           evmChainId[parseFloat(network) as NetworkId]
    //         ),
    //       },
    //     ]);
    //     const tokenContract = new ethers.Contract(
    //       chosenToken.networks.find(
    //         (tmp) => tmp.network == parseFloat(network)
    //       )!.address,
    //       InoERC20ABI.abi,
    //       provider.getSigner()
    //     ) as InoERC20;
    //     const curAllowance = parseFloat(
    //       formatEther(
    //         await tokenContract.allowance(
    //           address,
    //           DEPOSIT_ADDRESS[parseFloat(network) as NetworkId]
    //         )
    //       )
    //     );
    //     if (curAllowance < amounts[parseFloat(network) as NetworkId]) {
    //       await tokenContract.approve(
    //         DEPOSIT_ADDRESS[parseFloat(network) as NetworkId],
    //         ethers.constants.MaxUint256
    //       );
    //     }
    //     const depositContract = new ethers.Contract(
    //       DEPOSIT_ADDRESS[parseFloat(network) as NetworkId],
    //       UserDepositABI.abi,
    //       provider.getSigner()
    //     ) as UserDeposit;
    //     await depositContract.depositFunds(
    //       parseEther(amounts[parseFloat(network) as NetworkId].toString())
    //     );
    //   }
    // }

    // toast({
    //   title: "Investment submitted",
    //   description: "Your funds will be allocated to the protocol shortly.",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
  }
  if (!loading && connected)
    return (
      <Box>
        <Box width="100%" marginBottom="20px" zIndex={0.1}>
          <NetworkButton />
        </Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none" zIndex={0.5}>
            <Box justifyContent={"center"} alignItems={"center"} marginX="10px">
              <Image
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
                }
                alt="token"
                boxSize="25px"
                mr="25px"
                display={"flex"}
              />
            </Box>
          </InputLeftElement>
          <Input
            placeholder={"0.0"}
            value={amount}
            type="number"
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
          />

          <InputRightElement
          //eslint-disable-next-line react/no-children-prop
          >
            <Button
              minWidth="50px"
              variant="ghost"
              marginRight={"10px"}
              onClick={(e) => setAmount(maxAmount)}
            >
              Max
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text textAlign={"right"} fontSize="10px">
          Available: {maxAmount}
        </Text>

        <Box display="flex" flexDir="row" justifyContent={"space-between"}>
          <Text>Current APY:</Text>
          <Text>{((pool.maxAPY - 0.01) * 100).toFixed(2)}%</Text>
        </Box>
        <Box display="flex" flexDir={"column"} flex="1">
          <Box
            flexDir="row"
            justifyContent={"space-between"}
            display="flex"
            marginX="5px"
          >
            <Text fontSize="10px">USDC:</Text>
            <Text fontSize="10px">{pool.maxAPY * 100}%</Text>
          </Box>
          <Box
            flexDir="row"
            justifyContent={"space-between"}
            display="flex"
            marginX="5px"
          >
            <Text fontSize="10px">Performance Fee:</Text>
            <Text fontSize="10px">-1%</Text>
          </Box>
        </Box>
        <Button
          colorScheme="green"
          w="200px"
          marginTop="10px"
          onClick={invest}
          disabled={!amount || amount == 0 || amount > maxAmount}
        >
          Invest
        </Button>
      </Box>
    );
  else if (!connected) {
    return <Text>Please connect your wallet</Text>;
  }
  return <Spinner />;
};
export default PoolDetails;

import {
  Box,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { pools } from "../../utils/constants";

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

            <TabPanels
              backgroundColor={
                //@ts-ignore
                theme.colors.brand[50]
              }
            >
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

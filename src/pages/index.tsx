import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Pool } from "../components/Pool";
import { pools } from "../utils/constants";

export default function Home() {
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

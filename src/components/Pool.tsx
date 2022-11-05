import { Box, Button, Divider, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pool } from "../utils/pools";

export const Pool = ({ pool }: { pool: pool }) => {
  const router = useRouter();
  return (
    <Box
      minW="350px"
      border="1px"
      margin="5"
      borderRadius={"5px"}
      boxShadow={"dark-lg"}
    >
      <Image
        src={pool.pic}
        alt="token"
        width="350px"
        height="50px"
        objectFit={"cover"}
      />
      <Box
        flexDir={"row"}
        justifyContent="space-between"
        display="flex"
        padding="10px"
        alignItems={"center"}
      >
        <Box flexDir={"column"} display="flex" flex="1">
          <Text fontSize={"2xl"}>{pool.name}</Text>
          <Text>TVL: ${pool.TVL}</Text>
        </Box>
        <Box flexDir={"row"} display="flex">
          <Box flexDir={"column"}>
            <Text textAlign={"right"}>Max APY:</Text>
            <Text textAlign={"right"}>Risk:</Text>
          </Box>
          <Box flexDir={"column"} marginLeft="5px">
            <Text fontWeight={"bold"}>{pool.maxAPY * 100}%</Text>
            <Text
              fontWeight={"bold"}
              textColor={pool.creditRating != "B" ? "green" : "orange"}
            >
              {pool.creditRating}
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        padding="10px"
        flexDir={"row"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize="12px" noOfLines={3} width="200px">
          {pool.long_desc}
        </Text>
        <Button
          variant={"solid"}
          onClick={() => router.push("/pools/" + pool.name)}
          marginRight="5px"
        >
          Visit Pool
        </Button>
      </Box>
    </Box>
  );
};

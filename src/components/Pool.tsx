import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pool } from "../utils/pools";

export const Pool = ({ pool }: { pool: pool }) => {
  const router = useRouter();
  return (
    <Box minW="350px" border="1px" margin="5">
      <Box flexDir={"row"} justifyContent="space-between" display="flex">
        <Box flexDir={"column"}>
          <Text>{pool.creditRating}</Text>
          <Text>{pool.name}</Text>
        </Box>
        <Box>
          <Text>{pool.maxAPY}</Text>
          <Text>max APY</Text>
        </Box>
      </Box>
      <Divider />
      <Text>${pool.TVL} TVL</Text>
      <Button
        variant={"outline"}
        onClick={() => router.push("/pools/" + pool.name)}
      >
        Visit Pool
      </Button>
    </Box>
  );
};

import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Logo from "../../public/x2";
import { useRouter } from "next/router";
import { shorten } from "../utils/networkHelpers";
import { useWeb3Context } from "./Web3ContextProvider";
const Header = () => {
  const router = useRouter();
  const { address, connect, connected, disconnect } = useWeb3Context();
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="200px"
        height="75px"
        alignItems={"center"}
      >
        <Box>
          <Link onClick={() => router.push("/")}>
            <Box alignItems="center" justifyContent={"center"}>
              <Image
                src={
                  "/logo_transparent.png"
                  // "https://i0.wp.com/atlendis.io/wp-content/uploads/2022/02/atlendis-logo-horizontal-white.png"
                }
                alt="token"
                width="75px"
                marginTop={"10px"}
                objectFit={"contain"}
              />
            </Box>
          </Link>
        </Box>
        <Box display="flex" textAlign="right">
          {!connected ? (
            <Button
              fontSize="14px"
              lineHeight="17px"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              fontSize="14px"
              lineHeight="17px"
              colorScheme="green"
              variant="solid"
              onClick={disconnect}
            >
              {shorten(address)}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;

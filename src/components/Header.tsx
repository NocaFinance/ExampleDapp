import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Logo from "../../public/x2";
import { useRouter } from "next/router";
import { shorten } from "../utils/networkHelpers";
import { useWeb3Context } from "./Web3ContextProvider";
import { ethers } from "ethers";
import { NetworkId, NETWORKS } from "../utils/constants";
import NetworkButton from "./NetworkButton";
import { RepeatIcon } from "@chakra-ui/icons";
import * as PushAPI from "@pushprotocol/restapi";
const Header = () => {
  const router = useRouter();
  const { address, connect, connected, disconnect, provider } =
    useWeb3Context();
  const { toggleColorMode } = useColorMode();
  const [ENSName, setENSName] = useState("");
  useEffect(() => {
    console.log("namelol");
    console.log("lol", address);
    if (connected && address) {
      console.log("namein");
      const ethProvider = new ethers.providers.JsonRpcProvider(
        NETWORKS[NetworkId.ETHEREUM_TESTNET].rpcUrls[0],
        5
      );
      console.log("lol", address);

      ethProvider.lookupAddress(address).then((name) => {
        console.log("namead", address.toLowerCase());
        console.log("name", name);
        if (name) setENSName(name);
      });
    } else setENSName("");
  }, [address, provider, connected]);
  async function refreshNotifications() {
    const notifications = await PushAPI.user.getFeeds({
      user: 'eip155:80001:' + address, // user address in CAIP
      env: 'staging'
    });
    console.log("notifications", notifications);
  }
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
          <IconButton icon={<RepeatIcon />} onClick={refreshNotifications} />
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
              {ENSName ? ENSName : shorten(address)}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;

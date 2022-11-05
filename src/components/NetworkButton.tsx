import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { NETWORKS, USER_SELECTABLE_NETWORKS } from "../utils/constants";
import { useSwitchNetwork } from "../utils/useNetworkSwitch";
import { useWeb3Context } from "./Web3ContextProvider";

const NetworkButton = () => {
  const { provider, networkId } = useWeb3Context();
  const switchNetwork = useSwitchNetwork();
  console.log("huh", networkId);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex={1000}>
        <Box
          flexDirection={"row"}
          flex={1}
          display={"flex"}
          alignItems={"center"}
        >
          {NETWORKS[networkId] ? (
            <>
              <Image
                boxSize="25px"
                borderRadius="full"
                src={NETWORKS[networkId].image}
                alt={NETWORKS[networkId].imageAltText}
                mr="12px"
                display={"flex"}
              />
              <Text display={"flex"}>{NETWORKS[networkId].chainName}</Text>
            </>
          ) : (
            <Text display={"flex"}>Unsupported</Text>
          )}
        </Box>
      </MenuButton>
      <MenuList zIndex={1000}>
        {USER_SELECTABLE_NETWORKS.map((network, index) => (
          <MenuItem
            minH="48px"
            key={index}
            onClick={() => switchNetwork(network)}
          >
            <Image
              boxSize="25px"
              borderRadius="full"
              src={NETWORKS[network].image}
              alt={NETWORKS[network].imageAltText}
              mr="12px"
            />
            <Text>{NETWORKS[network].chainName}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default NetworkButton;

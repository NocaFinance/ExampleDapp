import { useWeb3Context } from "../components/Web3ContextProvider";
import { evmChainId, NetworkId, NETWORKS } from "./constants";
import { idToHexString } from "./networkHelpers";

/**
 * Switches the wallets currently active network.
 */
export const useSwitchNetwork = () => {
  const { provider } = useWeb3Context();

  return async (networkId: NetworkId) => {
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: idToHexString(evmChainId[networkId]) },
      ]);
    } catch (error: any) {
      if (error?.code === 4902) {
        // Try add the network to users wallet

        const network = NETWORKS[networkId];
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: idToHexString(evmChainId[networkId]),
            chainName: network["chainName"],
            nativeCurrency: network["nativeCurrency"],
            rpcUrls: network["rpcUrls"],
            blockExplorerUrls: network["blockExplorerUrls"],
          },
        ]);
      }

      throw error;
    }
  };
};

/**
 * Copy from https://github.com/OlympusDAO/olympus-frontend
 */

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  JsonRpcProvider,
  Network,
  Web3Provider,
} from "@ethersproject/providers";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import {
  getNetworkIdFromChainId,
  idFromHexString,
  Providers,
} from "../utils/networkHelpers";
import Web3Modal from "web3modal";

import { evmChainId, NetworkId, NETWORKS } from "../utils/constants";

/**
 * determine if in IFrame for Ledger Live
 */
function isIframe() {
  return (
    typeof window !== "undefined" && window.location !== window.parent.location
  );
}

/*
    Types
  */
type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  connected: boolean;
  connectionError: IConnectionError | null;
  provider: JsonRpcProvider;
  web3Modal: Web3Modal;
  networkId: NetworkId;
  networkName: string;
  providerUri: string;
  providerInitialized: boolean;
  isMetamask: boolean;
};

interface IConnectionError {
  text: string;
  created: number;
}

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " +
      "please declare it at a higher level."
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};
export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};
let initModal: Web3Modal;
if (typeof window !== "undefined")
  initModal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: Object.keys(NETWORKS).reduce((accumulator, networkKey) => {
            return {
              ...accumulator,
              [evmChainId[parseInt(networkKey) as NetworkId]]:
                NETWORKS[parseInt(networkKey) as NetworkId].rpcUrls[0],
            };
          }, {}),
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "X2",
          chainId: evmChainId[NetworkId.AVALANCHE_TESTNET],
          rpc: NETWORKS[NetworkId.AVALANCHE_TESTNET].rpcUrls[0],
        },
      },
    },
  });

export function checkCachedProvider(web3Modal: Web3Modal): boolean {
  if (!web3Modal) return false;
  const cachedProvider = web3Modal.cachedProvider;
  if (!cachedProvider) return false;
  return true;
}

export const Web3ContextProvider: React.FC<{ children: ReactElement; }> = ({
  children,
}) => {
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] =
    useState<IConnectionError | null>(null);
  const [address, setAddress] = useState("");
  // NOTE (appleseed): loading eth mainnet as default rpc provider for a non-connected wallet
  const [provider, setProvider] = useState<JsonRpcProvider>(
    Providers.getStaticProvider(NetworkId.AVALANCHE_TESTNET)
  );
  const [networkId, setNetworkId] = useState(NetworkId.AVALANCHE_TESTNET);
  const [networkName, setNetworkName] = useState("");
  const [providerUri, setProviderUri] = useState("");
  const [providerInitialized, setProviderInitialized] = useState(false);
  const [isMetamask, setIsMetamask] = useState(false);
  const [web3Modal] = useState<Web3Modal>(initModal);

  function hasCachedProvider(): boolean {
    return checkCachedProvider(web3Modal);
  }

  // NOTE (appleseed): none of these listeners are needed for Backend API Providers
  // ... so I changed these listeners so that they only apply to walletProviders, eliminating
  // ... polling to the backend providers for network changes
  const _initListeners = useCallback(
    (rawProvider: any) => {
      console.log("hi");
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async () => {
        setTimeout(
          () => typeof window !== "undefined" && window.location.reload(),
          1
        );
      });

      rawProvider.on("chainChanged", async (_chainId: string) => {
        console.log("chain1", _chainId);
        const newChainId = idFromHexString(_chainId);
        const currChainId = await provider
          .getNetwork()
          .then((network) => network.chainId);
        console.log("chain2", currChainId);
        if (newChainId !== currChainId) {
          // setTimeout(
          //   () => typeof window !== "undefined" && window.location.reload(),
          //   1
          // );
          setNetworkId(getNetworkIdFromChainId(currChainId) || -1);
        } else {
          setNetworkId(getNetworkIdFromChainId(currChainId) || -1);
        }
      });
    },
    [provider]
  );
  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    // handling Ledger Live;
    console.log("conn1");
    let rawProvider;
    if (isIframe()) {
      rawProvider = new IFrameEthereumProvider();
    } else {
      try {
        console.log("conn2");
        rawProvider = await web3Modal.connect();
      } catch (e) {
        console.log("wallet connection status:", e);
        if (e !== "Modal closed by user") {
          setConnectionError({
            created: Date.now(),
            text: "Please check your Wallet UI for connection errors",
          });
        }
        setConnected(false);
        return;
      }
    }
    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    _initListeners(rawProvider);

    const connectedProvider = new Web3Provider(rawProvider, "any");
    const isMetamask = !(connectedProvider as any).provider.connected;
    const connectedAddress = await connectedProvider.getSigner().getAddress();
    const newNetworkId = getNetworkIdFromChainId(
      await connectedProvider.getNetwork().then((network) => network.chainId)
    );
    unstable_batchedUpdates(() => {
      setProvider(connectedProvider);

      // Save everything after we've validated the right network.
      // Eventually we'll be fine without doing network validations.
      setAddress(connectedAddress);
      setNetworkId(newNetworkId);
      setIsMetamask(isMetamask);
      if (newNetworkId != -1) {
        setNetworkName(NETWORKS[newNetworkId].chainName);
        setProviderUri(NETWORKS[newNetworkId].rpcUrls[0]);
        setProviderInitialized(true);
      } else {
        setNetworkName("Unsupported Network");
        setProviderUri("");
        setProviderInitialized(false);
      }
      // Keep this at the bottom of the method, to ensure any repaints have the data we need
      setConnected(true);
    });

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setConnectionError(null);
    setConnected(false);

    setTimeout(() => {
      typeof window !== "undefined" && window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);
  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      connectionError,
      address,
      web3Modal,
      networkId,
      networkName,
      providerUri,
      providerInitialized,
      isMetamask,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      connectionError,
      address,
      web3Modal,
      networkId,
      networkName,
      providerUri,
      providerInitialized,
      isMetamask,
    ]
  );

  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};

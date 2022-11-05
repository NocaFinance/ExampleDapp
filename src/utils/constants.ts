import { Network } from "@ethersproject/providers";
import _ from "lodash";
import { pool } from "./pools";

export enum NetworkId {
  // ETHEREUM = 102,
  ETHEREUM_TESTNET = 3,

  // ARBITRUM = 42161,
  // ARBITRUM_TESTNET = 421611,

  // AVALANCHE = 43114,
  AVALANCHE_TESTNET = 2,
  //  BSC = 101,
  // BSC_TESTNET = 1,
  //  POLYGON = 100,
  POLYGON_TESTNET = 0,

  // FANTOM = 250,
  // FANTOM_TESTNET = 4002,

  // OPTIMISM = 10,
  // OPTIMISM_TESTNET = 69,

  // BOBA = 288,
  // BOBA_TESTNET = 28,
}

type MASTERCHAINIDTYPE = NetworkId.AVALANCHE_TESTNET;

export const evmChainId: { [x in NetworkId]: number } = {
  // [NetworkId.ETHEREUM]: 1,
  [NetworkId.ETHEREUM_TESTNET]: 5,
  //  [NetworkId.AVALANCHE]: 43114,
  [NetworkId.AVALANCHE_TESTNET]: 43113,
  //  [NetworkId.BSC]: 56,
  // [NetworkId.BSC_TESTNET]: 97,
  //  [NetworkId.POLYGON]: 137,
  [NetworkId.POLYGON_TESTNET]: 80001,
};
interface ISatelliteAddresses {
  collateralManager: string;
  functionsConfig: string;
  communicator: string;
}
interface IMasterAddresses extends ISatelliteAddresses {
  coreVaultEngine: string;
}
// const satelliteAddresses: {
//   [x in Exclude<NetworkId, MASTERCHAINIDTYPE>]: ISatelliteAddresses;
// } = _.omit(deployedAddresses, MASTERCHAINID);
// const masterAddresses: {
//   [y in MASTERCHAINIDTYPE]: IMasterAddresses;
// } = { [MASTERCHAINID]: deployedAddresses[MASTERCHAINID] };
// export const ADDRESSES = { ...satelliteAddresses, ...masterAddresses };
/*{
  [NetworkId.ETHEREUM_TESTNET]: {},
  [NetworkId.ETHEREUM]: {},
  [NetworkId.BSC_TESTNET]: {},
  [NetworkId.BSC]: {},
  [NetworkId.POLYGON_TESTNET]: {},
  [NetworkId.POLYGON]: {},
}*/
/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */

interface INativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface INetwork {
  chainName: string;
  chainId: number;
  nativeCurrency: INativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  image: string;
  imageAltText: string;
  coingecko_platformId: string;
}

// These networks will be available for users to select. Other networks may be functional
// (e.g. testnets, or mainnets being prepared for launch) but need to be selected directly via the wallet.
export const USER_SELECTABLE_NETWORKS = [
  // NetworkId.ETHEREUM,
  NetworkId.AVALANCHE_TESTNET,
  NetworkId.POLYGON_TESTNET,
  // NetworkId.BSC_TESTNET,
];

export const NETWORKS: { [key in NetworkId & number]: INetwork } = {
  // [NetworkId.ETHEREUM]: {
  //   chainName: "Ethereum",
  //   chainId: 1,
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://eth-mainnet.rpcfast.com"],
  //   blockExplorerUrls: ["https://etherscan.io/#/"],
  //   image: "tokens/ethereum-icon.png",
  //   imageAltText: "Ethereum Logo",
  //   coingecko_platformId: "ethereum",
  // },
  [NetworkId.ETHEREUM_TESTNET]: {
    chainName: "Goerli Testnet",
    chainId: evmChainId[NetworkId.ETHEREUM_TESTNET],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-goerli-rpc.allthatnode.com"],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/#/"],
    image: "/tokens/ethereum-icon.png",
    imageAltText: "Ethereum Logo",
    coingecko_platformId: "ethereum",
  },
  // [NetworkId.ARBITRUM]: {
  //   chainName: "Arbitrum",
  //   chainId: 42161,
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  //   blockExplorerUrls: ["https://explorer.arbitrum.io/#/"],
  //   image: "tokens/arbitrum-icon.png",
  //   imageAltText: "Arbitrum Logo",
  //   uri: () => Providers.getProviderUrl(NetworkId.ARBITRUM),
  //   coingecko_platformId: "arbitrum-one",
  // },
  // [NetworkId.ARBITRUM_TESTNET]: {
  //   chainName: "Arbitrum Testnet",
  //   chainId: 421611,
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
  //   blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"],
  //   image: "tokens/arbitrum-icon.png",
  //   imageAltText: "Arbitrum Logo",
  //   uri: () => Providers.getProviderUrl(NetworkId.ARBITRUM),
  //   coingecko_platformId: "arbitrum-one",
  // },
  [NetworkId.AVALANCHE_TESTNET]: {
    chainName: "Avalanche Fuji Testnet",
    chainId: evmChainId[NetworkId.AVALANCHE_TESTNET],
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/#/"],
    image: "/tokens/avalanche-icon.png",
    imageAltText: "Avalanche Logo",
    coingecko_platformId: "avalanche",
  },
  // [NetworkId.AVALANCHE]: {
  //   chainName: "Avalanche",
  //   chainId: 43114,
  //   nativeCurrency: {
  //     name: "AVAX",
  //     symbol: "AVAX",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  //   blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
  //   image: "tokens/avalanche-icon.png",
  //   imageAltText: "Avalanche Logo",
  //   uri: () => Providers.getProviderUrl(NetworkId.AVALANCHE),
  //   coingecko_platformId: "avalanche",
  // },
  // [NetworkId.POLYGON]: {
  //   chainName: "Polygon",
  //   chainId: 137,
  //   nativeCurrency: {
  //     name: "Polygon",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://polygon-rpc.com"],
  //   blockExplorerUrls: ["https://polygonscan.com/"],
  //   image: "tokens/polygon-icon.png",
  //   imageAltText: "Polygon Logo",
  //   uri: () => Providers.getProviderUrl(NetworkId.POLYGON),
  //   coingecko_platformId: "polygon-pos",
  // },
  [NetworkId.POLYGON_TESTNET]: {
    chainName: "Polygon Mumbai Testnet",
    chainId: evmChainId[NetworkId.POLYGON_TESTNET],
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-testnet.public.blastapi.io"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    image: "tokens/polygon-icon.png",
    imageAltText: "Polygon Logo",
    coingecko_platformId: "polygon-pos",
  },
  // [NetworkId.BSC_TESTNET]: {
  //   chainName: "BSC Testnet",
  //   chainId: evmChainId[NetworkId.BSC_TESTNET],
  //   nativeCurrency: {
  //     name: "BNB Coin",
  //     symbol: "BNB",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://data-seed-prebsc-2-s2.binance.org:8545/"],
  //   blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
  //   image: "/tokens/bsc-icon.png",
  //   imageAltText: "BSC Logo",
  //   coingecko_platformId: "polygon-pos",
  // },
};
export const protocols = [
  {
    title: "Goldfinch",
    pic: "https://pbs.twimg.com/profile_images/1297172195664437248/pc1EXI0M_400x400.png",
    desc: "Goldfinch loans out cryptocurrency to companies in emerging countries without requiring that they have crypto collateral themselves.",
    apy: "20%",
    safety: "8",
    long_desc:
      "Goldfinch is a Decentralized Finance (DeFi) credit platform that loans out cryptocurrency to users without requiring that they have crypto collateral themselves. This allows the company to provide access to cryptocurrency to emerging markets and to offer a stable yield to the lenders.\n The company was co-founded in July 2020 by Michael Sall and Blake West, who both formerly worked at Coinbase.\nAccording to its whitepaper, Goldfinch's lending model relies on four core participants: borrowers, backers, liquidity providers, and auditors. This protocol is intended to allow for cryptocurrency borrowing without borrowers needing cryptocurrency collateral.",
    tvl: "80M",
    vault_tvl: "1M",
    tokens: ["USDC"],
    depositTokenNames: ["Polygon Goldfinch USDC"],
  },
  {
    title: "Atlendis",
    pic: "https://v2.cimg.co/news/80545/202706/atlendis.jpg",
    desc: "Atlendis (previously JellyFi) is a capital-efficient DeFi lending protocolthat enables crypto loans without collateral.",
    apy: "25%",
    safety: "8",
    long_desc:
      "Atlendis is a capital-efficient DeFi lending protocol where corporate entities can get access to uncollateralized lines of credit. Atlendis is targeting entities with regular and short term liquidity needs. Similarly to a revolving line of credit,the Atlendis protocol allows entities to borrow i.e. issue bonds as many times as they need, up to a preset borrowing limit, without any collateral. Atlendis’ pools are borrower specific and the borrowing rates are discovered via a limit order book specific to each pool.",
    tvl: "90M",
    vault_tvl: "2M",
    tokens: ["USDC"],
    depositTokenNames: ["Polygon Atlendis USDC"],
  },
  {
    title: "TrueFi",
    pic: "https://img.api.cryptorank.io/coins/truefi1606128356416.png",
    desc: "TrueFi is a protocol for creating interest-bearing pools with a high APR for liquidity providers. TrueFi includes utility and rewards mechanisms using TrustTokens (TRU) and rewards participants for maintaining stable, high APRs.",
    apy: "15%",
    safety: "8",
    long_desc:
      "TrueFi is a protocol for creating interest-bearing pools with a high APR for liquidity providers. TrueFi includes utility and rewards mechanisms using TrustTokens (TRU) and rewards participants for maintaining stable, high APRs.",
    tvl: "5M",
    vault_tvl: "1M",
    tokens: ["USDC"],
    depositTokenNames: ["Polygon TrueFi USDC"],
  },
  {
    title: "Lido",
    pic: "https://pbs.twimg.com/profile_images/1423729299442503683/j9yXgh9F_400x400.jpg",
    desc: "Lido (LDO) is a secure liquid staking solution for proof-of-stake (PoS) cryptocurrencies.",
    apy: "5%",
    safety: "10",
    long_desc:
      "Lido (LDO) is a secure liquid staking solution for proof-of-stake (PoS) cryptocurrencies that supports Ethereum 2.0 (The Merge) staking and a growing ecosystem of other Layer 1 PoS blockchains. Users can stake their PoS tokens on Lido and receive a tokenized version of their staked assets at a 1:1 ratio. They can use this tokenized version of their staked assets to earn additional yield from other DeFi protocols while receiving staking rewards from their tokens deposited on Lido.",
    tvl: "1B",
    vault_tvl: "5M",
    tokens: ["USDC"],
    depositTokenNames: ["Polygon Lido USDC"],
  },
  {
    title: "Morpho",
    pic: "https://icodrops.com/wp-content/uploads/2022/07/1Q0Q3fnn_400x400.jpg",
    desc: "Morpho is a Peer-to-Peer (P2P) layer on top of lending pools like Compound or Aave. Rates are seamlessly improved for both suppliers and borrowers whilst preserving the same liquidity and market risk guarantees.",
    apy: "2%",
    safety: "9",
    long_desc:
      "Morpho is a Peer-to-Peer (P2P) layer on top of lending pools like Compound or Aave. Rates are seamlessly improved for both suppliers and borrowers whilst preserving the same liquidity and market risk guarantees.",
    tvl: "100M",
    vault_tvl: "1M",
    tokens: ["USDC"],
    depositTokenNames: ["Polygon Morpho USDC"],
  },
];

export const tokens = [
  {
    name: "USDC",
    pic: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    networks: [
      {
        network: NetworkId.AVALANCHE_TESTNET,
        address: "0xe7458e20d62d59261d85aaf9fdd308beba0489d2",
      },
      {
        network: NetworkId.ETHEREUM_TESTNET,
        address: "0xd0d6e9382328fe8e58ac4c7b3e531879344992d4",
      },
    ],
  },
  // {
  //   name: "ETH",
  //   pic: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  //   networks: [
  //     {
  //       network: NetworkId.AVALANCHE_TESTNET,
  //       address: "0xb0c06ba2e164b6fe3d9489457d4c6cb09e85176f",
  //     },
  //   ],
  // },
];
export const investmentTokens = [
  // {
  //   name: "USDC",
  //   address: "0x9f65fe5855d9cfaf1a6d1d773f12f550993a6fe6",
  //   pic: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  // },
  {
    name: "Polygon Goldfinch USDC",
    pic: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    networks: [
      {
        network: NetworkId.POLYGON_TESTNET,
        address: "0x797f95128a3130bee76cf0cc8ff69b9180c66a29",
      },
    ],
  },
];

export const DEPOSIT_ADDRESS: { [x in NetworkId]: string } = {
  [NetworkId.ETHEREUM_TESTNET]: "0x008cc2d4db48386d2cc3fa528a034fee2201dc1f",
  // [NetworkId.BSC_TESTNET]: "",
  [NetworkId.AVALANCHE_TESTNET]: "0xbc0e2f098f92bef22ea2423871c01f81aa9728c7",
  [NetworkId.POLYGON_TESTNET]: "0x7eede7a809d3dc93d91d4e0b6519a2f19a17bcd7",
};

export const pools: pool[] = [
  {
    creditRating: "AA",
    TVL: 1000000,
    maxAPY: 0.3,
    name: "Auros",
    long_desc:
      "Auros is an algorithmic trading and market-making firm founded by derivatives traders and trading system architects with over 20 years of experience, generating daily notional turnover in billions of dollars.",
  },
  {
    creditRating: "A",
    TVL: 200000,
    maxAPY: 0.2,
    name: "Parallel Capital",
    long_desc:
      "Established in 2018 by a team of trading experts, Parallel Capital provides consistently deep liquidity to every major crypto exchange using its proprietary trading algorithms.",
  },
  {
    creditRating: "B",
    TVL: 500000,
    maxAPY: 0.5,
    name: "Siroexmon",
    long_desc:
      "Sirox aims to cover short term capital needs (less than 1 month) for SMBs (e.g. payroll-advancing company).",
  },
];

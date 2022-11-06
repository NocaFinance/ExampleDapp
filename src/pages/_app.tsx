import type { AppProps } from "next/app";
import { ChakraProvider, LightMode } from "@chakra-ui/react";
import theme from "../theme/theme";
import Layout from "../components/Layout";
import { Web3ContextProvider } from "../components/Web3ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ContextProvider>
  );
}

export default MyApp;

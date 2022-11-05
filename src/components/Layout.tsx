import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box flex="1" display="flex" flexDir={"column"} height="100vh">
      <Header />
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="240px"
        flex="1"
        alignItems={"flex-start"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

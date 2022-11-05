import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Header />
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="240px"
        flex="1"
        alignItems={"center"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

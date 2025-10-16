import React from "react";
import PrivyProvider from "./privy";
import QueryProvider from "./tanstack";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <PrivyProvider>{children}</PrivyProvider>
    </QueryProvider>
  );
};

export default Providers;

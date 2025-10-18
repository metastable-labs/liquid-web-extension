"use client";

import React from "react";
import { PrivyProvider as ReactPrivyProvider } from "@privy-io/react-auth";

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;
const PRIVY_CLIENT_ID = import.meta.env.VITE_PRIVY_CLIENT_ID;

if (!PRIVY_APP_ID || !PRIVY_CLIENT_ID) {
  throw new Error("VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID are required");
}

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactPrivyProvider
      appId={PRIVY_APP_ID as string}
      clientId={PRIVY_CLIENT_ID as string}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        loginMethods: ["wallet", "email"],
      }}
    >
      {children}
    </ReactPrivyProvider>
  );
}

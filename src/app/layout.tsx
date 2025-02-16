import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import HpHeader from "@/shared/header/HpHeader";
import { QueryClient } from "@tanstack/react-query";
import { WalletProvider } from "./lib/wallet_provider/WalletProvider";


const queryClient = new QueryClient();
export const metadata = {
  title: "COINRupiah",
  description: "Escrow Crypto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
       <WalletProvider>
               
                <MyApp>{children}</MyApp>
                </WalletProvider>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import InitialThemeSetup from "@/components/InitialThemeSetup";
import Navbar from "@/components/Navbar";
import Provider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coin List",
  description: "List of top 50 cryptocurrencies based on market cap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <InitialThemeSetup />
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </Provider>
      </body>
    </html>
  );
}

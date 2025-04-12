import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Provider from '@/providers/ReduxProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coin List",
  description: "List of top 50 cryptocurrencies based on market cap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/favicon.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

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
      {/* <head>
        <link rel="icon" type="image/svg+xml" href={icon} sizes="any" />
      </head> */}
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </Provider>
      </body>
    </html>
  );
}

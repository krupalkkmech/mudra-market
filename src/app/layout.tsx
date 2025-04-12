import type { Metadata } from 'next';

import Provider from '@/providers/ReduxProvider';

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

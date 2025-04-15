import { fetchCoinDetails } from "@/fetch/api";

import CoinDetailsClient from "./CoinDetailsClient";

export async function generateStaticParams() {
  return [];
}

export default async function CoinDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const coinData = await fetchCoinDetails(params.id);

  return <CoinDetailsClient initialCoinData={coinData} />;
}

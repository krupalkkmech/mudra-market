import { fetchCoinDetails } from "@/fetch/api";

import CoinDetailsClient from "./CoinDetailsClient";

export async function generateStaticParams() {
  return [];
}
export type paramsType = Promise<{ id: string }>;

type PageProps = {
  params: paramsType;
};

const CoinDetailsPage: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const coinData = await fetchCoinDetails(resolvedParams.id);

  return <CoinDetailsClient initialCoinData={coinData} />;
};

export default CoinDetailsPage;

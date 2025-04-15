"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { fetchCoinDetails } from "@/fetch/api";
import { ICoinDetails } from "@/types/crypto";

import CoinDetailsClient from "./CoinDetailsClient";

const CoinDetailsPage = () => {
  const params = useParams();
  const [coinData, setCoinData] = useState<ICoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinDetails(params.id as string);
        setCoinData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch coin details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!coinData) return <div>Coin not found</div>;

  return <CoinDetailsClient initialCoinData={coinData} />;
};

export default CoinDetailsPage;

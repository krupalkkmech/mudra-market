import axios from "axios";

import { ICoin, ICoinDetails, ICurrency, ISearchResult } from "@/types/crypto";

const API_URL = "https://api.coingecko.com/api/v3";

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<ICoin[] | ICoinDetails>> = {};
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchTopCryptos = async (
  currency: ICurrency,
  coinIds: string[] = []
): Promise<ICoin[]> => {
  try {
    if (coinIds.length === 0) {
      const cacheKey = `top-cryptos-${currency}`;
      const cachedData = cache[cacheKey] as CacheItem<ICoin[]> | undefined;

      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.data;
      }
    }

    const response = await axios.get<ICoin[]>(
      `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&ids=${coinIds?.join(
        ","
      )}`
    );

    if (coinIds.length === 0) {
      const cacheKey = `top-cryptos-${currency}`;
      cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export const fetchTopCryptosWithSearch = async (
  currency: ICurrency,
  searchTerm: string
): Promise<ISearchResult> => {
  try {
    const response = await axios.get<ISearchResult>(
      `${API_URL}/search?query=${searchTerm}&vs_currency=${currency}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export const fetchCoinDetails = async (
  coinId: string
): Promise<ICoinDetails> => {
  try {
    const cacheKey = `coin-details-${coinId}`;
    const cachedData = cache[cacheKey] as CacheItem<ICoinDetails> | undefined;

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await axios.get<ICoinDetails>(
      `${API_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false}`
    );

    // Cache the data
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now(),
    };

    return response.data;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
};

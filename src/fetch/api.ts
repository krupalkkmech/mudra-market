import axios from 'axios';

import {
  ICoin,
  ICoinDetails,
  ICurrency,
  ISearchResult,
} from '@/types/crypto';

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCryptos = async (
  currency: ICurrency,
  coinIds: string[] = []
): Promise<ICoin[]> => {
  try {
    const response = await axios.get<ICoin[]>(
      `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&ids=${coinIds?.join(
        ","
      )}`
    );
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
    const response = await axios.get<ICoinDetails>(
      `${API_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
};

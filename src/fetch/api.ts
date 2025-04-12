import axios from 'axios';

import { ICurrency } from '@/types/crypto';

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCryptos = async (
  currency: ICurrency
): Promise<unknown[]> => {
  try {
    const response = await axios.get<unknown[]>(
      `${API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

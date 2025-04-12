import axios from 'axios';

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchTopCryptos = async (): Promise<unknown[]> => {
  try {
    const response = await axios.get<unknown[]>(
      `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

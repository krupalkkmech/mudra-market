export type ICurrency = "usd" | "eur" | "gbp" | "cad" | "inr";
export interface CryptoState {
  coins: ICoin[];
  loading: boolean;
  error: string | null;
  currency: ICurrency;
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

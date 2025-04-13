export type ICurrency = "usd" | "eur" | "gbp" | "cad" | "inr";
export interface ICryptoState {
  coins: ICoin[];
  loading: boolean;
  error: string | null;
  currency: ICurrency;
  selectedCoinData: ICoinDetails | null;
  lastVisited: ICoin[];
  favorites: ICoin[];
}

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null | number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: IRoi | null;
  last_updated: string;
}

export interface IRoi {
  times: number;
  currency: string;
  percentage: number;
}

export interface ICoinDetails {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: null;
  platforms: IPlatforms;
  detail_platforms: IDetailplatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null;
  additional_notices: string[];
  description: IDescription;
  links: ILink;
  image: IImage;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: ICoinMarketdata;
  status_updates: string[];
  last_updated: string;
}

interface ICoinMarketdata {
  current_price: ICurrentprice;
  total_value_locked: null;
  mcap_to_tvl_ratio: null;
  fdv_to_tvl_ratio: null;
  roi: null;
  ath: ICurrentprice;
  ath_change_percentage: ICurrentprice;
  ath_date: IAthdate;
  atl: ICurrentprice;
  atl_change_percentage: ICurrentprice;
  atl_date: IAthdate;
  market_cap: ICurrentprice;
  market_cap_rank: number;
  fully_diluted_valuation: ICurrentprice;
  market_cap_fdv_ratio: number;
  total_volume: ICurrentprice;
  high_24h: ICurrentprice;
  low_24h: ICurrentprice;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: ICurrentprice;
  price_change_percentage_1h_in_currency: ICurrentprice;
  price_change_percentage_24h_in_currency: ICurrentprice;
  price_change_percentage_7d_in_currency: ICurrentprice;
  price_change_percentage_14d_in_currency: ICurrentprice;
  price_change_percentage_30d_in_currency: ICurrentprice;
  price_change_percentage_60d_in_currency: ICurrentprice;
  price_change_percentage_200d_in_currency: ICurrentprice;
  price_change_percentage_1y_in_currency: ICurrentprice;
  market_cap_change_24h_in_currency: ICurrentprice;
  market_cap_change_percentage_24h_in_currency: ICurrentprice;
  total_supply: number;
  max_supply: number;
  max_supply_infinite: boolean;
  circulating_supply: number;
  last_updated: string;
}

interface IAthdate {
  aed: string;
  ars: string;
  aud: string;
  bch: string;
  bdt: string;
  bhd: string;
  bmd: string;
  bnb: string;
  brl: string;
  btc: string;
  cad: string;
  chf: string;
  clp: string;
  cny: string;
  czk: string;
  dkk: string;
  dot: string;
  eos: string;
  eth: string;
  eur: string;
  gbp: string;
  gel: string;
  hkd: string;
  huf: string;
  idr: string;
  ils: string;
  inr: string;
  jpy: string;
  krw: string;
  kwd: string;
  lkr: string;
  ltc: string;
  mmk: string;
  mxn: string;
  myr: string;
  ngn: string;
  nok: string;
  nzd: string;
  php: string;
  pkr: string;
  pln: string;
  rub: string;
  sar: string;
  sek: string;
  sgd: string;
  thb: string;
  try: string;
  twd: string;
  uah: string;
  usd: string;
  vef: string;
  vnd: string;
  xag: string;
  xau: string;
  xdr: string;
  xlm: string;
  xrp: string;
  yfi: string;
  zar: string;
  bits: string;
  link: string;
  sats: string;
}

interface ICurrentprice {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  dot: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  gel: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  yfi: number;
  zar: number;
  bits: number;
  link: number;
  sats: number;
}

interface IImage {
  thumb: string;
  small: string;
  large: string;
}

interface ILink {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: null;
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: IReposurl;
}

interface IReposurl {
  github: string[];
  bitbucket: string[];
}

interface IDescription {
  en: string;
}

interface IPlatforms {
  [key: string]: string;
}

interface IDetailplatforms {
  [key: string]: string;
}

export interface ISearchResult {
  coins: ISearchCoin[];
  exchanges: ISearchExchange[];
  categories: ISearchCategory[];
  nfts: ISearchNft[];
}

interface ISearchNft {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface ISearchCategory {
  id: string;
  name: string;
}

interface ISearchExchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

interface ISearchCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

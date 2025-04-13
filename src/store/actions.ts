import {
  fetchCoinDetails,
  fetchTopCryptos,
  fetchTopCryptosWithSearch,
} from '@/fetch/api';

import {
  fetchCoinsFailure,
  fetchCoinsStart,
  fetchCoinsSuccess,
  setFavoritesList,
  setLastVisitedList,
  setSelectedCoinData,
} from './reducers';
import {
  AppDispatch,
  RootState,
} from './store';

export const getTopCryptos =
  (debouncedSearchTerm: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { currency } = getState().crypto;
      dispatch(fetchCoinsStart());
      if (debouncedSearchTerm) {
        const { coins } = await fetchTopCryptosWithSearch(
          currency,
          debouncedSearchTerm
        );
        const searchCoins = await fetchTopCryptos(
          currency,
          coins?.map((coin) => coin.id)
        );
        dispatch(fetchCoinsSuccess(searchCoins));
      } else {
        const coins = await fetchTopCryptos(currency);
        dispatch(fetchCoinsSuccess(coins));
      }
    } catch (error: unknown) {
      dispatch(fetchCoinsFailure((error as Error)?.message || null));
    }
  };

export const getCoinDetails =
  (coinId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCoinsStart());
      const coinDetails = await fetchCoinDetails(coinId);
      dispatch(setSelectedCoinData(coinDetails));
    } catch (error: unknown) {
      dispatch(fetchCoinsFailure((error as Error)?.message || null));
    }
  };

export const fetchLastVisitedCoinDetailsBasedonList =
  (coinIds: string[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { currency } = getState().crypto;
    const searchCoins = await fetchTopCryptos(currency, coinIds);
    dispatch(setLastVisitedList(searchCoins));
  };

export const fetchFavoritesCoinDetailsBasedonList =
  (coinIds: string[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { currency } = getState().crypto;
    const searchCoins = await fetchTopCryptos(currency, coinIds);
    dispatch(setFavoritesList(searchCoins));
  };

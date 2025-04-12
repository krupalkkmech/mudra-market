import { fetchTopCryptos } from '@/fetch/api';

import {
  fetchCoinsFailure,
  fetchCoinsStart,
  fetchCoinsSuccess,
} from './reducers';
import {
  AppDispatch,
  RootState,
} from './store';

export const getTopCryptos =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { currency } = getState().crypto;
      dispatch(fetchCoinsStart());
      const coins = await fetchTopCryptos(currency);
      console.log(coins);
      dispatch(fetchCoinsSuccess(coins));
    } catch (error: unknown) {
      dispatch(fetchCoinsFailure((error as Error)?.message || null));
    }
  };

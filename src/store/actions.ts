import { fetchTopCryptos } from '@/fetch/api';

import {
  fetchCoinsFailure,
  fetchCoinsStart,
  fetchCoinsSuccess,
} from './reducers';
import { AppDispatch } from './store';

export const getTopCryptos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCoinsStart());
    const coins = await fetchTopCryptos();
    dispatch(fetchCoinsSuccess(coins));
  } catch (error: unknown) {
    dispatch(fetchCoinsFailure((error as Error)?.message || null));
  }
};

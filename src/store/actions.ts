import {
  fetchCoinsFailure,
  fetchCoinsStart,
  fetchCoinsSuccess,
} from './reducers';
import { AppDispatch } from './store';

export const getTopCryptos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCoinsStart());
    // fetch API call for get coin list
    const coins: unknown[] = [];
    dispatch(fetchCoinsSuccess(coins));
  } catch (error: unknown) {
    dispatch(fetchCoinsFailure((error as Error)?.message || null));
  }
};

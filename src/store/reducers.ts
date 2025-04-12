import {
  CryptoState,
  ICurrency,
} from '@/types/crypto';
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
  currency: "usd",
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    fetchCoinsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoinsSuccess(state, action) {
      state.coins = action.payload;
      state.loading = false;
    },
    fetchCoinsFailure(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrency(state, action: PayloadAction<ICurrency>) {
      state.currency = action.payload;
    },
  },
});

export const {
  fetchCoinsStart,
  fetchCoinsSuccess,
  fetchCoinsFailure,
  setCurrency,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;

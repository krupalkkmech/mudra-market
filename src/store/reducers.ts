import {
  ICoinDetails,
  ICryptoState,
  ICurrency,
} from '@/types/crypto';
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const initialState: ICryptoState = {
  coins: [],
  loading: false,
  error: null,
  currency: "usd",
  selectedCoinData: null,
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
    setSelectedCoinData(state, action: PayloadAction<ICoinDetails | null>) {
      state.selectedCoinData = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCoinsStart,
  fetchCoinsSuccess,
  fetchCoinsFailure,
  setCurrency,
  setSelectedCoinData,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;

import {
  ICoin,
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
  lastVisited: [],
  favorites: [],
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
    addToLastVisited(state, action: PayloadAction<ICoin>) {
      const existingIndex = state.lastVisited.findIndex(
        (coin) => coin.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.lastVisited.splice(existingIndex, 1);
      }
      state.lastVisited.unshift(action.payload);
      localStorage.setItem(
        "lastVisited",
        JSON.stringify(state.lastVisited.map((eachCoin) => eachCoin?.id))
      );
    },
    addToFavorites(state, action: PayloadAction<ICoin>) {
      state.favorites.push(action.payload);
      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites.map((eachCoin) => eachCoin?.id))
      );
    },
    removeFromFavorites(state, action: PayloadAction<ICoin>) {
      state.favorites = state.favorites.filter(
        (coin) => coin.id !== action.payload.id
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites.map((eachCoin) => eachCoin?.id))
      );
    },
    setLastVisitedList(state, action: PayloadAction<ICoin[]>) {
      state.lastVisited = action.payload;
    },
    setFavoritesList(state, action: PayloadAction<ICoin[]>) {
      state.favorites = action.payload;
    },
  },
});

export const {
  fetchCoinsStart,
  fetchCoinsSuccess,
  fetchCoinsFailure,
  setCurrency,
  setSelectedCoinData,
  addToLastVisited,
  addToFavorites,
  removeFromFavorites,
  setLastVisitedList,
  setFavoritesList,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;

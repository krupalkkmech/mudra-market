import { ICurrency } from "@/types/crypto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  currency: ICurrency;
  displayMode: "table" | "card";
  theme: "light" | "dark";
}

const initialState: SettingsState = {
  currency:
    typeof window !== "undefined"
      ? (localStorage.getItem("defaultCurrency") as ICurrency) || "usd"
      : "usd",
  displayMode:
    typeof window !== "undefined"
      ? (localStorage.getItem("displayMode") as "table" | "card") || "table"
      : "table",
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<ICurrency>) => {
      state.currency = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("defaultCurrency", action.payload);
      }
    },
    setDisplayMode: (state, action: PayloadAction<"table" | "card">) => {
      state.displayMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("displayMode", action.payload);
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
  },
});

export const { setCurrency, setDisplayMode, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;

"use client";

import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CryptoCard from "@/components/CoinCard";
import CoinTable from "@/components/CoinTable";
import CurrencySelect from "@/components/CurrencySelect";
import { useDebounce } from "@/hook/useDebounce";
import { getTopCryptos } from "@/store/actions";
import { setCurrency } from "@/store/reducers";
import { RootState } from "@/store/store";
import { Action } from "@reduxjs/toolkit";

const CryptoList = () => {
  const { coins, loading, currency } = useSelector(
    (state: RootState) => state.crypto
  );

  const {
    currency: globalCurrency,
    displayMode,
    theme,
  } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(getTopCryptos(debouncedSearchTerm) as unknown as Action);
  }, [dispatch, currency, globalCurrency, debouncedSearchTerm]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    dispatch(setCurrency(currency));
  }, [dispatch, currency]);

  useEffect(() => {
    dispatch(setCurrency(globalCurrency));
  }, [dispatch, globalCurrency]);

  const displayCoinsCardOrTable = useMemo(() => {
    if (displayMode === "table") {
      return <CoinTable coins={coins} currency={currency} />;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    );
  }, [coins, currency, displayMode]);

  if (loading) return <div>Loading coins...</div>;
  if (!coins.length) return <div>No coins found</div>;

  return (
    <div className="m-[20px]">
      <div className="flex justify-end gap-4 mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
        <CurrencySelect currencyValue={currency} />
      </div>
      {displayCoinsCardOrTable}
    </div>
  );
};

export default CryptoList;

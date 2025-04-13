"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CryptoCard from '@/components/CoinCard';
import CurrencySelect from '@/components/CurrencySelect';
import { useDebounce } from '@/hook/useDebounce';
import { getTopCryptos } from '@/store/actions';
import { RootState } from '@/store/store';
import { Action } from '@reduxjs/toolkit';

const CryptoList = () => {
  const { coins, loading, currency } = useSelector(
    (state: RootState) => state.crypto
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    dispatch(getTopCryptos(debouncedSearchTerm) as unknown as Action);
  }, [dispatch, currency, debouncedSearchTerm]);

  if (loading) return <div>Loading coins...</div>;
  if (!coins.length) return <div>No coins found</div>;

  return (
    <div className="m-[20px]">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <CurrencySelect currencyValue={currency} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default CryptoList;

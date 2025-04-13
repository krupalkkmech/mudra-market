import React from 'react';

import { useDispatch } from 'react-redux';

import { setCurrency } from '@/store/reducers';
import { ICurrency } from '@/types/crypto';

const CurrencySelect: React.FC<{
  setCoinCurrency?: (currency: ICurrency) => void;
  currencyValue: ICurrency;
}> = ({ setCoinCurrency, currencyValue }) => {
  const dispatch = useDispatch();

  return (
    <select
      className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      value={currencyValue}
      onChange={(e) => {
        if (setCoinCurrency) {
          setCoinCurrency(e.target.value as ICurrency);
        } else {
          dispatch(setCurrency(e.target.value as ICurrency));
        }
      }}
    >
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="gbp">GBP</option>
      <option value="cad">CAD</option>
      <option value="inr">INR</option>
    </select>
  );
};

export default CurrencySelect;

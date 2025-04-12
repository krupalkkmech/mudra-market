import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setCurrency } from '@/store/reducers';
import { RootState } from '@/store/store';
import { ICurrency } from '@/types/crypto';

const CurrencySelect: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.crypto);
  return (
    <select
      className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      value={currency}
      onChange={(e) => dispatch(setCurrency(e.target.value as ICurrency))}
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

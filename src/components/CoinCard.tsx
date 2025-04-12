"use client";

import React from 'react';

import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { ICoin } from '@/types/crypto';
import { CURRENCIE_MAP } from '@/utils/constants';

interface CryptoCardProps {
  coin: ICoin;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ coin }) => {
  const { currency } = useSelector((state: RootState) => state.crypto);

  return (
    <Link
      href={`/coin/${coin.id}`}
      className="block p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-2">
        <img
          src={coin.image}
          alt={coin.name}
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <h3 className="font-semibold">{coin.name}</h3>
        <span className="text-gray-500 text-sm">
          {coin.symbol.toUpperCase()}
        </span>
      </div>
      <div className="space-y-1">
        <p>
          Price: {CURRENCIE_MAP[currency]}
          {coin.current_price.toLocaleString()}
        </p>
        <p>
          Market Cap: {CURRENCIE_MAP[currency]}
          {coin.market_cap.toLocaleString()}
        </p>
        <p
          className={
            coin.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default CryptoCard;

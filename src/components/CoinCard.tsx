"use client";

import React, {
  memo,
  useMemo,
} from 'react';

import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addToFavorites,
  removeFromFavorites,
} from '@/store/reducers';
import { RootState } from '@/store/store';
import { ICoin } from '@/types/crypto';
import { CURRENCIE_MAP } from '@/utils/constants';

interface CryptoCardProps {
  coin: ICoin;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ coin }) => {
  const dispatch = useDispatch();
  const { currency, favorites } = useSelector(
    (state: RootState) => state.crypto
  );

  const isFavorite = useMemo(() => {
    return favorites.some((favorite) => favorite.id === coin.id);
  }, [favorites, coin.id]);

  return (
    <Link
      href={`/coin/${coin.id}`}
      className="block p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <img
            src={coin.image}
            alt={coin.name}
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <h3 className="font-semibold">{coin.name}</h3>
          <span className="text-gray-500 text-sm">
            {coin?.symbol?.toUpperCase?.()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (isFavorite) {
              toast.success("Remove from favorites!");
              dispatch(removeFromFavorites(coin));
            } else {
              toast.success("Add to favorites!");
              dispatch(addToFavorites(coin));
            }
          }}
          className="mb-2 p-1 hover:text-yellow-400 transition-colors"
          aria-label={`Mark ${coin.name} as favorite`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{
              color: isFavorite ? "#FFD700" : "currentColor",
              fill: isFavorite ? "#FFD700" : "none",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
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
            (coin?.price_change_percentage_24h || 0) >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {(coin?.price_change_percentage_24h || 0).toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default memo(CryptoCard);

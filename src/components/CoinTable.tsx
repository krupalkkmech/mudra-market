import React from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addToFavorites, removeFromFavorites } from "@/store/reducers";
import { RootState } from "@/store/store";
import { ICoin } from "@/types/crypto";

type Props = {
  coins: ICoin[];
  currency: string;
};

const CoinTable: React.FC<Props> = ({ coins, currency }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.crypto);
  // const { theme } = useSelector((state: RootState) => state.settings);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 px-4 py-2 border"></th>
            <th className="sticky left-[60px] px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Symbol</th>
            <th className="px-4 py-2 border">Current Price</th>
            <th className="px-4 py-2 border">24h Change</th>
            <th className="px-4 py-2 border">Market Cap</th>
            <th className="px-4 py-2 border">Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const isFavorite = favorites.some((fav) => fav.id === coin.id);
            return (
              <tr key={coin.id}>
                <td className="px-4 py-2 border">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      const isFavorite = favorites.some(
                        (fav) => fav.id === coin.id
                      );
                      if (isFavorite) {
                        toast.success("Removed from favorites!");
                        dispatch(removeFromFavorites(coin));
                      } else {
                        toast.success("Add to favorites!");
                        dispatch(addToFavorites(coin));
                      }
                    }}
                    className="p-1 hover:text-yellow-400 transition-colors"
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
                </td>
                <td
                  className="sticky left-[0] px-4 py-2 border flex items-center cursor-pointer"
                  onClick={() => {
                    router.push(`/coin/${coin.id}`);
                  }}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name}
                </td>
                <td className="px-4 py-2 border uppercase">{coin.symbol}</td>
                <td className="px-4 py-2 border">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                  }).format(coin.current_price)}
                </td>
                <td
                  className={`px-4 py-2 border ${
                    coin.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-4 py-2 border">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                    notation: "compact",
                  }).format(coin.market_cap)}
                </td>
                <td className="px-4 py-2 border">
                  {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                  }).format(coin.total_volume)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;

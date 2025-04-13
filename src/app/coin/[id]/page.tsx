"use client";

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useParams } from 'next/navigation';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CurrencySelect from '@/components/CurrencySelect';
import { getCoinDetails } from '@/store/actions';
import {
  addToLastVisited,
  setSelectedCoinData,
} from '@/store/reducers';
import { RootState } from '@/store/store';
import { ICurrency } from '@/types/crypto';
import { CURRENCIE_MAP } from '@/utils/constants';
import { Action } from '@reduxjs/toolkit';

type Props = {
  params: {
    id: string;
  };
};

const CoinDetails: React.FC<Props> = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { selectedCoinData, coins, loading, currency } = useSelector(
    (state: RootState) => state.crypto
  );
  const coinId = useMemo(() => params.id as string, [params.id]);

  const [coinCurrency, setCoinCurrency] = useState<ICurrency>(currency);

  useEffect(() => {
    return () => {
      dispatch(setSelectedCoinData(null));
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      await dispatch(getCoinDetails(coinId) as unknown as Action);
      const coinData = coins.find((eachCoin) => eachCoin?.id === coinId);
      if (coinData) {
        dispatch(addToLastVisited(coinData));
      }
    };
    fetchCoinDetails();
  }, [coinId, dispatch, coins]);

  if (loading) return <div>Loading...</div>;
  if (!selectedCoinData) return <div>Coin not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <CurrencySelect
          currencyValue={coinCurrency}
          setCoinCurrency={setCoinCurrency}
        />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={selectedCoinData.image.large}
            alt={selectedCoinData.name}
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {selectedCoinData.name} ({selectedCoinData.symbol.toUpperCase()})
            </h1>
            <p className="text-gray-500">
              Rank: #{selectedCoinData.market_cap_rank}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-500">Current Price</h3>
            <p className="text-xl font-bold">
              {CURRENCIE_MAP[coinCurrency]}
              {selectedCoinData.market_data.current_price[
                coinCurrency
              ].toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-500">Market Cap</h3>
            <p className="text-xl font-bold">
              {CURRENCIE_MAP[coinCurrency]}
              {selectedCoinData.market_data.market_cap[
                coinCurrency
              ].toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-500">24h Change</h3>
            <p
              className={`text-xl font-bold ${
                selectedCoinData.market_data.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedCoinData.market_data.price_change_percentage_24h.toFixed(
                2
              )}
              %
            </p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">All Time High</td>
                    <td className="py-2 font-medium">
                      {CURRENCIE_MAP[coinCurrency]}
                      {selectedCoinData.market_data.ath[
                        coinCurrency
                      ].toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">All Time Low</td>
                    <td className="py-2 font-medium">
                      {CURRENCIE_MAP[coinCurrency]}
                      {selectedCoinData.market_data.atl[
                        coinCurrency
                      ].toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">24h High</td>
                    <td className="py-2 font-medium">
                      {CURRENCIE_MAP[coinCurrency]}
                      {selectedCoinData.market_data.high_24h[
                        coinCurrency
                      ].toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">24h Low</td>
                    <td className="py-2 font-medium">
                      {CURRENCIE_MAP[coinCurrency]}
                      {selectedCoinData.market_data.low_24h[
                        coinCurrency
                      ].toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Price Change (7d)</td>
                    <td
                      className={`py-2 font-medium ${
                        selectedCoinData.market_data
                          .price_change_percentage_7d >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {selectedCoinData.market_data.price_change_percentage_7d.toFixed(
                        2
                      )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Price Change (30d)</td>
                    <td
                      className={`py-2 font-medium ${
                        selectedCoinData.market_data
                          .price_change_percentage_30d >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {selectedCoinData.market_data.price_change_percentage_30d.toFixed(
                        2
                      )}
                      %
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Total Supply</td>
                    <td className="py-2 font-medium">
                      {selectedCoinData.market_data.total_supply
                        ? selectedCoinData.market_data.total_supply.toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Circulating Supply</td>
                    <td className="py-2 font-medium">
                      {selectedCoinData.market_data.circulating_supply
                        ? selectedCoinData.market_data.circulating_supply.toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: selectedCoinData.description.en,
          }}
        />
      </div>
    </div>
  );
};

export default CoinDetails;

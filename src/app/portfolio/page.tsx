"use client";

import { useSelector } from 'react-redux';

import CoinCard from '@/components/CoinCard';
import { RootState } from '@/store/store';

const Portfolio: React.FC = () => {
  const { lastVisited, favorites } = useSelector(
    (state: RootState) => state.crypto
  );
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Last Visited Coins</h2>
          {lastVisited.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lastVisited.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recently visited coins</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Favorite Coins</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No favorite coins added yet</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Portfolio;

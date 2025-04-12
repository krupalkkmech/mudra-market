"use client";
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export default function Home() {
  const { coins } = useSelector((state: RootState) => state.crypto);

  console.log(coins);
  return <div>coins list display here</div>;
}

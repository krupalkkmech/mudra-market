"use client";

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBitcoin } from 'react-icons/fa';
import {
  MdAccountBalanceWallet,
  MdTrendingUp,
} from 'react-icons/md';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FaBitcoin className="text-2xl" />
            <span className="text-xl font-bold">Mudra Market</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-1 ${
                pathname === "/"
                  ? "font-bold border-b-2 border-white"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <MdTrendingUp />
              <span>Market</span>
            </Link>
            <Link
              href="/portfolio"
              className={`flex items-center space-x-1 ${
                pathname === "/portfolio"
                  ? "font-bold border-b-2 border-white"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <MdAccountBalanceWallet />
              <span>Portfolio</span>
            </Link>
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-indigo-700 px-4 py-2 transition-all duration-200 ease-in-out ${
          isMenuOpen
            ? "max-h-[200px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link
          href="/"
          className={`block py-2 ${pathname === "/" ? "font-bold" : ""}`}
        >
          Market
        </Link>
        <Link
          href="/portfolio"
          className={`block py-2 ${
            pathname === "/portfolio" ? "font-bold" : ""
          }`}
        >
          Portfolio
        </Link>
      </div>
    </nav>
  );
}

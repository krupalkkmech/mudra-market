"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBitcoin } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdAccountBalanceWallet, MdTrendingUp } from "react-icons/md";
import { useDispatch } from "react-redux";

import {
  fetchFavoritesCoinDetailsBasedonList,
  fetchLastVisitedCoinDetailsBasedonList,
} from "@/store/actions";
import { setCurrency, setTheme } from "@/store/slices/settingsSlice";
import { AppDispatch } from "@/store/store";
import { ICurrency } from "@/types/crypto";
import { Action } from "@reduxjs/toolkit";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLastVisitedCoinList = useCallback(async () => {
    const lastVisited = localStorage.getItem("lastVisited");
    if (lastVisited) {
      const lastVisitedArray = JSON.parse(lastVisited);
      if (lastVisitedArray.length > 0) {
        dispatch(
          fetchLastVisitedCoinDetailsBasedonList(
            lastVisitedArray
          ) as unknown as Action
        );
      }
    }
  }, [dispatch]);

  const handleFavorites = useCallback(async () => {
    const favorites = localStorage.getItem("favorites");
    console.log(favorites);
    if (favorites) {
      const favoritesArray = JSON.parse(favorites);
      if (favoritesArray.length > 0) {
        dispatch(
          fetchFavoritesCoinDetailsBasedonList(favoritesArray)
        ) as unknown as Action;
      }
    }
  }, [dispatch]);

  useEffect(() => {
    handleLastVisitedCoinList();
    handleFavorites();
  }, [dispatch, handleFavorites, handleLastVisitedCoinList]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      dispatch(setTheme(theme as "light" | "dark"));
    }
    const currency = localStorage.getItem("currency");
    if (currency) {
      dispatch(setCurrency(currency as ICurrency));
    }
  }, [dispatch]);

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
            <Link
              href="/settings"
              className={`flex items-center space-x-1 ${
                pathname === "/settings"
                  ? "font-bold border-b-2 border-white"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <IoSettings />
              <span>Settings</span>
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
          className={`block py-2 flex items-center space-x-2 gap-2 ${
            pathname === "/" ? "font-bold" : ""
          }`}
          onClick={() => {
            toggleMenu();
          }}
        >
          <MdTrendingUp />
          Market
        </Link>
        <Link
          href="/portfolio"
          className={`block py-2 flex items-center space-x-2 gap-2 ${
            pathname === "/portfolio" ? "font-bold" : ""
          }`}
          onClick={() => {
            toggleMenu();
          }}
        >
          <MdAccountBalanceWallet />
          Portfolio
        </Link>
        <Link
          href="/settings"
          className={`block py-2 flex items-center space-x-2 gap-2 ${
            pathname === "/settings" ? "font-bold" : ""
          }`}
          onClick={() => {
            toggleMenu();
          }}
        >
          <IoSettings />
          Settings
        </Link>
      </div>
    </nav>
  );
}

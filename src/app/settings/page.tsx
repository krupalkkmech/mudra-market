"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrency,
  setDisplayMode,
  setTheme,
} from "@/store/slices/settingsSlice";
import { RootState } from "@/store/store";
import { ICurrency } from "@/types/crypto";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { currency, displayMode, theme } = useSelector(
    (state: RootState) => state.settings
  );
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localDisplayMode, setLocalDisplayMode] = useState(displayMode);
  const [localTheme, setLocalTheme] = useState(theme);

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedCurrency =
      (localStorage.getItem("defaultCurrency") as ICurrency) || "usd";
    const savedDisplayMode = localStorage.getItem("displayMode") || "table";
    const savedTheme = localStorage.getItem("theme") || "light";

    setLocalCurrency(savedCurrency);
    setLocalDisplayMode(savedDisplayMode as "table" | "card");
    setLocalTheme(savedTheme as "light" | "dark");
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme);
    htmlElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSaveSettings = () => {
    dispatch(setCurrency(localCurrency));
    dispatch(setDisplayMode(localDisplayMode));
    dispatch(setTheme(localTheme));
    localStorage.setItem("defaultCurrency", localCurrency);
    localStorage.setItem("displayMode", localDisplayMode);
    localStorage.setItem("theme", localTheme);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Currency
          </label>
          <select
            value={localCurrency}
            onChange={(e) => setLocalCurrency(e.target.value as ICurrency)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="cad">CAD</option>
            <option value="inr">INR</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Default View
          </label>
          <select
            value={localDisplayMode}
            onChange={(e) =>
              setLocalDisplayMode(e.target.value as "table" | "card")
            }
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="table">Table View</option>
            <option value="card">Card View</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <select
            value={localTheme}
            onChange={(e) => setLocalTheme(e.target.value as "light" | "dark")}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          onClick={handleSaveSettings}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

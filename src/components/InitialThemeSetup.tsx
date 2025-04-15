"use client";

import { useEffect } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

export default function InitialThemeSetup() {
  const { theme } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme);
    console.log(htmlElement);
    htmlElement.setAttribute("data-theme", theme);

    const bodyElement = document.body;
    if (theme === "dark") {
      bodyElement.classList.add("dark:bg-gray-900", "dark:text-white");
      bodyElement.classList.remove("bg-white", "text-gray-900");
    } else {
      bodyElement.classList.add("bg-white", "text-gray-900");
      bodyElement.classList.remove("dark:bg-gray-900", "dark:text-white");
    }
  }, [theme]);

  return null;
}

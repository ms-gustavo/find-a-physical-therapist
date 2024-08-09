"use client";

import { useEffect } from "react";

const ThemeProvider = () => {
  useEffect(() => {
    const theme = window.localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return null;
};

export default ThemeProvider;

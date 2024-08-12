"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      data-value="theme-toggle"
      onClick={toggleTheme}
      className="text-light-text dark:text-dark-text"
    >
      {theme === "light" ? (
        <MoonIcon data-value="moon-icon" className="h-6 w-6" />
      ) : (
        <SunIcon data-value="sun-icon" className="h-6 w-6" />
      )}
    </button>
  );
}

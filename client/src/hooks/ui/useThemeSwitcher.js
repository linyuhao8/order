"use client";
import { useState, useEffect } from "react";

const useThemeSwitcher = (theme) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Runs only on the client side
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
  }, [theme, isClient]); // Only update the DOM when the theme changes

  if (!isClient) {
    return null; // Do not render the Navbar until the client is loaded.
  }
};

export default useThemeSwitcher;

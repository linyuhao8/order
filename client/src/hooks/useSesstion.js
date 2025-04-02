"use client";
import { useState, useEffect } from "react";

// Custom hook to retrieve data from sessionStorage
const useSession = (key) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Read data from sessionStorage
    const storedData = sessionStorage.getItem(key);

    if (storedData) {
      // If data exists, parse and update state
      setData(JSON.parse(storedData));
    }
  }, [key]); // Re-run effect when the key changes

  return data;
};

export default useSession;

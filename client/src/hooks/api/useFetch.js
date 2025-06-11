import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useFetch(url, options = {}) {
  const { withCredentials = false, enabled = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, { withCredentials });
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
      toast.error(
        err.response?.data?.message || err.message || "載入資料失敗！"
      );
    } finally {
      setLoading(false);
    }
  }, [url, withCredentials, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

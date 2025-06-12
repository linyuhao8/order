import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//使用方法
// 如果要等到有值詞fetch 可以 enabled:!!userId
// const { data, loading, error, refetch } = useFetch("/api/your-endpoint", {
//   withCredentials: true,
//   enabled: false, // 先不自動發
// });

// // POST 新增
// const createData = async (newItem) => {
//   await refetch({ method: "POST", body: newItem });
// };

// // PUT 更新
// const updateData = async (updatedItem) => {
//   await refetch({ method: "PUT", body: updatedItem });
// };

// // DELETE 刪除（通常不用 body，但也可以帶）
// const deleteData = async () => {
//   await refetch({ method: "DELETE" });
// };

export default function useFetch(defaultUrl = "", options = {}) {
  const {
    withCredentials = false,
    enabled = true,
    method = "GET",
    body = null,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(
    async ({
      url = defaultUrl,
      method: reqMethod = method,
      body: reqBody = body,
    } = {}) => {
      if (!url) {
        toast.error("請求 URL 不可為空");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method: reqMethod,
          data: reqBody,
          withCredentials,
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        toast.error(err.response?.data?.message || err.message || "請求失敗！");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [defaultUrl, withCredentials, method, body]
  );

  // 新增自動請求效果
  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled, refetch]);

  return { data, loading, error, refetch };
}

"use client";
import React, { useEffect } from "react";
import useFetch from "@/hooks/api/useFetch";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";

const ProductList = ({ menuId, onProductCountChange }) => {
  const url = menuId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/menu/${menuId}?limit=5`
    : null;

  const {
    data: products,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: !!menuId,
  });

  useEffect(() => {
    if (products && typeof onProductCountChange === "function")
      onProductCountChange(products.length || 0);
  }, [products, onProductCountChange]);

  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
      {products?.map((product) => (
        <div
          key={product.id}
          className="group relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              {/* 左側內容 */}
              <div className="flex-1 space-y-3">
                {/* 產品名稱 */}
                <div>
                  <h3 className="text-sm text-gray-600  dark:text-gray-300 font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </h3>
                </div>

                {/* 描述 */}
                <p className="text-[10px] text-gray-500 text-muted-foreground leading-relaxed">
                  {product.description?.slice(0, 30) || "暫無描述"}
                </p>

                {/* 時間資訊 */}
                <div className="flex items-center gap-4 text-[12px]">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
                    建立: {formatDate(product.createdAt)}
                  </div>
                  {product.createdAt !== product.updatedAt && (
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-blue-500"></span>
                      更新: {formatDate(product.updatedAt)}
                    </div>
                  )}
                </div>
                <div className="text-[10px]">{product.id}</div>
              </div>

              {/* 右側價格區域 */}
              <div className="flex flex-col items-end gap-3 ml-6">
                {/* 價格標籤 */}
                <div className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-[12px] shadow-sm">
                  NT$ {product.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* 懸停效果的裝飾線 */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}

      {/* 空狀態 */}
      {products?.length === 0 && (
        <div className="flex flex-col items-start justify-center py-16">
          <div className="rounded-full bg-muted p-4 mb-4">
            <div className="text-4xl">🍽️</div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            暫無產品
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            此選單目前沒有任何產品，請新增產品後再查看
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

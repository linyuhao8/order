"use client";

import { useState, useMemo } from "react";
import ProductList from "../product/ProductList";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";
import { MdDelete } from "react-icons/md";

export default function MerchantMenu({ id }) {
  //用物件的方式紀錄每個菜單的商品數量 ex: {menuId : 2}
  const [productCount, setProductCounts] = useState({});

  //根據商家ID取得菜單
  const getMenusUrl = id
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/menus/merchant/${id}?limit=1`
    : null;

  //getMenus API
  const {
    data: menus,
    loading: menusLoading,
    refetch: menusRefetch,
  } = useFetch(getMenusUrl, {
    withCredentials: true,
    enabled: !!id,
  });

  //Delete API
  const { refetch: deleteRefetch } = useFetch(null, {
    method: "DELETE",
    withCredentials: true,
    enabled: false,
  });

  // 為每個 menuId 建立固定的 callback，避免重複渲染或 eslint 錯誤
  // 用useMemo來記錄，只要menu不改變，就不需變動商品數量
  const productCountCallbacks = useMemo(() => {
    const obj = {};
    //每個做處理key,value
    menus?.forEach((menu) => {
      //count為callback function傳入的參數（在productlist裡面設定的）
      obj[menu.id] = (count) =>
        //設定狀態
        setProductCounts((prev) => {
          //如果menuId的count一樣就不用更新
          if (prev[menu.id] === count) {
            return prev;
          }
          //不一樣就更新count
          return { ...prev, [menu.id]: count };
        });
    });
    //回傳結果
    return obj;
  }, [menus]);

  const handleDelete = async (menuId, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this Menu: ${name}?`
    );
    if (!confirmDelete) return;
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/menus/${menuId}`;
      const res = await deleteRefetch({ url });
      if (res) menusRefetch(); // 重新拉菜單資料
    } catch (e) {
      //useFetch裡面會處理回傳錯誤
      console.log(e);
    }
  };

  if (menusLoading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* 標題區域 */}
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-semibold tracking-tight">Menu</h3>
        <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
          {menus?.length} 個菜單
        </div>
      </div>

      {menus?.length === 0 ? (
        /* 空狀態 */
        <div className="flex flex-col items-center justify-center py-12 rounded-lg border border-dashed border-border bg-muted/30">
          <div className="rounded-full bg-muted p-3 mb-3">
            <div className="text-3xl">📋</div>
          </div>
          <h4 className="text-base font-medium text-foreground mb-1">
            no menu.
          </h4>
          <p className="text-sm text-muted-foreground">
            Please create your first menu.
          </p>
        </div>
      ) : (
        /* 菜單列表 */
        <div className="flex flex-col gap-8 mb-8">
          {menus?.map((menu) => (
            <div
              key={menu.id}
              className="dark:bg-gray-800 group relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {/* 左側菜單資訊 */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-col md:flex-row justify-start items-start sm:items-center gap-2">
                      {/* 菜單名稱 */}
                      <div>
                        <h4 className="text-xl  text-gray-700  dark:text-gray-200 font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                          {menu.name}
                        </h4>
                      </div>
                      {/* 菜單 ID 標籤 */}
                      <div className="inline-flex text-gray-400 items-center rounded-md  text-xs font-semibold  hover:bg-secondary/80">
                        ID: {menu.id}
                      </div>
                    </div>

                    {/* 菜單描述 */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {menu.description || "暫無描述"}
                    </p>
                  </div>

                  {/* 右側統計資訊 */}
                  <div className="flex items-center gap-3 ml-6">
                    <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                      <span className="mr-1.5">📊</span>
                      <p>{productCount[menu.id]} 項商品</p>
                    </div>

                    <Button
                      variant="square"
                      onClick={() => handleDelete(menu.id, menu.name)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>

                {/* 產品列表區域 */}
                <div className="border-t border-gray-200 mt-4">
                  <div>
                    <ProductList
                      menuId={menu.id}
                      onProductCountChange={productCountCallbacks[menu.id]}
                    />
                    {/* productCountCallbacks = {
  1: (count) => { ... }, // 對應 menu id = 1 的 callback
  2: (count) => { ... }, // 對應 menu id = 2 的 callback
  3: (count) => { ... }, // ... */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

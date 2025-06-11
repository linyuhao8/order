"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function MerchantMenu({ id }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/menus/merchant/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMenus(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMenus([]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>載入中...</p>;

  return (
    <div>
      <h3 className="text-xl">商家菜單</h3>
      {menus.length === 0 ? (
        <p>沒有菜單資料</p>
      ) : (
        <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 mb-3 p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="flex-col flex">
                      <div className="group">
                        <span className="text-sm text-gray-400">{menu.id}</span>
                        <h3 className="text-xl font-normal text-gray-800 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {menu.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        desciption: {menu.description}
                      </p>
                      {/* <div>product</div> */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400 flex items-center">
                      13 Item
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

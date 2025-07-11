"use client";
import { useState } from "react";

import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";

const MenuTab = ({ merchantId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/menus/create`;

  // 商家表單狀態
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    merchant_id: merchantId,
  });

  //API
  const { loading, refetch } = useFetch(url, {
    withCredentials: true,
    enabled: false,
  });

  //用戶輸入
  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenuForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //表單
  const handleMenuSubmit = async (e) => {
    try {
      e.preventDefault();
      await refetch({ method: "POST", body: menuForm });
      setMenuForm({ name: "", description: "" });
    } catch (e) {
      // 已經在 useFetch 裡 toast.error 過了
      console.log(e);
    }
  };
  if (loading) return <Loading />;

  return (
    <>
      {/* 商家表單區塊 */}
      <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            Menu info
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            A variety of new products can be added to the menu
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleMenuSubmit}>
            <div className="px-4 py-5  sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <InputField
                    type="text"
                    name="name"
                    id="name"
                    value={menuForm.name}
                    onChange={handleMenuChange}
                    label="Menu Name"
                    placeholder="Enter Name"
                    required
                  />
                </div>

                {/* 商家描述 */}
                <div className="sm:col-span-6">
                  <InputField
                    id="description"
                    name="description"
                    type="textarea"
                    value={menuForm.description}
                    onChange={handleMenuChange}
                    label="description"
                    placeholder="Enter..."
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                size="lg"
              >
                {loading ? "handling..." : "submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MenuTab;

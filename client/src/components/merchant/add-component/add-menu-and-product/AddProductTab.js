"use client";
import { useEffect, useState } from "react";

import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import useFetch from "@/hooks/api/useFetch";

const AddProductTab = ({ merchantId }) => {
  const productCreateurl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/create`;
  const menuListUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/menus/merchant/${merchantId}`;

  // 商家表單狀態
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    menu_id: "",
    is_active: true,
    cost_price: 0,
  });

  // POST - Create product
  const { loading: createLoading, refetch: createRefetch } = useFetch(
    productCreateurl,
    {
      withCredentials: true,
      enabled: false,
    }
  );

  // GET - MenusList
  const {
    data: menus,
    loading: menuLoading,
    refetch: menuRefetch,
  } = useFetch(menuListUrl, {
    withCredentials: true,
    enabled: false,
  });

  //用戶輸入
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //表單
  const handleProductSubmit = async (e) => {
    try {
      e.preventDefault();
      await createRefetch({ method: "POST", body: productForm });
      setProductForm({
        name: "",
        description: "",
        price: "",
        menu_id: "",
        is_active: false,
        cost_price: "",
      });
    } catch (e) {
      // 已經在 useFetch 裡 toast.error 過了
      console.log(e);
    }
  };
  useEffect(() => {
    if (merchantId) {
      menuRefetch();
    }
  }, [merchantId, menuRefetch]);

  useEffect(() => {
    if (menus) {
      console.log(menus);
    }
  }, [menus]);

  //需要取得所有的productid讓其挑選
  return (
    <>
      {/* 商家表單區塊 */}
      <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            Product info
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            A variety of new products can be added to the product
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleProductSubmit}>
            <div className="px-4 py-5  sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                {/* name */}
                <div className="sm:col-span-3">
                  <InputField
                    type="text"
                    name="name"
                    id="name"
                    label="name"
                    required
                    value={productForm.name}
                    onChange={handleProductChange}
                  />
                </div>

                {/* is_active */}
                <div className="sm:col-span-6">
                  <InputField
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={productForm.is_active}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        is_active: e.target.checked,
                      })
                    }
                    label="active"
                  />
                </div>

                {/* description */}
                <div className="sm:col-span-6">
                  <InputField
                    id="description"
                    name="description"
                    type="textarea"
                    value={productForm.description}
                    onChange={handleProductChange}
                    label="description"
                    placeholder="Enter..."
                  />
                </div>

                {/* menu */}
                <div className="sm:col-span-3">
                  <InputField
                    id="menu_id"
                    name="menu_id"
                    type="select"
                    value={productForm.menu_id}
                    onChange={handleProductChange}
                    label="select menu"
                    options={menus?.map((menu) => ({
                      id: menu.id,
                      name: menu.name,
                    }))}
                    selectPlaceholder="-- select your menu --"
                  />
                </div>

                {/* pricing */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <InputField
                    type="number"
                    name="price"
                    id="price"
                    required
                    value={productForm.price}
                    onChange={handleProductChange}
                  />
                </div>

                {/* cost_pricing */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="cost"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Cost Price <span className="text-red-500">*</span>
                  </label>
                  <InputField
                    type="number"
                    name="cost_price"
                    id="cost_price"
                    required
                    value={productForm.cost_price}
                    onChange={handleProductChange}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
              <Button
                type="submit"
                disabled={createLoading || menuLoading}
                variant="outline"
                size="lg"
              >
                {createLoading || menuLoading ? "handling..." : "submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductTab;

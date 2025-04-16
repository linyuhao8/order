import InputField from "@/components/common/InputField";
import { useState } from "react";

const MerchantTab = ({ activeTab, categories }) => {
  const [isLoading, setIsLoading] = useState(false);
  // 商家表單狀態
  const [merchantForm, setMerchantForm] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    categoryId: "",
    openingHours: "",
    website: "",
  });

  const handleMerchantChange = (e) => {
    const { name, value } = e.target;
    setMerchantForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMerchantSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // 模擬API調用的延遲
    setTimeout(() => {
      setIsLoading(false);
      // 顯示成功訊息
      alert("商家新增成功！");
      // 重置表單
      setMerchantForm({
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        logo: null,
        categoryId: "",
        openingHours: "",
        website: "",
      });
    }, 1000);
  };
  return (
    <>
      {/* 商家表單區塊 */}
      {activeTab === "merchant" && (
        <div className="bg-white shadow-md overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              新增商家資料
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              請填寫以下商家基本資訊
            </p>
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleMerchantSubmit}>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      商家名稱 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={merchantForm.name}
                        onChange={handleMerchantChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="categoryId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      商家分類 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="categoryId"
                        name="categoryId"
                        required
                        value={merchantForm.categoryId}
                        onChange={handleMerchantChange}
                        className="block w-full py-1 px-3 text-gray-900 dark:text-gray-100 border border-gray-300 rounded-sm rounded-sm placeholder-gray-400 placeholder-text-sm focus:ring-amber-500"
                      >
                        <option value="">請選擇分類</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name} ({category.merchants.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      電子郵件 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={merchantForm.email}
                        onChange={handleMerchantChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      聯絡電話 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="text"
                        name="phone"
                        id="phone"
                        required
                        value={merchantForm.phone}
                        onChange={handleMerchantChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      地址 <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={merchantForm.address}
                        onChange={handleMerchantChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      網站
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="url"
                        name="website"
                        id="website"
                        value={merchantForm.website}
                        onChange={handleMerchantChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="openingHours"
                      className="block text-sm font-medium text-gray-700"
                    >
                      營業時間
                    </label>
                    <div className="mt-1">
                      <InputField
                        type="text"
                        name="openingHours"
                        id="openingHours"
                        value={merchantForm.openingHours}
                        onChange={handleMerchantChange}
                        placeholder="例：週一至週五 9:00-18:00"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="logo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      商家Logo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        上傳
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      商家描述
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={merchantForm.description}
                        onChange={handleMerchantChange}
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      簡短描述商家特色與服務
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {isLoading ? "處理中..." : "新增商家"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MerchantTab;

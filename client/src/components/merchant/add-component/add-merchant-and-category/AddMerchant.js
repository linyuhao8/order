"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import InputField from "@/components/common/InputField";
import UploadImageField from "@/components/common/MediaLibrary/UploadImageField";
import Button from "@/components/common/Button";
import { useMerchant } from "@/hooks/useMerchant";
import { useRouter } from "next/navigation";

const MerchantTab = ({ _activeTab, categories, userId }) => {
  const router = useRouter();
  const { setCurrentMerchant } = useMerchant();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  // 商家表單狀態
  const [merchantForm, setMerchantForm] = useState({
    user_id: "",
    business_name: "",
    description: "",
    feature: "",
    merchant_logo: [],
    location: "",
    business_hours: "週一～週六08:00~22:00 週日13:00~22:00",
    category_id: "",
  });

  const handleMerchantChange = (e) => {
    const { name, value } = e.target;
    setMerchantForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectImages = (images, fieldName) => {
    console.log("handleSelectImages", images, fieldName);

    if (images.length > 0) {
      setMerchantForm((prev) => ({
        ...prev,
        [fieldName]: images, // 根據動態欄位名更新相應的圖片欄位
      }));
    }
  };

  const handleMerchantSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      business_name,
      description,
      feature,
      merchant_logo,
      location,
      business_hours,
      category_id,
    } = merchantForm;

    try {
      if (!merchantForm.category_id) {
        toast.error("請選擇商家分類");
        return;
      }
      // 建立商家資料
      const merchantRes = await axios.post(
        `${API_URL}/api/merchants/create`,
        {
          user_id: userId,
          business_name,
          description,
          feature,
          merchant_logo_id: merchant_logo?.[0]?.id || null,
          location,
          business_hours,
        },
        {
          withCredentials: true,
        }
      );

      if (merchantRes.status !== 201) {
        toast.error("商家創建失敗");
        return;
      }

      const merchantId = merchantRes.data?.id; // 取回剛建立的商家 ID
      if (!merchantId) {
        toast.error("商家創建成功，但無法取得商家 ID");
        return;
      }

      // 建立中間表：商家與分類的關聯
      const merchantCategoryRes = await axios.post(
        `${API_URL}/api/merchant-categorys/merchant`,
        {
          merchant_id: merchantId,
          category_id,
        },
        {
          withCredentials: true,
        }
      );

      if (merchantCategoryRes.status !== 201) {
        toast.error("商家分類關聯建立失敗");
        return;
      }
      setCurrentMerchant(merchantRes.data);
      toast.success("商家建立成功！");
      router.push("/merchant/dashboard");
    } catch (error) {
      console.error("❌ 商家建立失敗:", error);
      toast.error(
        "建立商家失敗：" + (error?.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("marchant", merchantForm);
  }, [merchantForm]);

  return (
    <>
      {/* 商家表單區塊 */}
      <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            Merchant info
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Please fill in the following basic business information
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleMerchantSubmit}>
            <div className="px-4 py-5  sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <InputField
                    type="text"
                    name="business_name"
                    id="business_name"
                    label="business_name"
                    required
                    value={merchantForm.business_name}
                    onChange={handleMerchantChange}
                  />
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    id="category_id"
                    name="category_id"
                    type="select"
                    value={merchantForm.category_id}
                    onChange={handleMerchantChange}
                    label="select categories"
                    required
                    options={categories?.map((category) => ({
                      id: category.id,
                      name: category.name,
                    }))}
                    selectPlaceholder="-- select your category --"
                  />
                </div>

                {/* 商家描述 */}
                <div className="sm:col-span-6">
                  <InputField
                    id="description"
                    name="description"
                    type="textarea"
                    value={merchantForm.description}
                    onChange={handleMerchantChange}
                    label="description"
                    placeholder="Enter..."
                  />
                </div>

                {/* 商家特色 */}
                <div className="sm:col-span-6">
                  <InputField
                    type="text"
                    name="feature"
                    id="feature"
                    label="feature"
                    value={merchantForm.feature}
                    onChange={handleMerchantChange}
                    placeholder="例：手作甜點、有插座、寵物友善..."
                  />
                </div>

                {/* 商家地址 */}
                <div className="sm:col-span-6">
                  <InputField
                    type="text"
                    name="location"
                    id="location"
                    required
                    label="location"
                    value={merchantForm.location}
                    onChange={handleMerchantChange}
                  />
                </div>

                {/* 營業時間 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="business_hours"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    business_hours
                  </label>

                  <InputField
                    type="text"
                    name="business_hours"
                    id="business_hours"
                    value={merchantForm.business_hours}
                    onChange={handleMerchantChange}
                    placeholder="例：週一至週五 9:00-18:00"
                  />
                </div>

                {/* 商家 Logo（上傳後 image_id） */}
                <div className="sm:col-span-6">
                  {/* 你這邊可以換成自己的上傳組件 */}
                  <UploadImageField
                    FormData={merchantForm}
                    setFormData={setMerchantForm}
                    handleSelectImages={(images) =>
                      handleSelectImages(images, "merchant_logo")
                    }
                    name="merchant_logo"
                    maxSelect={1}
                    userId={userId}
                    fieldName="merchant_logo"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
              <Button
                onClick={handleMerchantSubmit}
                type="submit"
                disabled={isLoading}
                variant="outline"
                size="lg"
              >
                {isLoading ? "handling..." : "submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MerchantTab;

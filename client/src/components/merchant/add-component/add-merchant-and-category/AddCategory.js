"use client";
import { useState } from "react";
import axios from "axios";

//UI
import Hero from "./CategoryTab/Hero";
import CategoryList from "./CategoryTab/CategoryList";

//Common Component
import UploadImageField from "@/components/common/MediaLibrary/UploadImageField";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";

const CategoryTab = ({ _activeTab, categories, getAllCategories, userId }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    category_logo: [],
  });

  const handleSelectImages = (images, fieldName) => {
    console.log("handleSelectImages", images, fieldName);

    if (images.length > 0) {
      setCategoryForm((prev) => ({
        ...prev,
        [fieldName]: images, // 根據動態欄位名更新相應的圖片欄位
      }));
    }
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, description, category_logo } = categoryForm;
    const imageId = category_logo?.[0]?.id || null;
    try {
      const res = await axios.post(
        `${API_URL}/api/merchant-categorys/`,
        {
          name,
          description,
          image_id: imageId,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success("分類新增成功！");
        setCategoryForm({
          name: "",
          description: "",
          category_logo: [],
        });
        getAllCategories();
      } else {
        toast.error("分類建立失敗，請稍後再試");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "未知錯誤";
      console.error("❌ 建立分類錯誤:", error);
      toast.error(`建立分類失敗：${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 分類表單區塊 */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <Hero />
        <div className="border-t border-gray-200">
          <form onSubmit={handleCategorySubmit}>
            <div className="px-4 py-5 sm:p-6">
              <div className="">
                <InputField
                  type="text"
                  name="name"
                  id="name"
                  label="name"
                  required
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                />
                <UploadImageField
                  FormData={categoryForm}
                  setFormData={setCategoryForm}
                  handleSelectImages={(images) =>
                    handleSelectImages(images, "category_logo")
                  }
                  name="category_logo"
                  maxSelect={1}
                  userId={userId}
                  fieldName="category_logo"
                />
                <InputField
                  id="description"
                  name="description"
                  type="textarea"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  label="description"
                  placeholder="Enter..."
                />
              </div>
            </div>
            <CategoryList
              categories={categories}
              getAllCategories={getAllCategories}
            />

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-400  text-right sm:px-6">
              <Button
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

export default CategoryTab;

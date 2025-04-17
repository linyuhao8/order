"use client";
import { useEffect, useState } from "react";
import axios from "axios";

//UI
import Hero from "./CategoryTab/Hero";
import CategoryName from "./CategoryTab/CategoryName";
import CategoryDescription from "./CategoryTab/CategoryDescription";
import CategoryList from "./CategoryTab/CategoryList";

//Common Component
import UploadImageField from "@/components/common/MediaLibrary/UploadImageField";
import toast from "react-hot-toast";
import Button from "@/components/common/Button";

const CategoryTab = ({ activeTab, categories, getAllCategories, userId }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    category_logo: "",
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

    try {
      console.log(categoryForm.category_logo);
      const res = await axios.post(
        `${API_URL}/api/merchant-categorys/`,
        {
          name: categoryForm.name,
          description: categoryForm.description,
          img_id: categoryForm.category_logo
            ? categoryForm.category_logo[0].id
            : null,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status !== 201) {
        toast.error("分類建立失敗");
        return;
      }

      toast.success("分類新增成功！");
      setCategoryForm({
        name: "",
        description: "",
        images: null,
      });
      getAllCategories();
    } catch (error) {
      console.error("建立分類錯誤:", error);
      toast.error(
        "建立分類失敗：" + (error?.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("marchant", categoryForm);
  }, [categoryForm]);
  return (
    <>
      {/* 分類表單區塊 */}
      {activeTab === "category" && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <Hero />
          <div className="border-t border-gray-400">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <CategoryName
                    categoryForm={categoryForm}
                    handleCategoryChange={handleCategoryChange}
                  />
                  <UploadImageField
                    FormData={categoryForm}
                    setFormData={setCategoryForm}
                    handleSelectImages={(images) =>
                      handleSelectImages(images, "category_logo")
                    }
                    name="iamge"
                    maxSelect={1}
                    userId={userId}
                    fieldName="category_logo"
                  />
                  <CategoryDescription
                    categoryForm={categoryForm}
                    handleCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
              <CategoryList
                categories={categories}
                getAllCategories={getAllCategories}
              />

              <div className="px-4 py-3 border-t border-gray-400 text-right sm:px-6">
                <Button
                  onClick={handleCategorySubmit}
                  type="button"
                  disabled={isLoading}
                  variant="primary"
                >
                  {isLoading ? "處理中..." : "新增分類"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTab;

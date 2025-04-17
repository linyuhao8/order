"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
//model
import { Modal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";

const CategoryList = ({ categories, getAllCategories }) => {
  const [categoryToDelete, setCategoryToDelete] = useState(null); // 儲存要刪除的 category id
  const [isModalOpen, openModal, closeModal] = useModel();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/merchant-categorys/${id}`, {
        withCredentials: true,
      });
      toast.success("分類已刪除");
      getAllCategories();
    } catch (error) {
      console.error("刪除分類錯誤:", error);
      toast.error(
        "刪除失敗：" + (error?.response?.data?.message || error.message)
      );
    } finally {
      closeModal(); // 關閉 Modal
    }
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    openModal(); // 顯示 Modal
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">現有分類列表</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded-md"
          >
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                {category.image?.url ? (
                  <Image
                    src={category.image.url}
                    alt={category.image?.filename || category.name}
                    width={100}
                    height={100}
                    className="rounded-full h-10 w-10"
                  />
                ) : (
                  <span className="text-amber-600 text-lg font-medium">
                    {category.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium ">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {category.merchants.length} 個商家
                </p>
              </div>
            </div>

            <button
              onClick={() => openDeleteModal(category)} // 打開 Modal 並傳遞要刪除的 category
              className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
            >
              刪除
            </button>
          </div>
        ))}
      </div>

      {/* Modal 彈出視窗 */}
      {categoryToDelete && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <div className="p-6">
            <h2 className="text-lg font-semibold">確認刪除</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              確定要刪除分類: <strong>{categoryToDelete.name}</strong> 嗎？
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal} // 關閉 Modal
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteCategory(categoryToDelete.id)} // 執行刪除
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                刪除
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryList;

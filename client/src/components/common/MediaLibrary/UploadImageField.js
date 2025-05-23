"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import MediaButton from "../../merchant/common/MediaButton";

const UploadImageField = ({
  FormData,
  setFormData,
  name,
  handleSelectImages,
  maxSelect,
  userId,
  fieldName,
}) => {
  const [previewImgs, setPreviewImgs] = useState([]);

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter(
        (_, index) => index !== indexToRemove
      ), // 根據 fieldName 動態更新
    }));
  };

  useEffect(() => {
    if (FormData?.[fieldName]) {
      setPreviewImgs(FormData[fieldName]);
    } else {
      setPreviewImgs([]);
    }
  }, [FormData?.[fieldName]]);

  return (
    <div className="sm:col-span-6 py-5">
      <div className="flex justify-between items-end">
        <h2
          htmlFor={name}
          className="text-lg font-medium text-gray-700 dark:text-gray-300"
        >
          {name}
        </h2>
        {/* Media Button 獨立在圖片下方 */}
        <MediaButton
          userId={userId}
          handleSelectImages={handleSelectImages}
          maxSelect={maxSelect}
        />
      </div>

      <div className="mt-4 pt-3 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-500">
        {/* imgs flex */}
        <div className="flex flex-row flex-wrap gap-4">
          {previewImgs?.length > 0 ? (
            previewImgs.map((img, index) => (
              <div className="relative" key={index}>
                <Image
                  src={img.url}
                  alt={`圖片 ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-cover rounded shadow-sm border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                >
                  <svg
                    className="h-4 w-4 text-amber-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded">
              <svg
                className="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageField;

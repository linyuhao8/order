// components/MediaLibrary.jsx
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Check,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../Button";

const MediaLibrary = ({
  userId,
  onSelectImages,
  maxSelect = 10,
  closeModal,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [detailImage, setDetailImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const limit = 20; // Number of images per page , When using fetch images and client pagination

  // 獲取圖片列表
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images/user/${userId}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      if (!response.ok) console.log("Failed to fetch images");

      const data = await response.data;
      console.log(data);
      setImages(data.data || []);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, page, limit]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);
  useEffect(() => {
    console.log(detailImage);
  }, [detailImage]);

  // 處理圖片選擇
  const handleSelectImage = (image) => {
    if (selectedImages.some((img) => img.id === image.id)) {
      setSelectedImages(selectedImages.filter((img) => img.id !== image.id));
    } else {
      if (selectedImages.length < maxSelect) {
        setSelectedImages([...selectedImages, image]);
      }
    }
  };

  // 確認選擇並返回給父組件
  const confirmSelection = () => {
    onSelectImages(selectedImages);
    if (closeModal) {
      closeModal();
    }
  };

  // 處理圖片詳情查看
  const handleViewDetail = (image) => {
    setDetailImage(image);
  };

  // 關閉詳情視窗
  const closeDetail = () => {
    setDetailImage(null);
  };

  // 處理文件拖放
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 處理文件放置
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // 處理文件選擇
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // 處理文件上傳
  const handleFiles = async (files) => {
    const imageFiles = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 10); // 限制最多10個文件

    if (imageFiles.length === 0) {
      alert("請選擇圖片文件");
      return;
    }

    if (imageFiles.length > 10) {
      alert("最多選擇10張圖片");
    }

    setUploadLoading(true);
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("files", file); // 把每個圖片文件添加到 FormData
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // 設置頭部的內容類型
          },
        }
      );

      if (response.status !== 200) {
        // axios 會回傳 response 對象
        console.error("Upload failed with status:", response.status);
        toast.error("上傳圖片失敗，請稍後再試");
      } else {
        console.log("Upload successful:", response.data);
        fetchImages(); // 上傳成功後重新獲取圖片列表
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("上傳圖片時發生錯誤");
    } finally {
      setUploadLoading(false);
    }
  };

  // 觸發文件選擇
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  //刪除
  const deleteImage = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images/${id}`,
        {
          withCredentials: true,
        }
      );

      // 根據 status 判斷是否成功（可選）
      if (response.status === 200) {
        toast.success("Successfully deleted!");
        fetchImages(); // 重新載入圖片
        closeDetail();
      } else {
        toast.error("Delete failed.");
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    }
  };

  return (
    <div
      className="min-w-[60vw] h-[80vh] bg-white rounded-lg shadow-md overflow-y-auto"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* 標頭 */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-800">媒體庫</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            已選擇 {selectedImages.length}/{maxSelect} 項
          </span>
          {selectedImages.length > 0 && (
            <button
              onClick={confirmSelection}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
            >
              確認選擇
            </button>
          )}
        </div>
      </div>

      {/* 上傳區域 */}
      <div
        className={`px-6 py-8 border-b border-gray-200 text-center ${
          dragActive ? "bg-blue-50" : ""
        }`}
      >
        <div
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">拖放圖片至此處或點擊上傳</p>
          <p className="text-xs text-gray-500 mt-1">最多可同時上傳 10 張圖片</p>
          {uploadLoading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">正在上傳...</p>
            </div>
          )}
        </div>
      </div>

      {/* 圖片網格 */}
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">尚無圖片</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {images.map((image) => (
              // Loop through each image in the images array
              <div
                key={image.id} // Unique key for React rendering
                className={`group relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                  // If this image is selected, show blue border; otherwise, show transparent or gray on hover
                  selectedImages.some((img) => img.id === image.id)
                    ? "border-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {/* Render the image with responsive sizes */}
                <Image
                  src={image.url} // Image source URL
                  alt={image.filename || "Image"} // Fallback alt text if filename is not available
                  fill // Fills the container (position: absolute + width/height 100%)
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw" // Responsive image sizes
                  className="object-cover" // Makes image cover the container without distortion
                  priority // Loads image with high priority (good for important images)
                />

                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all">
                  <div className="absolute top-2 right-2 flex gap-2">
                    {/* Select image button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click from triggering parent click
                        handleSelectImage(image); // Calls function to select or deselect this image
                      }}
                      className={`p-1 rounded-full ${
                        selectedImages.some((img) => img.id === image.id)
                          ? "bg-blue-500 text-white" // Selected style
                          : "bg-white text-gray-600 opacity-0 group-hover:opacity-100" // Show only on hover
                      }`}
                    >
                      <Check size={16} /> {/* Check icon */}
                    </button>

                    {/* View detail button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click from triggering parent click
                        handleViewDetail(image); // Opens detail view for this image
                      }}
                      className="p-1 rounded-full bg-white text-gray-600 opacity-0 group-hover:opacity-100"
                    >
                      <Info size={16} /> {/* Info icon */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`p-2 rounded-md ${
                page === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center px-2">
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`p-2 rounded-md ${
                page === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* detail model */}
      {detailImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-screen overflow-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">圖片詳情</h3>
              <button
                onClick={closeDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="relative aspect-video mb-4">
                <Image
                  src={detailImage.url}
                  alt={detailImage.filename || "Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">文件名</span>
                  <span className="text-gray-900 font-medium">
                    {detailImage.filename || "未命名"}
                  </span>
                </div>
                {detailImage.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">大小</span>
                    <span className="text-gray-900 font-medium">
                      {Math.round(detailImage.size / 1024)} KB
                    </span>
                  </div>
                )}
                {detailImage.height && detailImage.width && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">尺寸</span>
                    <span className="text-gray-900 font-medium">
                      {detailImage.width} x {detailImage.height}
                    </span>
                  </div>
                )}
                {detailImage.createdAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">上傳日期</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(detailImage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => deleteImage(detailImage.id)}
                >
                  Delete
                </Button>
                <button
                  onClick={() => {
                    handleSelectImage(detailImage);
                    closeDetail();
                  }}
                  className={`px-4 py-2 rounded-md ${
                    selectedImages.some((img) => img.id === detailImage.id)
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {selectedImages.some((img) => img.id === detailImage.id)
                    ? "Deselect"
                    : "Select Image"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;

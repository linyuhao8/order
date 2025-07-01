// pages/admin/media.jsx
"use client";
import { useState } from "react";
import MediaLibrary from "@/components/common/MediaLibrary/MediaLibrary";
import Image from "next/image";
import withAuth from "@/hoc/withAuth";
import Header from "@/components/merchant/common/Header/Header";

function MediaPage({ user }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const userId = user ? user.id : null;

  const handleSelectImages = (images) => {
    setSelectedImages(images);
    console.log("已選擇的圖片:", images);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {selectedImages.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Selected Pictures</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedImages.map((image) => (
                <div
                  key={image.id}
                  className="w-24 h-24 relative flex-shrink-0"
                >
                  <Image
                    src={image.url}
                    alt={image.filename || "Selected image"}
                    className="w-full h-full object-cover rounded-md"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <MediaLibrary
          userId={userId}
          onSelectImages={handleSelectImages}
          maxSelect={10}
        />
      </div>
    </>
  );
}

export default withAuth(MediaPage);

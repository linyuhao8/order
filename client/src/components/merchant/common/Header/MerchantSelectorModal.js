"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import Loading from "@/components/common/Loading";
import useFetch from "@/hooks/api/useFetch";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useMerchant } from "@/hooks/useMerchant";
import { MdStorefront } from "react-icons/md";
import Image from "next/image";
const MerchantSelectorModal = ({ isModalOpen, closeModal, user }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { merchant, setCurrentMerchant } = useMerchant();

  const currentMerchant = merchant;
  const url = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const {
    data: merchants,
    loading,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: false,
  });

  useEffect(() => {
    if (isModalOpen) refetch();
  }, [isModalOpen, refetch]);

  const handleMerchantSelect = (merchant) => {
    if (!merchant?.id) return;
    setCurrentMerchant(merchant);
    closeModal();
    router.push("/merchant/dashboard");
  };

  const filteredMerchants =
    merchants?.filter((m) =>
      m.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          選擇商家
        </h2>
        <button
          onClick={closeModal}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          X
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Merchant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-y-auto">
        {loading && <Loading />}

        {filteredMerchants && filteredMerchants.length > 0 ? (
          <div className="py-2">
            {filteredMerchants.map((merchant) => (
              <button
                key={merchant.id}
                onClick={() => handleMerchantSelect(merchant)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
              >
                <div className="flex justify-between w-full items-center">
                  {/* Content */}
                  <div className="flex items-start gap-4">
                    {/* 左側 Logo */}
                    {merchant.merchant_logo ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={merchant.merchant_logo.url}
                          height={250}
                          width={250}
                          alt={merchant.merchant_logo.filename}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                        <MdStorefront size={20} />
                      </div>
                    )}

                    {/* 右側內容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {merchant.business_name}
                        </h3>
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            merchant.is_active ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>
                          {merchant.categories?.map((i) => i.name).join("、") ||
                            "未分類"}
                        </span>
                        {merchant.location && (
                          <>
                            <span>•</span>
                            <span className="truncate">
                              {merchant.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {currentMerchant?.id === merchant.id && <FaCheck />}
                </div>
              </button>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? "找不到符合的商家" : "尚未有商家資料"}
              </p>
            </div>
          )
        )}
      </div>
    </Modal>
  );
};

export default MerchantSelectorModal;

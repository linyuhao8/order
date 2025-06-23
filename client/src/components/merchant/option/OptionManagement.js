"use client";
//component
import Button from "@/components/common/Button";
import Tabs from "@/components/merchant/option/OptionTabs";
import useModal from "@/hooks/ui/useModal";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import AddOption from "./AddOption";
import useFetch from "@/hooks/api/useFetch";
import { useMerchant } from "@/hooks/useMerchant";

const OptionManagement = ({ user, active }) => {
  //控制彈出視窗
  const [isModalOpen, openModal, closeModal] = useModal();
  const [activeTab, setActiveTab] = useState(active || "user");
  //當值更新代表有新增option，然後OptionListByMerchant會刷新
  const [refreshKey, setRefreshKey] = useState(0);
  const handleAddedOptionState = () => {
    // 每次觸發都會改變 refreshKey → 讓子組件感知到變化
    setRefreshKey((prev) => prev + 1);
  };
  //merchant data
  const { merchant } = useMerchant();

  const getOptionByUserurl = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/options/all?user_id=${user.id}`
    : null;

  //拿到所有option資料
  const {
    data: getOptionByUserData,
    loading: getOptionByUserLoading,
    error: getOptionByUserError,
    refetch: getOptionByUserRefetch,
  } = useFetch(getOptionByUserurl, {
    withCredentials: true,
    enabled: !!user,
  });

  // 取得該使用者擁有的商家清單
  const getAllMerchantByUserUrl = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const {
    data: getAllMerchantByUserData,
    loading: getAllMerchantByUserLoading,
    error: getAllMerchantByUserError,
    refetch: getAllMerchantByUserRefetch,
  } = useFetch(getAllMerchantByUserUrl, {
    withCredentials: true,
    enabled: !!user,
  });

  return (
    <div className="min-h-screen">
      {/* 主要內容區 */}
      <main className="py-10">
        <div className="mx-auto">
          {/* 頁面標題 */}
          <div className="flex items-center justify-between space-x-5 mb-8">
            <div className="flex items-start space-x-5">
              <div className="pt-1.5">
                <h1 className="text-2xl font-bold">Option Manager</h1>
                <p className="text-sm font-medium ">管理選單</p>
                <Button variant="outline" className="mt-2" onClick={openModal}>
                  新增選項
                </Button>
              </div>
            </div>
            {merchant && (
              <Button
                variant="outline"
                href={`/merchant/dashboard/${merchant ? merchant.id : null}`}
              >
                back
              </Button>
            )}
          </div>
          {/* 選項卡切換 可以切換產品或菜單*/}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            //傳送option資料
            getOptionByUserData={getOptionByUserData}
            getOptionByUserLoading={getOptionByUserLoading}
            getOptionByUserRefetch={getOptionByUserRefetch}
            //傳送商家資料
            getAllMerchantByUserData={getAllMerchantByUserData}
            getAllMerchantByUserLoading={getAllMerchantByUserLoading}
            refreshKey={refreshKey}
          />
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <AddOption
              activeTab={activeTab}
              user={user}
              getOptionByUserRefetch={getOptionByUserRefetch}
              handleAddedOptionState={handleAddedOptionState}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default OptionManagement;

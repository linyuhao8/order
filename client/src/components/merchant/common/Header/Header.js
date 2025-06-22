"use client";
import ThemeButton from "@/components/common/ui/ThemeButton";
import SettingButton from "../SettingButton";
import useModal from "@/hooks/ui/useModal";
import Button from "@/components/common/Button";
import { getCookie, deleteCookie } from "cookies-next/client";
import MerchantSelectorModal from "./MerchantSelectorModal";

const Header = ({ name, user }) => {
  const [isModalOpen, openModal, closeModal] = useModal();
  const handleOpen = () => {
    openModal();
  };

  let merchant = null;
  const merchantCookie = getCookie("order-merchant");
  if (merchantCookie) {
    try {
      merchant = JSON.parse(merchantCookie);
    } catch (error) {
      console.error("Invalid merchant cookie:", error);
      deleteCookie("order-merchant"); // 清除錯誤的 cookie
    }
  }
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-semibold dark:text-white">{name}</h1>

      <div className="flex flex-wrap items-center justify-end gap-4">
        <ThemeButton />
        <SettingButton user={user} />

        <Button variant="outline" onClick={handleOpen}>
          {merchant ? merchant?.business_name : "切換商家"}
        </Button>
      </div>
      <MerchantSelectorModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        user={user}
      />
    </header>
  );
};

export default Header;

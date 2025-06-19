import ThemeButton from "@/components/common/ui/ThemeButton";
import Search from "./Search";
import SettingButton from "../SettingButton";
import useFetch from "@/hooks/api/useFetch";
import useModal from "@/hooks/ui/useModal";
import { Modal } from "@/components/common/Modal";

const Header = ({ name, user }) => {
  const [openModal, isModalOpen, closeModal] = useModal();
  const url = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const {
    data: merchants,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: false, // 確保 user 有值才執行抓取
  });

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-semibold dark:text-white">{name}</h1>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <Search />
        <div className="flex justify-end items-center space-x-2">
          <ThemeButton />
          <SettingButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

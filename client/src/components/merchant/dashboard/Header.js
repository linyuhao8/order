"use client";
//icon
import { IoIosSettings } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

//redux
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

//hook
import useThemeSwitcher from "@/hooks/ui/useThemeSwitcher";

//model
import { Modal, SubModal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";
import SettingPage from "@/components/merchant/setting/SettingPage";

const Header = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const [isModalOpen, openModal, closeModal] = useModel();
  const [isSubModalOpen, openSubModal, closeSubModal] = useModel();

  useThemeSwitcher(theme);

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-semibold dark:text-white">
        Merchant Dashboard
      </h1>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow max-w-xs">
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer"
          >
            {theme === "dark" ? <MdDarkMode /> : <FaCloudSun />}
          </button>
          <div>
            <button onClick={openModal}>
              <IoIosSettings className="text-2xl" />
            </button>

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <SettingPage />
              <button onClick={openSubModal}>Open SubModal</button>
            </Modal>

            <SubModal isOpen={isSubModalOpen} closeModal={closeSubModal}>
              <h3>Sub Modal</h3>
            </SubModal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

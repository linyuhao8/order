import ThemeButton from "@/components/common/ui/ThemeButton";
import Search from "./Search";
import SettingButton from "../SettingButton";

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-semibold dark:text-white">
        Merchant Dashboard
      </h1>
      <div className="flex flex-wrap items-center gap-4">
        <Search />
        <div className="flex items-center space-x-2">
          <ThemeButton />
          <SettingButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

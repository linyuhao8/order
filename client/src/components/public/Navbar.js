"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// Redux State
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { FaUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

// Hooks
import useAuth from "@/hooks/auth/useAuth";
import useThemeSwitcher from "@/hooks/ui/useThemeSwitcher";

// Component
import Button from "@/components/common/Button";
import LogoutButton from "@/components/common/auth/LogoutButton";

// Subcomponents
const ThemeButton = ({ theme, toggleTheme }) => (
  <Button onClick={toggleTheme} variant="icon" size="icon">
    {theme === "dark" ? <MdDarkMode /> : <FaCloudSun />}
  </Button>
);

const UserLinks = () => (
  <div className="flex space-x-2 items-center">
    <Button href="/dashboard/user/profile" icon={FaUser}>
      User
    </Button>
    <Button href="/dashboard" variant="primary">
      Dash
    </Button>
    <LogoutButton variant="transparently" size="none" isHome="true" />
  </div>
);

const GuestLinks = () => (
  <div className="flex space-x-2">
    <Link
      href="/login"
      className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
    >
      Login
    </Link>
  </div>
);

const Navbar = () => {
  const dispatch = useDispatch();

  // hook check auth
  const { isAuthenticated, user } = useAuth();

  // hook theme control
  const theme = useSelector((state) => state.theme.mode);
  useThemeSwitcher(theme);

  useEffect(() => {
    console.log(isAuthenticated, user);
  }, [isAuthenticated, user]);

  return (
    <div className="flex justify-between items-center px-3 py-5">
      <Link href="/">
        <div className="flex items-center flex-nowrap space-x-2">
          <div className="bg-amber-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
            <span>H</span>
          </div>
          <div>
            <span className="font-medium">Hank Order</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-nowrap gap-2">
        {/* Theme toggle */}
        <ThemeButton
          theme={theme}
          toggleTheme={() => dispatch(toggleTheme())}
        />

        {/* User or Guest links */}
        {isAuthenticated ? <UserLinks /> : <GuestLinks />}
      </div>
    </div>
  );
};

export default Navbar;

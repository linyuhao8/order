"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

//Redux State
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

//Icon
import { FaUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

//hook
import useAuth from "@/hooks/auth/useAuth";
import useThemeSwitcher from "@/hooks/ui/useThemeSwitcher";
import { useLogout } from "@/hooks/auth/useLogout";
const Navbar = () => {
  const dispatch = useDispatch();

  //hook check auth
  const { isAuthenticated, user } = useAuth();

  // hook theme control
  const theme = useSelector((state) => state.theme.mode);
  useThemeSwitcher(theme);
  const { logout } = useLogout();
  useEffect(() => {
    console.log(isAuthenticated, user);
  }, [isAuthenticated, user]);

  return (
    <>
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

        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-800 hover:text-white rounded-lg transition dark:bg-gray-600 dark:text-white cursor-pointer"
          >
            {theme == "light" ? "light" : "dark"}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard/user/profile"
                className="flex flex-nowrap items-center cursor-pointer"
              >
                <FaUser />
              </Link>
              <button onClick={logout} className="cursor-pointer">
                <IoLogOutSharp />
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
              >
                dash
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

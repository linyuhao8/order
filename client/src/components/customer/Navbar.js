"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//API
import { api } from "@/api";

//Redux State
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

//Icon
import { FaUser } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

//hook
import useAuth from "@/hooks/useAuth";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //hook check auth
  const { isAuthenticated, user } = useAuth();

  // hook theme control
  const theme = useSelector((state) => state.theme.mode);
  useThemeSwitcher(theme);

  useEffect(() => {
    console.log(isAuthenticated,user);
  }, [isAuthenticated,user]);

  // logout
  const logout = async () => {
    try {
      const response = await api.auth.logout(); // API
      const data = await response.json();
      if (!response.ok) {
        return data.message;
      }
      router.push("/login"); // use router redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // profile redirect
  const goToProfile = async () => {
    try {
      const response = await api.auth.checkAuth(); // check auth
      if (!response.ok) {
        router.push("/login"); // If not logged in, redirect to login page
      } else {
        const data = await response.json();
        router.push(`/dashboard/user/profile/${data.user.id}`); // if logged in, redirect to profile page
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      router.push("/login"); // if error, redirect to login page
    }
  };


  return (
    <>
      <div className="flex justify-between items-center px-3 py-5">
        <Link href="/">
          <div className="flex items-center flex-nowrap space-x-2">
            <div className="bg-amber-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span>A</span>
            </div>
            <div>
              <span className="font-medium">Ace Agency</span>
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
              <button
                onClick={goToProfile}
                className="flex flex-nowrap items-center cursor-pointer"
              >
                <FaUser />
                {isAuthenticated && user?.name ? (
                  <span className="text-sm"> {user.name}</span>
                ) : null}
              </button>
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

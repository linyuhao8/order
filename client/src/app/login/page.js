// pages/login.js
"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { api } from "@/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  //Submit form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      //reset error
      setErrors("");
      const response = await api.auth.login(email, password);
      const data = await response.json();
      //display error to html
      if (!response.ok) {
        setErrors(
          data.errors && data.errors.length > 0
            ? data.errors.join(", ") // 顯示所有錯誤訊息
            : data.message || "登入失敗"
        );
      } else {
        //login success redirect to home
        redirect(`/`);
      }
      setLoading(false);
    } catch (error) {
      console.error("API 請求錯誤:", error);
      setErrors("發生錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-70px)] flex flex-col justify-center">
        <main className="flex flex-col items-center px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-md overflow-hidden">
            <div className="px-8 pt-10 pb-8">
              <h1 className="text-2xl font-medium text-gray-900 text-center dark:text-white">
                Login
              </h1>
              <p className="mt-3 text-sm text-gray-500 text-center">
                Please enter your login information to continue <br />
                {/* 顯示錯誤訊息 */}
                {errors && (
                  <span className="text-red-500 mt-2">
                    <strong>Error:</strong> {errors}
                  </span>
                )}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-6">
              <div>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="電子郵件"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-4 border border-gray-500 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-4 border border-gray-500 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <a
                    href="#"
                    className="text-sm font-medium text-amber-500 hover:text-amber-400 transition duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-white text-base font-medium bg-gradient-to-r 
                    from-amber-400 
                    to-amber-500 hover:from-amber-500 hover:to-amber-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-amber-500 transition duration-200 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "登入"
                  )}
                </button>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white  dark:bg-gray-700 text-gray-400">
                    or use another method to log in
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-3 px-4 flex justify-center items-center dark:bg-gray-600 border border-gray-500 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12C22 6.477 17.523 2 12 2Z"
                      fill="#1877F2"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 flex justify-center items-center dark:bg-gray-600 border border-gray-500 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                      fill="#1976D2"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 flex justify-center items-center dark:bg-gray-600 border border-gray-500 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5414 12.5194C17.5318 10.7366 18.3065 9.44251 19.8698 8.4389C18.9956 7.09857 17.6652 6.37502 15.9262 6.25477C14.271 6.13776 12.7616 7.16459 12.1237 7.16459C11.4578 7.16459 10.1185 6.29502 8.77687 6.32234C6.89941 6.3497 5.19591 7.4281 4.27997 9.12964C2.36945 12.6057 3.78085 17.7406 5.60639 20.4632C6.52237 21.7957 7.58456 23.2709 8.9812 23.2229C10.3424 23.1709 10.8661 22.342 12.4963 22.342C14.1026 22.342 14.595 23.2229 16.0165 23.1914C17.4858 23.1709 18.3947 21.8628 19.2753 20.517C19.9986 19.4415 20.5538 18.2124 20.8758 16.8958C18.9646 16.0844 17.5516 14.3989 17.5414 12.5194Z"
                      fill="black"
                    />
                    <path
                      d="M15.0663 4.2518C15.8486 3.30964 16.2507 2.07068 16.1283 0.8125C14.9395 0.858973 13.8461 1.35782 13.0601 2.19201C12.2986 3.00103 11.8744 4.0535 11.9809 5.258C13.2261 5.31388 14.3045 4.87662 15.0663 4.2518Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account yet?
                  <a
                    href="#"
                    className="ml-1 font-medium text-amber-500 hover:text-amber-400 transition duration-150"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

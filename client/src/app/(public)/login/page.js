"use client";
//React
import { useState, useEffect } from "react";

//nextjs
import { useRouter } from "next/navigation";

//hook auth direct
import useAuth from "@/hooks/auth/useAuth";

//toast
import toast from "react-hot-toast";
import Button from "@/components/common/Button";
//components
import Title from "@/components/public/login/Title";
import Input from "@/components/public/login/Input";
import Forgot from "@/components/public/login/Forgot";
import Register from "@/components/public/login/Register";
import SocialLogin from "@/components/public/login/SocialLogin";
import Navbar from "@/components/public/Navbar";

//axios
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hook check auth
  const { isAuthenticated, user } = useAuth();

  //If you're logged in and directed to the dash
  useEffect(() => {
    if (isAuthenticated === true && user) {
      toast("You are logged in.", { icon: "⚠️" });

      const { role } = user;

      let targetPath = "/";
      if (role === "merchant") {
        targetPath = "/merchant/dashboard";
      } else if (role === "admin") {
        targetPath = "/admin/dashboard";
      }

      // 使用 replace 可防止按 back 回到 login 頁
      router.replace(targetPath);
    }
  }, [isAuthenticated, user, router]);

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");

    try {
      setLoading(true);
      //POST APi
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );
      const data = await response.data;

      //Success UI toast
      toast.dismiss();
      toast.success(data.message || "Login successful!");

      //redirect
      const { role } = data.user;

      if (role === "merchant") {
        router.push("/merchant/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.errors && Array.isArray(error.errors) && error.errors.length > 0
          ? error.errors.join("\n")
          : error.message || "Login failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-70px)] bg-stone-50 dark:bg-gray-700 flex flex-col justify-center">
        <main className="flex flex-col items-center px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            <Title />

            <form onSubmit={handleSubmit} className="px-8 pb-10">
              <Input
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
              <Forgot />
              <Button
                variant="full"
                disabled={loading}
                disabledText="login..."
                type="submit"
              >
                Login
              </Button>
              <SocialLogin />
              <Register />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

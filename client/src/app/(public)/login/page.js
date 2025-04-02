"use client";
//React
import { useState, useEffect, use } from "react";

//nextjs
import { useRouter } from "next/navigation";

//hook auth direct
import useAuth from "@/hooks/auth/useAuth";

//toast
import toast from "react-hot-toast";

//components
import Title from "@/components/public/login/Title";
import Input from "@/components/public/login/Input";
import Forgot from "@/components/public/login/Forgot";
import Register from "@/components/public/login/Register";
import SocialLogin from "@/components/public/login/SocialLogin";
import SubmitButton from "@/components/public/login/SubmitButton";
import Navbar from "@/components/public/Navbar";

//axios
import axios from "axios";

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hook check auth
  const { isAuthenticated } = useAuth();

  //If you're logged in and directed to the dash
  useEffect(() => {
    if (isAuthenticated === true) {
      toast("You are logged in.", { icon: "⚠️" });
      //Cannot click “Back” to go back to previous page
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

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

      sessionStorage.setItem("user", JSON.stringify(data.user));

      //direct to dashboard
      router.push("/merchant/dashboard");
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
              <SubmitButton loading={loading} />
              <SocialLogin />
              <Register />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

"use client";
//React
import { useState, useEffect, use } from "react";

//nextjs
import { useRouter } from "next/navigation";

//check Authenticated
import { api } from "@/api";

//hook auth direct
import useAuth from "@/hooks/auth/useAuth";
import useToast from "@/hooks/ui/useToast";
import toast from "react-hot-toast";

//components
import Title from "@/components/public/login/Title";
import Input from "@/components/public/login/Input";
import Forgot from "@/components/public/login/Forgot";
import Register from "@/components/public/login/Register";
import SocialLogin from "@/components/public/login/SocialLogin";
import SubmitButton from "@/components/public/login/SubmitButton";
import Navbar from "@/components/public/Navbar";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hook check auth
  const { isAuthenticated } = useAuth();
  const { showInfo } = useToast();

  //If you're logged in and directed to the dash
  useEffect(() => {
    if (isAuthenticated === true) {
      showInfo("You are logged in!", {}, "⚠️");
      //Cannot click “Back” to go back to previous page
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router, showInfo]);

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    return toast.promise(
      (async () => {
        setLoading(true);
        try {
          const response = await api.auth.login(email, password);
          const data = await response.json(); // Parse the API response

          if (!response.ok) {
            throw data; // Throw the error message returned by the API
          }

          router.push("/dashboard"); // Redirect to the dashboard on success
          return data; // Return data so that toast can use data.message
        } finally {
          setLoading(false); // Ensure loading state is reset even if an error occurs
        }
      })(),
      {
        loading: "Logging in...", // Display while the request is in progress
        success: (data) => data.message || "Login successful!", // Show API success message
        error: (error) => {
          // Check if `errors` array exists and has content
          if (
            error.errors &&
            Array.isArray(error.errors) &&
            error.errors.length > 0
          ) {
            return error.errors.join("\n"); // Join all errors into a single string
          }
          return error.message || "Login failed, please try again."; // Fallback error message
        },
      }
    );
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

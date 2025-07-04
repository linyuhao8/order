import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import SideBar from "@/components/merchant/common/SideBar";

export const metadata = {
  title: "dashboard",
  description: "dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="dashboard min-h-screen dark:bg-gray-900">
      <div className="flex flex-col md:flex-row">
        <SideBar />
        <Suspense fallback={<Loading />}>
          <div className="w-full md:ml-16 p-4 md:p-6">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}

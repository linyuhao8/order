
import Navbar from "@/components/dashboard/Navbar";

export const metadata = {
  title: "Order",
  description: "點餐平台",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="dashboard min-h-screen dark:bg-gray-900">
        <div className="flex flex-col md:flex-row">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}

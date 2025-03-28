import "@/styles/globals.css";
import Navbar from "@/components/dashboard/Navbar";
import { StoreProvider } from "@/lib/storeProvide";

export const metadata = {
  title: "Order",
  description: "點餐平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="dashboard min-h-screen dark:bg-gray-900">
          <div className="flex flex-col md:flex-row">
            <Navbar />
            <StoreProvider>{children}</StoreProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

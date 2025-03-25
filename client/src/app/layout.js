import "./globals.css";
import { StoreProvider } from "../lib/storeProvide";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "Order",
  description: "點餐平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <ToastProvider /> {/* Only run on Csr */}
        </StoreProvider>
      </body>
    </html>
  );
}

//app/layout.js For merchant and public
import "@/styles/globals.css";
import { StoreProvider } from "@/lib/storeProvide";
import ToastProvider from "@/components/common/ToastProvider";

export const metadata = {
  title: "Order",
  description: "order",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {/* Redux Store */}
          {children}
          <ToastProvider /> {/* Only run on Csr */}
        </StoreProvider>
      </body>
    </html>
  );
}

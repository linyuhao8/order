import "./globals.css";
import { StoreProvider } from "../lib/storeProvide";
export const metadata = {
  title: "Order",
  description: "點餐平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

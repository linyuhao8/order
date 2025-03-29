//app/layout.js For merchant and public
import "@/styles/globals.css";
import { StoreProvider } from "@/lib/storeProvide";

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
        </StoreProvider>
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Order",
  description: "點餐平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

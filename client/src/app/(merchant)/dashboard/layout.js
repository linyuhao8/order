import Navbar from "@/components/merchant/Navbar";

export const metadata = {
  title: "dashboard",
  description: "dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div className="dashboard min-h-screen dark:bg-gray-900">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

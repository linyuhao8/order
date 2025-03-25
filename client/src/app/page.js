// pages/index.js
import Image from "next/image";
import Navbar from "../components/customer/Navbar";
export default function Home() {
  const merchats = [
    {
      id: "1",
      business_name: "茶湯會",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "2",
      business_name: "50嵐",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "3",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "4",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "5",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "6",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <main className="max-w-6xl mx-auto px-4">
        <Navbar />
        {/* Team Member Section */}
        <div className="mt-20 text-center mb-8">
          <p className="text-gray-500 text-sm mb-4">Members</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="h-10 w-10 rounded-full bg-gray-50 overflow-hidden"
              >
                <div className="h-full w-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-xl mx-auto mb-16 relative">
          <div className="flex nowrap justify-center gap-3 items-end mb-3">
            <h1 className="text-4xl font-bold text-amber-500">We building</h1>
            <Image
              src="https://images.unsplash.com/photo-1548504773-429e84f586d2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={100}
              height={100}
              alt="img"
              className="rounded-xl object-cover h-15 w-25"
            />
          </div>

          <h2 className="text-3xl font-bold mb-6">With worldclass Quality.</h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            At Ace, we don&apos;t just bring your ideas to life—we craft them
            into unforgettable masterpieces. With our creative edge, you&apos;ll
            never need to look beyond us.
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm">
              $4-50K
            </button>
            <button className="px-6 py-2 border border-amber-500 text-amber-500 rounded-full text-sm">
              Get a project quote
            </button>
          </div>

          <p className="text-sm text-gray-600">
            We designed project raised • $3m funds
          </p>
        </div>

        {/* Portfolio Section */}
        <div className="mb-8">
          <p className="text-center text-sm text-gray-500 mb-6">
            We crafted these masterpieces
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {merchats.map((merchant) => (
              <div
                key={merchant.id}
                className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-600"
              >
                <div className="flex justify-between items-center px-5 py-6">
                  <div>
                    <h3 className="text-lg font-medium">
                      {merchant.business_name}
                    </h3>
                    <p className="text-sm">{merchant.location}</p>
                    <p className="text-sm">{merchant.time}</p>
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <span className="text-sm">215.3km</span>
                    <div className="flex nowrap gap-2">
                      <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden"></div>
                      <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden"></div>
                    </div>
                  </div>
                </div>
                {/* Project image placeholders matching the rounded rectangles in design */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <button className="flex items-center space-x-2 bg-gray-800 text-white rounded-full px-4 py-2 text-sm">
          <span>Book meeting</span>
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
        </button>
      </div>
    </div>
  );
}

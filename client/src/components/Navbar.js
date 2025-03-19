import React from "react";
import Link from "next/link";

const tabs = [
  { name: "Home", path: "/" },
  { name: "Order", path: "/order" },
  { name: "Services", path: "/services" },
  { name: "Content", path: "/content" },
];

const Navbar = () => {
  return (
    <>
      {/* Header/Navigation */}
      <div className="flex justify-between items-center px-3 py-5">
        <div className="flex items-center space-x-2">
          <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center">
            <span>A</span>
          </div>
          <span className="font-medium">Ace Agency</span>
        </div>

        {/* Navigation Pills */}
        <div className="bg-gray-200 rounded-full px-2 py-2">
          <nav className="flex space-x-1">
            {tabs.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`px-4 py-1 text-sm rounded-full transition ${
                  path === "/" ? "bg-gray-800 text-white" : "text-gray-700"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Works
          </button>
          
          <a
            className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

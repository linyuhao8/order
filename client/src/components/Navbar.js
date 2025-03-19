import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      {/* Header/Navigation */}
      <div className="flex justify-between items-center px-3 py-5">
        <Link href="/">
          <div className="flex items-center flex-nowrap space-x-2">
            <div className="bg-amber-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span>A</span>
            </div>
            <div>
              <span className="font-medium">Ace Agency</span>
            </div>
          </div>
        </Link>

        {/* CTA Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Works
          </button>

          <a
            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition"
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

import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
              alt="Dreamscape Realty Logo"
              className="h-20 w-auto"
            />
            <span className="text-2xl font-semibold text-gray-800">𝓓𝓻𝓮𝓪𝓶𝓼𝓬𝓪𝓹𝓮 𝓡𝓮𝓪𝓁𝓉𝔂</span>
          </Link>
          <button
            type="button"
            className="md:hidden text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-8`}>
          <Link to="/" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Home
          </Link>
          <Link to="/properties" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Properties
          </Link>
          <Link to="/contact" className="block mt-4 text-gray-800 hover:text-blue-600 md:inline-block md:mt-0">
            Contact Us
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <Link
              to="/user/login"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 text-center mb-2 md:mb-0"
            >
              User Login
            </Link>
            <Link to="/admin/login" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 text-center">
              Admin Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

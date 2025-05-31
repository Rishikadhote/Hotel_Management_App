import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 dark:bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center space-x-3">
        <img
          src={`${process.env.PUBLIC_URL}/images/hotel_logo.png`}
          alt="Hotel Logo"
          className="h-12 object-contain"
        />
        <h1 className="text-2xl font-bold text-blue-900 dark:text-white drop-shadow-lg">
          The Regal Haven
        </h1>
      </div>
      <div className="space-x-6">
        <a
          href="/"
          className={`text-lg font-semibold transition duration-300 ${
            theme === "light"
              ? "text-blue-900 hover:text-black"
              : "text-white hover:text-yellow-400"
          }`}
        >
          Home
        </a>
        <a
          href="/rooms"
          className={`text-lg font-semibold transition duration-300 ${
            theme === "light"
              ? "text-blue-900 hover:text-black"
              : "text-white hover:text-yellow-400"
          }`}
        >
          Rooms
        </a>
        <a
          href="/bookings"
          className={`text-lg font-semibold transition duration-300 ${
            theme === "light"
              ? "text-blue-900 hover:text-black"
              : "text-white hover:text-yellow-400"
          }`}
        >
          Bookings
        </a>
        <a
          href="/contact"
          className={`text-lg font-semibold transition duration-300 ${
            theme === "light"
              ? "text-blue-900 hover:text-black"
              : "text-white hover:text-yellow-400"
          }`}
        >
          Contact
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

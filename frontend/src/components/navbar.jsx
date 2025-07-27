import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-100 hover:text-blue-500 transition duration-200"
          >
            Home
          </Link>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-white text-2xl font-semibold">
            TypePlay AI
          </Link>
        </div>

        {/* Right - Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link
            to="/storygen"
            className="hover:text-blue-500 transition duration-200"
          >
            Story Game
          </Link>
          <Link
            to="/wordassoc"
            className="hover:text-blue-500 transition duration-200"
          >
            Word Challenge
          </Link>
          <Link
            to="/riddle"
            className="hover:text-blue-500 transition duration-200"
          >
            Riddle
          </Link>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-3 text-sm">
          <Link
            to="/storygen"
            onClick={() => setIsOpen(false)}
            className="block text-gray-100 hover:text-blue-500"
          >
            Story Game
          </Link>
          <Link
            to="/wordassoc"
            onClick={() => setIsOpen(false)}
            className="block text-gray-100 hover:text-blue-500"
          >
            Word Challenge
          </Link>
          <Link
            to="/riddle"
            onClick={() => setIsOpen(false)}
            className="block text-gray-100 hover:text-blue-500"
          >
            Riddle
          </Link>
        </div>
      )}
    </nav>
  );
}

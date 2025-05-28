"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = ["home", "items", "about", "contact"];

  return (
    <nav className="relative border-b border-black">
      <div className="max-w-[95%] mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="w-[150px] md:w-[200px]">
            <h1 className="tracking-widest text-xl text-black">GETNOMIK</h1>
          </div>

          {/* Center: Nav Links - Hidden on mobile */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-4 gap-10 lg:space-x-8">
              {navItems.map((item) => {
                const path = item === "home" ? "/" : `/${item}`;
                const active = isActive(path);
                return (
                  <li key={item}>
                    <Link
                      href={path}
                      className={`group relative inline-block text-md ${
                        active ? "text-green-700" : "text-black"
                      }`}
                    >
                      <span className="hover:text-green-700 transition-colors duration-300">
                        {item}
                      </span>
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Register Button - Hidden on mobile */}
          <div className="hidden md:flex w-[150px] md:w-[200px] justify-end">
            <Link
              href="/register"
              className={`group relative inline-block text-md text-black ${
                isActive("/register") ? "text-green-700" : ""
              }`}
            >
              <span className="hover:text-green-700 transition-colors duration-300">
                register
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                  isActive("/register") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-green-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-black z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const path = item === "home" ? "/" : `/${item}`;
                const active = isActive(path);
                return (
                  <Link
                    key={item}
                    href={path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      active ? "text-green-700" : "text-black hover:text-green-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                );
              })}
              <Link
                href="/register"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/register") ? "text-green-700" : "text-black hover:text-green-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
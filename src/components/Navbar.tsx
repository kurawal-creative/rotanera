"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuItems = [
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setShowNavbar(current > 0 && current > lastScroll);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -20, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="sticky top-4 z-100 mx-auto w-full max-w-5xl rounded-full bg-white/20 shadow-sm backdrop-blur-md transition-all duration-300"
        >
          <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-maroon text-3xl pb-1.5 font-normal"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              rotanera
            </Link>

            <div className="hidden items-center justify-center space-x-8 md:flex">
              {menuItems.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="text-gray-700 transition-colors hover:text-gray-900"
                >
                  {name}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/register"
                className="rounded-full border border-neutral-300 px-4 py-1.5 text-neutral-700 transition-all hover:border-neutral-400 hover:text-neutral-900"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-maroon hover:bg-maroon-darker rounded-full px-4 py-1.5 text-white shadow-sm transition-all hover:shadow"
              >
                Login
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="px-4 pb-4 md:hidden"
              >
                <div className="flex flex-col items-end space-y-4">
                  {menuItems.map(({ name, href }) => (
                    <a
                      key={name}
                      href={href}
                      onClick={toggleMenu}
                      className="px-2 py-2 text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {name}
                    </a>
                  ))}

                  <div className="flex w-full justify-end gap-2">
                    <Link
                      href="/register"
                      onClick={toggleMenu}
                      className="rounded-full border border-neutral-300 px-4 py-1.5 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900"
                    >
                      Register
                    </Link>
                    <Link
                      href="/login"
                      onClick={toggleMenu}
                      className="bg-maroon hover:bg-maroon-darker rounded-full px-4 py-1.5 text-white shadow-sm hover:shadow"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;

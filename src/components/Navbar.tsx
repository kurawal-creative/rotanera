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
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-100 bg-white transition-shadow duration-300 ${isScrolled ? "bg-white/90 shadow-xs backdrop-blur-sm" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <div className="flex-1">
              <Link
                href={"/"}
                className="text-3xl font-normal text-sky-500"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                rotanera
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 transition-colors hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
              <Link
                href="/register"
                className="rounded-full border border-neutral-300 px-4 py-1.5 font-normal text-neutral-700 transition-all duration-300 hover:border-neutral-400 hover:text-neutral-900 focus:ring-2 focus:ring-neutral-300 focus:outline-none"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-neutral-900 px-4 py-1.5 font-normal text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow focus:ring-2 focus:ring-neutral-400 focus:outline-none active:bg-neutral-700"
              >
                Login
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Animated */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className="flex items-center pb-4 md:hidden"
              >
                <div className="flex w-full flex-col items-end space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="px-2 py-2 text-start text-gray-700 transition-colors hover:text-gray-900"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="flex w-full justify-end gap-2">
                    <Link
                      href="/register"
                      className="rounded-full border border-neutral-300 px-4 py-1.5 font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-400 hover:text-neutral-900 focus:ring-2 focus:ring-neutral-300 focus:outline-none"
                    >
                      Register
                    </Link>

                    <Link
                      href="/login"
                      className="rounded-fullbg-neutral-900 px-4 py-1.5 font-medium text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow focus:ring-2 focus:ring-neutral-400 focus:outline-none active:bg-neutral-700"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

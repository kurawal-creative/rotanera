"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

const menuItems = [
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Galeri", href: "/galeri" },
    { name: "Harga", href: "/harga" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav initial={{ y: -22, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }} className={`sticky top-0 z-999 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="text-purp pb-1.5 text-3xl font-normal">
                    rotanera
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center justify-center space-x-8 md:flex">
                    {menuItems.map(({ name, href }) => (
                        <a key={name} href={href} className="text-gray-700 transition-colors hover:text-gray-900">
                            {name}
                        </a>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden items-center gap-3 md:flex">
                    <Button className="group bg-purp hover:bg-purp-darker rounded-full border font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.97]">
                        <Link href="/login" className="flex items-center gap-2">
                            Mulai Sekarang{" "}
                        </Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 md:hidden">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} className="px-4 pb-4 md:hidden">
                        <div className="flex flex-col items-end space-y-4">
                            {menuItems.map(({ name, href }) => (
                                <a key={name} href={href} onClick={toggleMenu} className="px-2 py-2 text-gray-700 transition-colors hover:text-gray-900">
                                    {name}
                                </a>
                            ))}
                            <Button asChild className="rounded-full">
                                <Link href="/login" onClick={toggleMenu}>
                                    Login
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

import logoText from "@/assets/svg/logo-text.svg";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import DesktopAvatar from "./desktop-avatar";
import MobileAvatar from "./mobile-avatar";
import ThemeToggler from "./theme-toggler";

const menuItems = [
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Galeri Karya", href: "/galeri-karya" },
    { name: "Harga", href: "/harga" },
];

export default function Navbar() {
    const router = useRouter();
    const { user, signOut } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);

    const desktopAvatarRef = useRef<HTMLDivElement>(null);

    /* scroll handler */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* click outside avatar menu */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (desktopAvatarRef.current && !desktopAvatarRef.current.contains(e.target as Node)) {
                setOpenAvatarMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    /* logout */
    const handleLogout = async () => {
        await signOut();
        setOpenAvatarMenu(false);
        closeMenu();
        router.push("/");
    };

    /* derived states */
    const isLoggedIn = !!user;
    const avatar = user?.user_metadata?.avatar_url;
    const username = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Pengguna";

    return (
        <motion.nav initial={{ y: -22, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }} className={`sticky top-0 z-50 w-full transition-all duration-300 ${isOpen ? "bg-white shadow-sm dark:bg-neutral-900" : scrolled ? "bg-white/80 shadow-sm backdrop-blur-md dark:bg-neutral-900/80" : "bg-transparent"} `}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Kiri — Logo */}
                <div className="flex flex-1 items-center justify-start">
                    <Link href="/" className="flex items-center gap-2 pb-1.5">
                        <Image src={logoText} alt="logo rotanera" className="h-auto w-32 dark:invert-0" />
                    </Link>
                </div>

                {/* Tengah — konsisten biar tidak terdorong oleh kanan */}
                <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
                    {menuItems.map(({ name, href }) => (
                        <Link key={name} href={href} className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                            {name}
                        </Link>
                    ))}
                </div>

                {/* Kanan */}
                <div className="flex flex-1 items-center justify-end gap-3">
                    {/* Theme toggler (tetap muncul di mobile) */}
                    <div className="rounded-md p-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <ThemeToggler />
                    </div>

                    {/* Avatar desktop */}
                    <div className="hidden items-center md:flex">
                        {!isLoggedIn ? (
                            <Button asChild className="group hover:bg-purp-darker bg-purp rounded-full font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.97]">
                                <Link href="/login" className="flex items-center gap-2">
                                    Mulai Sekarang
                                    <ChevronRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        ) : (
                            <DesktopAvatar avatar={avatar} open={openAvatarMenu} setOpen={setOpenAvatarMenu} onLogout={handleLogout} />
                        )}
                    </div>

                    {/* Toggle menu (mobile only) */}
                    <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 md:hidden dark:text-gray-200 dark:hover:text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} className="px-4 pb-4 md:hidden">
                        <div className="flex flex-col items-end space-y-4">
                            {isLoggedIn && <MobileAvatar username={username} closeMenu={closeMenu} />}

                            {menuItems.map(({ name, href }) => (
                                <Link key={name} href={href} onClick={closeMenu} className="px-2 py-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                                    {name}
                                </Link>
                            ))}

                            <div className="flex items-center gap-4">
                                {/* Theme Toggler mobile */}
                                <div className="rounded-md p-1 transition hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <ThemeToggler />
                                </div>

                                {!isLoggedIn ? (
                                    <Button asChild className="rounded-full" onClick={closeMenu}>
                                        <Link href="/login">Login</Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                                        Keluar
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

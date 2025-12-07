"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotMessageSquare, MoveRight, ChevronRight, EllipsisVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthChangeEvent, Session } from "@supabase/supabase-js"; // Tambahan: Import types buat fix TS error
import { createPortal } from "react-dom";

import Logo from "@/assets/svg/Logo.svg";
import ChatRotaneraBot from "./chat-rotanera-bot";
import WhatIsRotanera from "./what-is-rotanera";
import HowRotaneraWorks from "./how-rotanera-works";
import HowUseRotanera from "./how-use-rotanera";

const FAQs = [
    {
        id: 1,
        faq: "Apa itu Rotanera?",
        page: "what-is-rotanera",
    },
    {
        id: 2,
        faq: "Bagaimana cara kerja Rotanera?",
        page: "how-rotanera-works",
    },
    {
        id: 3,
        faq: "Cara pakai Rotanera?",
        page: "how-use-rotanera",
    },
];

export default function RotaneraBot() {
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activePage, setActivePage] = useState("home");
    const [isLoading, setIsLoading] = useState(true);

    // Update username dari Supabase session
    useEffect(() => {
        let isMounted = true;

        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (isMounted && session?.user?.user_metadata?.name) {
                    setUsername(session.user.user_metadata.name);
                } else if (isMounted) {
                    setUsername(null);
                }
            } catch (error) {
                console.error("Error getting session:", error);
                if (isMounted) setUsername(null);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        getInitialSession();

        // Listen to auth changes (dengan type explicit buat fix TS error)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session: Session | null) => {
                if (event === "SIGNED_IN" && session?.user?.user_metadata?.name) {
                    setUsername(session.user.user_metadata.name);
                } else if (event === "SIGNED_OUT") {
                    setUsername(null);
                }
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        if (!isOpen) {
            setShowChat(false);
            setShowMenu(false);
            setActivePage("home");
        }
    }, [isOpen]);

    useEffect(() => {
        if (!showChat) setShowMenu(false);
    }, [showChat]);

    const handleFAQClick = (page: string) => {
        if (page) setActivePage(page);
    };

    const handleBackToHome = () => {
        setActivePage("home");
        setShowChat(false);
    };

    // Loading state + null check
    if (isLoading || !username) return null;

    const portalContent = (
        <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end" style={{ zIndex: 2147483647 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mb-3 w-90 h-120 overflow-hidden rounded-2xl bg-Background shadow-2xl"
                    >
                        {/* Header */}
                        {(showChat ||
                            activePage === "what-is-rotanera" ||
                            activePage === "how-rotanera-works" ||
                            activePage === "how-use-rotanera") && (
                                <div className="relative">
                                    <div className="flex items-center justify-between px-4 py-3 bg-white text-sm text-TextPrimary border-b border-gray-200">
                                        {/* Kiri: Info */}
                                        <div className="flex items-center gap-2">
                                            <Image src={Logo} alt="Icon" className="h-12 w-12" />
                                            <div className="flex flex-col">
                                                <h2 className="text-sm font-semibold">
                                                    {activePage === "what-is-rotanera"
                                                        ? "Apa itu Rotanera?"
                                                        : activePage === "how-rotanera-works"
                                                            ? "Bagaimana Rotanera Bekerja?"
                                                            : activePage === "how-use-rotanera"
                                                                ? "Cara Menggunakan Rotanera"
                                                                : "RotaneraBot"}
                                                </h2>
                                                <p className="text-xs text-gray-500">
                                                    {activePage === "what-is-rotanera"
                                                        ? "Pelajari tentang Rotanera secara singkat."
                                                        : activePage === "how-rotanera-works"
                                                            ? "Lihat cara kerja dan teknologi di balik Rotanera."
                                                            : activePage === "how-use-rotanera"
                                                                ? "Panduan langkah Rotanera"
                                                                : "Rotanera sedang aktif nih!"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Ellipsis */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowMenu((prev) => !prev)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <EllipsisVertical size={20} />
                                            </button>
                                            {showMenu && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                    <button
                                                        onClick={() => {
                                                            handleBackToHome();
                                                            setShowMenu(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        Kembali
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setShowMenu(false);
                                                            setShowChat(false);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                                    >
                                                        Tutup
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Content Area */}
                        {activePage === "home" && !showChat ? (
                            <div className="flex flex-col items-center justify-between px-4 py-3 text-TextPrimary">
                                <div className="space-y-3">
                                    <Image src={Logo} className="h-15 w-15" alt="Logo Rotanera" />
                                    <div>
                                        <h2 className="text-xl font-semibold">Hallo {username}!</h2>
                                        <p className="mt-2 text-sm text-TextSecondary">
                                            Terimakasih sudah menggunakan platform Rotanera, ada yang bisa kami bantu untuk
                                            meningkatkan CV kamu?
                                        </p>
                                    </div>
                                    <div className="border p-2.5 rounded-xl text-sm space-y-1.5 bg-white border-gray-200 shadow-sm">
                                        <h2 className="text-TextPrimary font-semibold text-base">
                                            Bot kami sedang online loh!
                                        </h2>
                                        <p className="text-TextSecondary font-medium">
                                            Ingin bertanya seputar CV dan karir?
                                        </p>
                                        <button
                                            onClick={() => setShowChat(true)}
                                            className="mt-4 flex gap-2 items-center text-primaryBlue font-semibold cursor-pointer group hover:border-primaryBlue w-fit border-b-2 border-transparent"
                                        >
                                            Mulai bertanya <MoveRight size={16} />
                                        </button>
                                    </div>
                                    <div className="border p-2.5 rounded-xl text-sm space-y-1.5 bg-white border-gray-200 shadow-sm">
                                        <h2 className="text-TextPrimary font-semibold text-base">
                                            Pertanyaan populer
                                        </h2>
                                        <div className="mt-4 space-y-3 w-full">
                                            {FAQs.map((faq) => (
                                                <button
                                                    key={faq.id}
                                                    onClick={() => faq.page && handleFAQClick(faq.page)}
                                                    className="flex items-center justify-between w-full text-TextSecondary font-semibold cursor-pointer group hover:text-TextPrimary"
                                                >
                                                    <span className="border-b-2 border-transparent group-hover:border-TextPrimary transition">
                                                        {faq.faq}
                                                    </span>
                                                    <ChevronRight
                                                        size={16}
                                                        className="text-TextSecondary group-hover:text-TextPrimary transition"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : activePage === "what-is-rotanera" ? (
                            <WhatIsRotanera />
                        ) : activePage === "how-rotanera-works" ? (
                            <HowRotaneraWorks />
                        ) : activePage === "how-use-rotanera" ? (
                            <HowUseRotanera />
                        ) : (
                            <ChatRotaneraBot />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-18 w-18 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
            >
                <BotMessageSquare size={35} className="-scale-x-100 transform" />
            </motion.button>
        </div>
    );

    return typeof window !== "undefined"
        ? createPortal(portalContent, document.body)
        : null;

}
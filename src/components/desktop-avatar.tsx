// components/desktop-avatar.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "./user-avatar";
import { LogOut, KanbanSquare, UserRound } from "lucide-react";

interface DesktopAvatarProps {
    avatar: string;
    open: boolean;
    setOpen: (v: boolean) => void;
    onLogout: () => void;
}

export default function DesktopAvatar({ avatar, open, setOpen, onLogout }: DesktopAvatarProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <div className="relative hidden items-center lg:flex" ref={menuRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="relative">
                <Avatar>
                    <UserAvatar src={avatar} />
                </Avatar>
                <span className="absolute right-0 bottom-0 block h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            <AnimatePresence>
                {(isHovering || open) && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-md" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Link href="/project" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                            <KanbanSquare size={16} /> Project
                        </Link>
                        <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                            <UserRound size={16} /> Profile
                        </Link>
                        <button onClick={onLogout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                            <LogOut size={16} /> Keluar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

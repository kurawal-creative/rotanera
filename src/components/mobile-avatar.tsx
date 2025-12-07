"use client";

import { useState } from "react";
import Link from "next/link";
import { KanbanSquare, UserRound, ChevronDown } from "lucide-react";

interface MobileAvatarProps {
    username: string;
    closeMenu: () => void;
}

export default function MobileAvatar({ username, closeMenu }: MobileAvatarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full border-b border-gray-200 pb-3">
            {/* Trigger */}
            <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-800">
                {/* Kiri: Icon */}
                <div className="flex items-center gap-2">
                    <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </div>

                {/* Kanan: Teks */}
                <span className="truncate text-right">Hai, {username}</span>
            </button>

            {/* Dropdown Items */}
            {open && (
                <div className="mt-1 flex flex-col items-end space-y-1">
                    <Link href="/project" onClick={closeMenu} className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
                        <KanbanSquare size={16} /> Project
                    </Link>
                    <Link href="/settings" onClick={closeMenu} className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
                        <UserRound size={16} /> Profile
                    </Link>
                </div>
            )}
        </div>
    );
}

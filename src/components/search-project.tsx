// components/search-bar.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProjectSearch } from "@/store/projectSearchStore";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const { query, setQuery, results, search } = useProjectSearch();
    const [open, setOpen] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        search();
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-90">
            <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
            <Input
                type="text"
                placeholder="Temukan project kamu"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className="rounded-lg border bg-white py-2 pr-3 pl-10 text-sm focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />

            {open && query && results.length > 0 && (
                <div className="absolute top-full right-0 left-0 mt-2 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                    {results.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => {
                                setQuery("");
                                setOpen(false);
                                router.push(`/project/${p.id}`);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            <div className="font-medium dark:text-neutral-100">{p.name}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">Updated {new Date(p.updatedAt).toLocaleDateString()}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

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
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative z-50 w-80">
      <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <Input
        type="text"
        placeholder="Cari project kamu"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="rounded-lg border bg-white py-2 pr-3 pl-10 text-sm focus:ring-2 focus:outline-none"
      />

      {open && query && results.length > 0 && (
        <div className="absolute top-full right-0 left-0 mt-2 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-sm">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setQuery("");
                setOpen(false);
                router.push(`/project/${p.id}`);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
            >
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-neutral-500">Edited {p.edited}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Topbar } from "@/components/app-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const placeholders = [
  "Buatkan desain kursi rotan minimalis",
  "Buat katalog produk rotan modern 2025",
  "Buat interior ruang tamu dengan set sofa rotan",
  "Buat desain meja makan rotan premium",
  "Buatkan etalase online untuk toko kerajinan rotan",
];

export default function DashboardPage() {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let currentText = "";
    let charIndex = 0;
    let currentPlaceholderIndex = 0;

    const type = () => {
      const text = placeholders[currentPlaceholderIndex];
      currentText = text.substring(0, charIndex + 1);
      setPlaceholder(currentText);
      charIndex++;

      if (charIndex === text.length) {
        setTimeout(() => erase(), 1200);
      } else {
        setTimeout(type, 70);
      }
    };

    const erase = () => {
      const text = placeholders[currentPlaceholderIndex];
      currentText = text.substring(0, charIndex - 1);
      setPlaceholder(currentText);
      charIndex--;

      if (charIndex === 0) {
        currentPlaceholderIndex =
          (currentPlaceholderIndex + 1) % placeholders.length;
        setTimeout(type, 300);
      } else {
        setTimeout(erase, 40);
      }
    };

    type();
  }, []);
  return (
    <>
      <main className="relative w-full">
        <Topbar breadcrumb={[{ label: "Dashboard" }]} />

        <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-24 bg-linear-to-b from-[#6D28D9]/5 via-[#6D28D9]/0 to-transparent" />

        <div className="relative z-10 p-2">
          <div className="space-y-4 p-4">
            <h1 className="text-2xl font-medium">
              Deskripsikan idemu dan buat itu menjadi nyata
            </h1>

            <div className="flex items-center">
              <div className="flex w-full items-center gap-3 rounded-xl border p-4">
                <Input
                  type="text"
                  placeholder={placeholder}
                  className="h-10 flex-1 rounded-2xl border bg-white px-3 text-sm transition focus:ring-2 focus:outline-none"
                />
                <Button className="bg-purp hover:bg-purp-darker flex h-10 items-center gap-1 rounded-2xl px-3 transition-colors">
                  Buat <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-2 rounded-xl border px-2 py-1 text-sm">
                  Buat <ArrowRight size={14} />
                </button>
                <button className="flex items-center gap-2 rounded-xl border px-2 py-1 text-sm">
                  Buat <ArrowRight size={14} />
                </button>
                <button className="flex items-center gap-2 rounded-xl border px-2 py-1 text-sm">
                  Buat <ArrowRight size={14} />
                </button>
              </div>
              <div className="">
                <button className="flex items-center gap-2 rounded-xl border px-2 py-1 text-sm">
                  Buat <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <div className="rounded-xl border p-4">dwa</div>
          </div>
        </div>
      </main>
    </>
  );
}

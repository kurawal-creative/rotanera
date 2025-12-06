"use client";

import { Topbar } from "@/components/app-topbar";
import GridLayoutDashboard from "@/components/grid-layout-dashboard";
import ListLayoutDashboard from "@/components/list-layout-dashboard";
import SearchBar from "@/components/search-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowRight, Grid2x2, History, List } from "lucide-react";
import { useEffect, useState } from "react";
import { useProjects } from "@/store/projectsStore";

const placeholders = ["Buatkan desain kursi rotan minimalis", "Buat katalog produk rotan modern 2025", "Buat interior ruang tamu dengan set sofa rotan", "Buat desain meja makan rotan premium", "Buatkan etalase online untuk toko kerajinan rotan"];

export default function DashboardPage() {
    const [placeholder, setPlaceholder] = useState("");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [loading, setLoading] = useState(true);
    const { setProjects } = useProjects();

    useEffect(() => {
        async function main() {
            setLoading(true);
            try {
                const response = await axios("/api/project");
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }
        main();
    }, [setProjects]);

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
                currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
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
                <Topbar breadcrumb={[{ label: "Project" }]} />

                <div className="relative p-2">
                    <div className="space-y-4 p-4">
                        <h1 className="text-2xl font-medium dark:text-neutral-100">Deskripsikan idemu dan buat itu menjadi nyata</h1>

                        <div className="flex items-center">
                            <div className="flex w-full items-center gap-3 rounded-xl border p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
                                <Input type="text" placeholder={placeholder} className="h-10 flex-1 rounded-2xl border bg-white px-3 text-sm transition focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
                                <Button className="bg-purp hover:bg-purp-darker flex h-10 items-center gap-1 rounded-2xl px-3 transition-colors">
                                    Buat <ArrowRight />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h1 className="flex items-center gap-2 text-xl text-neutral-800 dark:text-neutral-200">
                                Terakhir di generate <History size={16} />
                            </h1>
                            <div className="mt-2 flex justify-between">
                                <SearchBar />
                                <div className="flex items-center gap-1 rounded-lg border p-1 text-sm dark:border-neutral-700 dark:bg-neutral-800">
                                    <button onClick={() => setView("grid")} className={`rounded-md p-1.5 transition ${view === "grid" ? "bg-purp text-white shadow" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"}`}>
                                        <Grid2x2 size={16} />
                                    </button>

                                    <button onClick={() => setView("list")} className={`rounded-md p-1.5 transition ${view === "list" ? "bg-purp text-white shadow" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"}`}>
                                        <List size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-10">
                                <div className="text-center">
                                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
                                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Memuat projects...</p>
                                </div>
                            </div>
                        ) : view === "grid" ? (
                            <GridLayoutDashboard />
                        ) : (
                            <ListLayoutDashboard />
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

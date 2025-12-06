"use client";

import { useEffect } from "react";
import { Topbar } from "@/components/app-topbar";
import PinterestMasonry from "@/components/galeri-page/pinterest-masonry";
import { useGalleries } from "@/store/galeriesStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Armchair, Table2, Sofa, Archive, Trees, Sparkles, Layers, Palette, TrendingUp, Clock, Download } from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

const categories: Array<{
    id: "all" | "chairs" | "tables" | "sofas" | "cabinets" | "outdoor" | "decorative" | "inspiration";
    label: string;
    icon: LucideIcon;
}> = [
    { id: "all", label: "Semua", icon: Layers },
    { id: "chairs", label: "Kursi", icon: Armchair },
    { id: "tables", label: "Meja", icon: Table2 },
    { id: "sofas", label: "Sofa", icon: Sofa },
    { id: "cabinets", label: "Lemari", icon: Archive },
    { id: "outdoor", label: "Outdoor", icon: Trees },
    { id: "decorative", label: "Dekorasi", icon: Sparkles },
    { id: "inspiration", label: "Inspirasi", icon: Palette },
];

const sortOptions = [
    { id: "latest", label: "Terbaru", icon: Clock },
    { id: "popular", label: "Terpopuler", icon: TrendingUp },
    { id: "downloads", label: "Terbanyak Diunduh", icon: Download },
];

export default function GaleriPage() {
    const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, sortBy, setSortBy, filteredImages, fetchImages, loading } = useGalleries();

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return (
        <>
            <main className="relative w-full">
                <Topbar breadcrumb={[{ label: "Galeri" }]} />

                {/* Gradient background */}
                <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-32 bg-linear-to-b from-purple-50/50 via-transparent to-transparent dark:from-purple-950/20" />

                <div className="relative p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Galeri Furniture Rotan</h1>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{loading ? "Memuat galeri..." : `Jelajahi ${filteredImages.length} inspirasi desain furniture rotan dari komunitas`}</p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 lg:max-w-md">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                            <Input type="text" placeholder="Cari inspirasi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
                        </div>

                        {/* View Controls */}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700" onClick={() => setShowFilters(!showFilters)}>
                                <SlidersHorizontal size={16} />
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-6">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? "border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-500 dark:bg-purple-950/30 dark:text-purple-400" : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"}`}
                                    >
                                        <IconComponent size={16} />
                                        {category.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Advanced Filters (Collapsible) */}
                    {showFilters && (
                        <div className="mb-6 rounded-xl border bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
                            <h3 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Filter Lanjutan</h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-neutral-700 dark:text-neutral-300">Urutkan Berdasarkan</label>
                                    <div className="flex gap-2">
                                        {sortOptions.map((option) => {
                                            const IconComponent = option.icon;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setSortBy(option.id as "latest" | "popular" | "downloads")}
                                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${sortBy === option.id ? "border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-500 dark:bg-purple-950/30 dark:text-purple-400" : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"}`}
                                                >
                                                    <IconComponent size={14} />
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pinterest Masonry Grid */}
                    <PinterestMasonry />
                </div>
            </main>
        </>
    );
}

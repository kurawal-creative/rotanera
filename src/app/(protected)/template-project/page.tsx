"use client";

import { Topbar } from "@/components/app-topbar";
import TemplateGrid from "@/components/template-page/grid-layout-template";
import TemplateList from "@/components/template-page/list-layout-template";
import { useTemplates } from "@/store/templateStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Grid3x3,
  List,
  SlidersHorizontal,
  Armchair,
  Table2,
  Sofa,
  Archive,
  Trees,
  Sparkles,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

const categories: Array<{
  id:
    | "all"
    | "chairs"
    | "tables"
    | "sofas"
    | "cabinets"
    | "outdoor"
    | "decorative";
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
];

export default function TemplateProjectPage() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    filteredTemplates,
  } = useTemplates();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <main className="relative w-full">
        <Topbar breadcrumb={[{ label: "Template Project" }]} />

        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-32 bg-gradient-to-b from-purple-50/50 via-transparent to-transparent" />

        <div className="relative p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Template Furniture Rotan
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Pilih dari {filteredTemplates.length} template siap pakai untuk
              memulai proyek Anda
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Cari template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
                Filter
              </Button>
              <div className="flex items-center gap-1 rounded-lg border p-1 text-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-purp text-white shadow"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-purp text-white shadow"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
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
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      selectedCategory === category.id
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
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
            <div className="mb-6 rounded-xl border bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-neutral-900">
                Filter Lanjutan
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-700">
                    Gaya
                  </label>
                  <select className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                    <option>Semua Gaya</option>
                    <option>Modern</option>
                    <option>Traditional</option>
                    <option>Minimalist</option>
                    <option>Rustic</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-neutral-700">
                    Popularitas
                  </label>
                  <select className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                    <option>Semua</option>
                    <option>Paling Populer</option>
                    <option>Trending</option>
                    <option>Terbaru</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Templates Grid/List */}
          {viewMode === "grid" ? <TemplateGrid /> : <TemplateList />}
        </div>
      </main>
    </>
  );
}

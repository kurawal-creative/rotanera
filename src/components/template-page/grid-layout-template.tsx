"use client";

import { Button } from "@/components/ui/button";
import { useTemplates } from "@/store/templateStore";
import { Heart, Eye, Plus } from "lucide-react";
import Image from "next/image";

export default function TemplateGrid() {
  const { filteredTemplates, toggleFavorite, useTemplate } = useTemplates();

  if (filteredTemplates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-6xl">🪑</div>
        <h3 className="text-lg font-medium text-neutral-900">
          Tidak ada template ditemukan
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredTemplates.map((template) => (
        <div
          key={template.id}
          className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
              <div className="text-6xl opacity-20">🪑</div>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                className="gap-2"
                onClick={() => {
                  useTemplate(template.id);
                  // Add navigation logic here
                }}
              >
                <Plus size={16} />
                Gunakan
              </Button>
              <Button size="sm" variant="secondary" className="gap-2">
                <Eye size={16} />
                Preview
              </Button>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(template.id)}
              className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
            >
              <Heart
                size={16}
                className={
                  template.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-neutral-400"
                }
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="line-clamp-1 font-medium text-neutral-900">
              {template.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
              {template.description}
            </p>

            {/* Stats */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
              <span>🔥 {template.usageCount} penggunaan</span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-600">
                {template.style}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

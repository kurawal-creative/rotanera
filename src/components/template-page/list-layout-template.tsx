"use client";

import { Button } from "@/components/ui/button";
import { useTemplates } from "@/store/templateStore";
import { Heart, Plus, Eye, Flame, Armchair } from "lucide-react";

export default function TemplateList() {
  const { filteredTemplates, toggleFavorite, useTemplate } = useTemplates();

  if (filteredTemplates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4">
          <Armchair size={64} className="text-neutral-300" />
        </div>
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
    <div className="divide-y overflow-hidden rounded-xl border bg-white">
      {filteredTemplates.map((template) => (
        <div
          key={template.id}
          className="flex items-center gap-4 p-4 transition hover:bg-purple-50/50"
        >
          {/* Thumbnail */}
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-violet-100">
            <div className="flex h-full items-center justify-center">
              <Armchair size={32} className="text-purple-300" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-medium text-neutral-900">{template.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {template.description}
            </p>
            <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-orange-500" />
                {template.usageCount} penggunaan
              </span>
              <span>•</span>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
                {template.style}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => useTemplate(template.id)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus size={16} className="mr-1" />
              Gunakan
            </Button>
            <Button size="sm" variant="outline" className="hover:bg-purple-50">
              <Eye size={16} />
            </Button>
            <button
              onClick={() => toggleFavorite(template.id)}
              className="rounded-lg p-2 transition hover:bg-purple-100"
            >
              <Heart
                size={18}
                className={
                  template.isFavorite
                    ? "fill-purple-500 text-purple-500"
                    : "text-neutral-400"
                }
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

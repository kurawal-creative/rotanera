"use client";

import { Button } from "@/components/ui/button";
import { useTemplates } from "@/store/templateStore";
import { Heart, Eye, Plus, Flame, Armchair } from "lucide-react";

export default function TemplateGrid() {
    const { filteredTemplates, toggleFavorite, applyTemplate } = useTemplates();

    if (filteredTemplates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4">
                    <Armchair size={64} className="text-neutral-300 dark:text-neutral-600" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Tidak ada template ditemukan</h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Coba ubah filter atau kata kunci pencarian</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template) => (
                <div key={template.id} className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:border-purple-200 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-purple-600">
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30">
                            <Armchair size={64} className="text-purple-200 dark:text-purple-800" />
                        </div>

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-purple-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                                size="sm"
                                variant="secondary"
                                className="gap-2 bg-white hover:bg-purple-50 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-purple-950/50"
                                onClick={() => {
                                    applyTemplate(template.id);
                                    // Add navigation logic here
                                }}
                            >
                                <Plus size={16} />
                                Gunakan
                            </Button>
                            <Button size="sm" variant="secondary" className="gap-2 bg-white hover:bg-purple-50 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-purple-950/50">
                                <Eye size={16} />
                                Preview
                            </Button>
                        </div>

                        {/* Favorite button */}
                        <button onClick={() => toggleFavorite(template.id)} className="absolute top-3 right-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white dark:bg-neutral-800/90 dark:hover:bg-neutral-800">
                            <Heart size={16} className={template.isFavorite ? "fill-purple-500 text-purple-500" : "text-neutral-400"} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="line-clamp-1 font-medium text-neutral-900 dark:text-neutral-100">{template.title}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">{template.description}</p>

                        {/* Stats */}
                        <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                            <span className="flex items-center gap-1">
                                <Flame size={14} className="text-orange-500" />
                                {template.usageCount} penggunaan
                            </span>
                            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">{template.style}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

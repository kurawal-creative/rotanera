"use client";

import { useGalleries } from "@/store/galeriesStore";
import { Heart, Download, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PinterestMasonry() {
    const { filteredImages, toggleLike, trackDownload, loading } = useGalleries();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleDownload = async (imageUrl: string, imageId: string, title: string) => {
        try {
            // Track the download
            await trackDownload(imageId);

            // Download the image
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading image:", error);
            alert("Gagal mendownload gambar");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-purple-600" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Memuat galeri...</h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Sedang mengambil gambar dari database</p>
            </div>
        );
    }

    if (filteredImages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 text-6xl">🖼️</div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Tidak ada gambar ditemukan</h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Coba ubah filter atau kata kunci pencarian</p>
            </div>
        );
    }

    return (
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {filteredImages.map((image) => (
                <div key={image.id} className="group relative break-inside-avoid overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:border dark:border-neutral-700 dark:bg-neutral-800/50" onMouseEnter={() => setHoveredId(image.id)} onMouseLeave={() => setHoveredId(null)}>
                    {/* Image Container */}
                    <div className="relative w-full overflow-hidden bg-linear-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30">
                        <Image src={image.imageUrl} alt={image.title} width={image.width} height={image.height} className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" />

                        {/* Overlay on Hover */}
                        <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${hoveredId === image.id ? "opacity-100" : "opacity-0"}`}>
                            {/* Top Actions */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button onClick={() => toggleLike(image.id)} className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white">
                                    <Heart size={18} className={image.isLiked ? "fill-red-500 text-red-500" : "text-neutral-600"} />
                                </button>
                                <button onClick={() => handleDownload(image.imageUrl, image.id, image.title)} className="rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white">
                                    <Download size={18} className="text-neutral-600" />
                                </button>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute right-0 bottom-0 left-0 p-4">
                                <h3 className="line-clamp-2 font-semibold text-white">{image.title}</h3>
                                <p className="mt-1 line-clamp-1 text-xs text-white/80">{image.description}</p>

                                {/* Author Info */}
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">{image.author.avatar ? <Image src={image.author.avatar} alt={image.author.name} width={32} height={32} className="h-full w-full object-cover" /> : <User size={14} className="text-white" />}</div>
                                        <span className="text-xs font-medium text-white">{image.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white/90">
                                        <span className="flex items-center gap-1">
                                            <Heart size={12} />
                                            {image.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Download size={12} />
                                            {image.downloads}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags - Always Visible
                    <div className="p-3">
                        <div className="flex flex-wrap gap-1.5">
                            {image.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">
                                    #{tag}
                                </span>
                            ))}
                            {image.tags.length > 3 && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">+{image.tags.length - 3}</span>}
                        </div>
                    </div> */}
                </div>
            ))}
        </div>
    );
}

import { create } from "zustand";
import axios from "axios";

export type GalleryCategory = "all" | "chairs" | "tables" | "sofas" | "cabinets" | "outdoor" | "decorative" | "inspiration";

export type GalleryImage = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: GalleryCategory;
    tags: string[];
    likes: number;
    views: number;
    downloads: number;
    author: {
        name: string;
        avatar?: string;
    };
    isLiked?: boolean;
    width: number;
    height: number;
    createdAt: string;
};

type GalleriesStore = {
    images: GalleryImage[];
    filteredImages: GalleryImage[];
    loading: boolean;
    selectedCategory: GalleryCategory;
    searchQuery: string;
    sortBy: "latest" | "popular" | "views" | "downloads";
    setSelectedCategory: (category: GalleryCategory) => void;
    setSearchQuery: (query: string) => void;
    setSortBy: (sort: "latest" | "popular" | "views" | "downloads") => void;
    toggleLike: (id: string) => Promise<void>;
    trackDownload: (id: string) => Promise<void>;
    applyFilters: () => void;
    fetchImages: () => Promise<void>;
};

export const useGalleries = create<GalleriesStore>((set, get) => ({
    images: [],
    filteredImages: [],
    loading: false,
    selectedCategory: "all",
    searchQuery: "",
    sortBy: "latest",

    fetchImages: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/api/gallery");
            const images = response.data;
            set({ images, filteredImages: images, loading: false });
            get().applyFilters();
        } catch (error) {
            console.error("Error fetching gallery images:", error);
            set({ loading: false });
        }
    },

    setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().applyFilters();
    },

    setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().applyFilters();
    },

    setSortBy: (sort) => {
        set({ sortBy: sort });
        get().applyFilters();
    },

    toggleLike: async (id) => {
        // Optimistically update UI
        const currentImage = get().images.find((img) => img.id === id);
        if (!currentImage) return;

        const wasLiked = currentImage.isLiked;

        // Optimistic update
        set((state) => ({
            images: state.images.map((img) =>
                img.id === id
                    ? {
                          ...img,
                          isLiked: !wasLiked,
                          likes: wasLiked ? img.likes - 1 : img.likes + 1,
                      }
                    : img,
            ),
            filteredImages: state.filteredImages.map((img) =>
                img.id === id
                    ? {
                          ...img,
                          isLiked: !wasLiked,
                          likes: wasLiked ? img.likes - 1 : img.likes + 1,
                      }
                    : img,
            ),
        }));

        try {
            await axios.post(`/api/gallery/${id}/favorite`);
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on error
            set((state) => ({
                images: state.images.map((img) =>
                    img.id === id
                        ? {
                              ...img,
                              isLiked: wasLiked,
                              likes: wasLiked ? img.likes + 1 : img.likes - 1,
                          }
                        : img,
                ),
                filteredImages: state.filteredImages.map((img) =>
                    img.id === id
                        ? {
                              ...img,
                              isLiked: wasLiked,
                              likes: wasLiked ? img.likes + 1 : img.likes - 1,
                          }
                        : img,
                ),
            }));
        }
    },

    trackDownload: async (id) => {
        try {
            await axios.post(`/api/gallery/${id}/download`);

            set((state) => ({
                images: state.images.map((img) =>
                    img.id === id
                        ? {
                              ...img,
                              downloads: img.downloads + 1,
                          }
                        : img,
                ),
                filteredImages: state.filteredImages.map((img) =>
                    img.id === id
                        ? {
                              ...img,
                              downloads: img.downloads + 1,
                          }
                        : img,
                ),
            }));
        } catch (error) {
            console.error("Error tracking download:", error);
        }
    },

    applyFilters: () => {
        const { images, searchQuery, sortBy } = get();

        let filtered = images;

        if (searchQuery) {
            filtered = filtered.filter((img) => img.title.toLowerCase().includes(searchQuery.toLowerCase()) || img.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (sortBy === "popular") {
            filtered.sort((a, b) => b.likes - a.likes);
        } else if (sortBy === "views") {
            filtered.sort((a, b) => b.views - a.views);
        } else if (sortBy === "downloads") {
            filtered.sort((a, b) => b.downloads - a.downloads);
        } else {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        set({ filteredImages: filtered });
    },
}));

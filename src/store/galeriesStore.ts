import { create } from "zustand";

export type GalleryCategory =
  | "all"
  | "chairs"
  | "tables"
  | "sofas"
  | "cabinets"
  | "outdoor"
  | "decorative"
  | "inspiration";

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  tags: string[];
  likes: number;
  views: number;
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
  selectedCategory: GalleryCategory;
  searchQuery: string;
  sortBy: "latest" | "popular" | "views";
  setSelectedCategory: (category: GalleryCategory) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: "latest" | "popular" | "views") => void;
  toggleLike: (id: string) => void;
  applyFilters: () => void;
};

const dummyImages: GalleryImage[] = [
  {
    id: "1",
    title: "Kursi Rotan Minimalis dengan Bantal Abu-abu",
    description: "Desain kursi rotan modern dengan sentuhan minimalis",
    imageUrl: "/gallery/chair-1.jpg",
    category: "chairs",
    tags: ["minimalis", "modern", "abu-abu", "kursi"],
    likes: 245,
    views: 1203,
    author: { name: "Ahmad Furniture", avatar: "/avatars/1.jpg" },
    width: 400,
    height: 500,
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Set Meja Makan Rotan Natural 6 Kursi",
    description: "Meja makan keluarga dengan finishing natural berkualitas",
    imageUrl: "/gallery/table-1.jpg",
    category: "tables",
    tags: ["meja-makan", "natural", "keluarga"],
    likes: 189,
    views: 892,
    author: { name: "Rotan Jaya", avatar: "/avatars/2.jpg" },
    width: 600,
    height: 400,
    createdAt: "2024-01-18",
  },
  {
    id: "3",
    title: "Sofa L Rotan dengan Cushion Putih",
    description: "Sofa rotan model L untuk ruang tamu luas",
    imageUrl: "/gallery/sofa-1.jpg",
    category: "sofas",
    tags: ["sofa", "ruang-tamu", "putih", "modern"],
    likes: 312,
    views: 1567,
    author: { name: "Dina Interior", avatar: "/avatars/3.jpg" },
    width: 700,
    height: 500,
    createdAt: "2024-01-22",
  },
  {
    id: "4",
    title: "Kursi Santai Telur Gantung",
    description: "Kursi gantung rotan untuk outdoor dan indoor",
    imageUrl: "/gallery/chair-2.jpg",
    category: "chairs",
    tags: ["gantung", "santai", "outdoor"],
    likes: 428,
    views: 2103,
    author: { name: "Creative Rattan", avatar: "/avatars/4.jpg" },
    width: 400,
    height: 600,
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    title: "Lemari Pakaian Rotan Klasik",
    description: "Lemari rotan dengan ukiran tradisional Indonesia",
    imageUrl: "/gallery/cabinet-1.jpg",
    category: "cabinets",
    tags: ["lemari", "klasik", "tradisional"],
    likes: 156,
    views: 743,
    author: { name: "Heritage Craft", avatar: "/avatars/5.jpg" },
    width: 400,
    height: 550,
    createdAt: "2024-01-15",
  },
  {
    id: "6",
    title: "Set Taman Outdoor Tahan Cuaca",
    description: "Furniture rotan sintetis untuk area outdoor",
    imageUrl: "/gallery/outdoor-1.jpg",
    category: "outdoor",
    tags: ["outdoor", "taman", "tahan-cuaca"],
    likes: 267,
    views: 1345,
    author: { name: "Garden Plus", avatar: "/avatars/6.jpg" },
    width: 650,
    height: 450,
    createdAt: "2024-01-19",
  },
  {
    id: "7",
    title: "Keranjang Rotan Hias Dinding",
    description: "Dekorasi dinding dari anyaman rotan natural",
    imageUrl: "/gallery/deco-1.jpg",
    category: "decorative",
    tags: ["dekorasi", "dinding", "anyaman"],
    likes: 198,
    views: 956,
    author: { name: "Deco Home", avatar: "/avatars/7.jpg" },
    width: 300,
    height: 400,
    createdAt: "2024-01-16",
  },
  {
    id: "8",
    title: "Kursi Bar Rotan Tinggi",
    description: "Kursi bar dengan rangka besi dan dudukan rotan",
    imageUrl: "/gallery/chair-3.jpg",
    category: "chairs",
    tags: ["bar", "tinggi", "modern"],
    likes: 223,
    views: 1087,
    author: { name: "Urban Rattan", avatar: "/avatars/8.jpg" },
    width: 350,
    height: 600,
    createdAt: "2024-01-21",
  },
  {
    id: "9",
    title: "Meja Kopi Bulat Rotan",
    description: "Meja kopi kecil dengan kaca di atasnya",
    imageUrl: "/gallery/table-2.jpg",
    category: "tables",
    tags: ["meja-kopi", "bulat", "kaca"],
    likes: 334,
    views: 1678,
    author: { name: "Coffee Corner", avatar: "/avatars/9.jpg" },
    width: 500,
    height: 500,
    createdAt: "2024-01-23",
  },
  {
    id: "10",
    title: "Sofa Single Rotan dengan Ottoman",
    description: "Kursi single dengan penyangga kaki rotan",
    imageUrl: "/gallery/sofa-2.jpg",
    category: "sofas",
    tags: ["single", "ottoman", "santai"],
    likes: 287,
    views: 1432,
    author: { name: "Comfort Living", avatar: "/avatars/10.jpg" },
    width: 450,
    height: 550,
    createdAt: "2024-01-24",
  },
  {
    id: "11",
    title: "Rak Buku Rotan Vertikal",
    description: "Rak penyimpanan buku dengan 5 tingkat",
    imageUrl: "/gallery/cabinet-2.jpg",
    category: "cabinets",
    tags: ["rak", "buku", "penyimpanan"],
    likes: 176,
    views: 834,
    author: { name: "Smart Storage", avatar: "/avatars/11.jpg" },
    width: 350,
    height: 650,
    createdAt: "2024-01-17",
  },
  {
    id: "12",
    title: "Ayunan Rotan Taman Gantung",
    description: "Ayunan gantung untuk taman dengan bantal empuk",
    imageUrl: "/gallery/outdoor-2.jpg",
    category: "outdoor",
    tags: ["ayunan", "gantung", "taman"],
    likes: 412,
    views: 2234,
    author: { name: "Garden Bliss", avatar: "/avatars/12.jpg" },
    width: 550,
    height: 600,
    createdAt: "2024-01-26",
  },
  {
    id: "13",
    title: "Lampu Gantung Rotan Bohemian",
    description: "Lampu hias dari anyaman rotan untuk ruang tamu",
    imageUrl: "/gallery/deco-2.jpg",
    category: "decorative",
    tags: ["lampu", "bohemian", "gantung"],
    likes: 389,
    views: 1923,
    author: { name: "Light & Deco", avatar: "/avatars/13.jpg" },
    width: 400,
    height: 500,
    createdAt: "2024-01-27",
  },
  {
    id: "14",
    title: "Inspirasi Ruang Tamu Rotan Modern",
    description: "Kombinasi furniture rotan dalam ruang tamu minimalis",
    imageUrl: "/gallery/inspo-1.jpg",
    category: "inspiration",
    tags: ["ruang-tamu", "inspirasi", "modern"],
    likes: 567,
    views: 3012,
    author: { name: "Interior Ideas", avatar: "/avatars/14.jpg" },
    width: 800,
    height: 600,
    createdAt: "2024-01-28",
  },
  {
    id: "15",
    title: "Meja Konsol Rotan untuk Entrance",
    description: "Meja konsol tipis untuk area pintu masuk",
    imageUrl: "/gallery/table-3.jpg",
    category: "tables",
    tags: ["konsol", "entrance", "tipis"],
    likes: 201,
    views: 987,
    author: { name: "Entry Designs", avatar: "/avatars/15.jpg" },
    width: 600,
    height: 400,
    createdAt: "2024-01-14",
  },
  {
    id: "16",
    title: "Kursi Makan Rotan Set 4 pcs",
    description: "Set kursi makan dengan desain ergonomis",
    imageUrl: "/gallery/chair-4.jpg",
    category: "chairs",
    tags: ["makan", "set", "ergonomis"],
    likes: 234,
    views: 1156,
    author: { name: "Dining Comfort", avatar: "/avatars/16.jpg" },
    width: 550,
    height: 500,
    createdAt: "2024-01-29",
  },
];

export const useGalleries = create<GalleriesStore>((set, get) => ({
  images: dummyImages,
  filteredImages: dummyImages,
  selectedCategory: "all",
  searchQuery: "",
  sortBy: "latest",

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

  toggleLike: (id) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id
          ? {
              ...img,
              isLiked: !img.isLiked,
              likes: img.isLiked ? img.likes - 1 : img.likes + 1,
            }
          : img
      ),
      filteredImages: state.filteredImages.map((img) =>
        img.id === id
          ? {
              ...img,
              isLiked: !img.isLiked,
              likes: img.isLiked ? img.likes - 1 : img.likes + 1,
            }
          : img
      ),
    }));
  },

  applyFilters: () => {
    const { images, selectedCategory, searchQuery, sortBy } = get();

    // Filter by category
    let filtered =
      selectedCategory === "all"
        ? images
        : images.filter((img) => img.category === selectedCategory);

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort
    if (sortBy === "popular") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "views") {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      // latest
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    set({ filteredImages: filtered });
  },
}));

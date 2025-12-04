import { create } from "zustand";

export type TemplateCategory =
  | "all"
  | "chairs"
  | "tables"
  | "sofas"
  | "cabinets"
  | "outdoor"
  | "decorative";

export type TemplateStyle = "modern" | "traditional" | "minimalist" | "rustic";

export type Template = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  style: TemplateStyle;
  thumbnail: string;
  tags: string[];
  popularity: number;
  isFavorite?: boolean;
  usageCount: number;
  createdAt: string;
};

type TemplatesStore = {
  templates: Template[];
  filteredTemplates: Template[];
  selectedCategory: TemplateCategory;
  searchQuery: string;
  viewMode: "grid" | "list";
  setSelectedCategory: (category: TemplateCategory) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  toggleFavorite: (id: string) => void;
  useTemplate: (id: string) => void;
};

const dummyTemplates: Template[] = [
  {
    id: "1",
    title: "Kursi Minimalis Modern",
    description: "Kursi rotan dengan desain minimalis cocok untuk ruang tamu",
    category: "chairs",
    style: "modern",
    thumbnail: "/templates/chair-modern.jpg",
    tags: ["minimalis", "modern", "ruang-tamu"],
    popularity: 95,
    usageCount: 342,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Meja Makan Keluarga",
    description: "Meja makan rotan untuk 6 orang dengan finishing natural",
    category: "tables",
    style: "traditional",
    thumbnail: "/templates/table-dining.jpg",
    tags: ["meja-makan", "keluarga", "natural"],
    popularity: 88,
    usageCount: 256,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Sofa Set 3-2-1",
    description: "Set sofa rotan lengkap untuk ruang keluarga",
    category: "sofas",
    style: "modern",
    thumbnail: "/templates/sofa-set.jpg",
    tags: ["sofa", "set-lengkap", "ruang-keluarga"],
    popularity: 92,
    usageCount: 189,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Lemari Hias Tradisional",
    description: "Lemari rotan dengan ukiran tradisional Indonesia",
    category: "cabinets",
    style: "traditional",
    thumbnail: "/templates/cabinet-traditional.jpg",
    tags: ["lemari", "tradisional", "ukiran"],
    popularity: 76,
    usageCount: 124,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Set Taman Outdoor",
    description: "Furniture rotan tahan cuaca untuk taman dan balkon",
    category: "outdoor",
    style: "modern",
    thumbnail: "/templates/outdoor-set.jpg",
    tags: ["outdoor", "taman", "tahan-cuaca"],
    popularity: 85,
    usageCount: 203,
    createdAt: "2024-01-18",
  },
  {
    id: "6",
    title: "Kursi Santai Anyaman",
    description: "Kursi santai dengan anyaman rotan detail tinggi",
    category: "chairs",
    style: "rustic",
    thumbnail: "/templates/chair-rustic.jpg",
    tags: ["santai", "anyaman", "detail"],
    popularity: 81,
    usageCount: 167,
    createdAt: "2024-01-12",
  },
];

export const useTemplates = create<TemplatesStore>((set, get) => ({
  templates: dummyTemplates,
  filteredTemplates: dummyTemplates,
  selectedCategory: "all",
  searchQuery: "",
  viewMode: "grid",

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    const { templates, searchQuery } = get();
    let filtered =
      category === "all"
        ? templates
        : templates.filter((t) => t.category === category);

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }
    set({ filteredTemplates: filtered });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    const { templates, selectedCategory } = get();
    let filtered =
      selectedCategory === "all"
        ? templates
        : templates.filter((t) => t.category === selectedCategory);

    if (query) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      );
    }
    set({ filteredTemplates: filtered });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleFavorite: (id) => {
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === id ? { ...t, isFavorite: !t.isFavorite } : t,
      ),
      filteredTemplates: state.filteredTemplates.map((t) =>
        t.id === id ? { ...t, isFavorite: !t.isFavorite } : t,
      ),
    }));
  },

  useTemplate: (id) => {
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === id ? { ...t, usageCount: t.usageCount + 1 } : t,
      ),
    }));
  },
}));

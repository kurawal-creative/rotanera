import { create } from "zustand";
import { useProjects, Project } from "@/store/projectsStore";

type SearchStore = {
  query: string;
  setQuery: (q: string) => void;
  results: Project[];
  search: () => void;
};

export const useProjectSearch = create<SearchStore>((set, get) => ({
  query: "",
  setQuery: (q) => set({ query: q }),
  results: [],
  search: () => {
    const query = get().query.toLowerCase();
    const projects = useProjects.getState().projects;
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(query),
    );
    set({ results: filtered });
  },
}));

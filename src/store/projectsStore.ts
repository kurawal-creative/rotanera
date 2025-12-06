import { create } from "zustand";

export type Project = {
    id: string;
    name: string;
    description: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    images: {
        id: string;
        url: string;
        projectId: string;
        createdAt: string;
        updatedAt: string;
    }[];
};

type ProjectsStore = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    deleteProject: (id: string) => void;
};

export const useProjects = create<ProjectsStore>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
    deleteProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
}));

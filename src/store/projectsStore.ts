import { create } from "zustand";

export type Project = {
  id: number;
  title: string;
  edited: string;
  created: string;
};

type ProjectsStore = {
  projects: Project[];
};

const dummyProjects: Project[] = [
  { id: 1, title: "Untitled", edited: "2 days ago", created: "3 months ago" },
  { id: 2, title: "Cetha", edited: "22 hours ago", created: "22 hours ago" },
  {
    id: 3,
    title: "Hand Drawn Shapes (Community)",
    edited: "1 day ago",
    created: "1 day ago",
  },
  {
    id: 4,
    title: "Ui Design Web & Mobile",
    edited: "15 days ago",
    created: "5 months ago",
  },
  {
    id: 5,
    title: "UI Design - User Testing",
    edited: "7 days ago",
    created: "7 months ago",
  },
];

export const useProjects = create<ProjectsStore>(() => ({
  projects: dummyProjects,
}));

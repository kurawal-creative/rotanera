import { useProjects } from "@/store/projectsStore";
import { Clock } from "lucide-react";

const GridLayoutDashboard = () => {
  const projects = useProjects((s) => s.projects);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {projects.map((p) => (
        <div
          key={p.id}
          className="group rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md"
        >
          <div className="aspect-video w-full rounded-lg bg-neutral-100" />
          <div className="mt-3">
            <h3 className="truncate text-sm font-medium text-neutral-900">
              {p.title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
              <Clock size={12} />
              <span>Edited {p.edited}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayoutDashboard;

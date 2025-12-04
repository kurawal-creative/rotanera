"use client";
import { useProjects } from "@/store/projectsStore";
import { Clock, File } from "lucide-react";

const ListLayoutDashboard = () => {
  const projects = useProjects((s) => s.projects);

  return (
    <div className="divide-y rounded-xl border bg-white">
      {projects.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between p-4 transition hover:bg-neutral-50"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-neutral-100">
              <File size={18} className="text-neutral-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-900">
                {p.title}
              </h4>
              <p className="text-xs text-neutral-500">Created {p.created}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <Clock size={12} />
            <span>Edited {p.edited}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListLayoutDashboard;

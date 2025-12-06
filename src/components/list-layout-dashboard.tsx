"use client";
import { useProjects } from "@/store/projectsStore";
import { Clock, File, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const getRelativeTime = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffMs = now.getTime() - updated.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
};

const ListLayoutDashboard = () => {
    const projects = useProjects((s) => s.projects);

    return (
        <div className="divide-y rounded-xl border bg-white">
            {projects.map((p) => (
                <Link key={p.id} href={`/canvas/${p.id}`} className="flex items-center justify-between p-4 transition hover:bg-neutral-50">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md bg-neutral-100">
                            {p.images.length > 0 ? (
                                <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <File size={18} className="text-neutral-400" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-neutral-900">{p.name}</h4>
                            {p.description && <p className="text-xs text-neutral-600">{p.description}</p>}
                            <p className="text-xs text-neutral-500">
                                Created {new Date(p.createdAt).toLocaleDateString()} • {p.images.length} images
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Clock size={12} />
                        <span>Terakhir diubah {getRelativeTime(p.updatedAt)}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ListLayoutDashboard;

import { useProjects } from "@/store/projectsStore";
import { Clock, ImageIcon, MoreVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

const GridLayoutDashboard = () => {
    const projects = useProjects((s) => s.projects);

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {projects.map((p) => (
                <Link key={p.id} href={`/canvas/${p.id}`} className="group rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100">
                        {p.images.length > 0 ? (
                            <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-neutral-400">
                                <ImageIcon size={32} />
                            </div>
                        )}
                    </div>
                    <div className="mt-3">
                        <div className="flex items-center justify-between">
                            <h3 className="truncate text-sm font-medium text-neutral-900">{p.name}</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {p.description && <p className="mt-1 truncate text-xs text-neutral-600">{p.description}</p>}
                        <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>Terakhir diubah {getRelativeTime(p.updatedAt)}</span>
                            </div>
                            <span>{p.images.length} images</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GridLayoutDashboard;

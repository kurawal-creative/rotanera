import { Sidebar, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { ChevronsUpDown, CircleUser, GalleryVerticalEnd, LayoutGrid, LayoutTemplate, LogOut, Plus, Zap } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";

const items = [
    { title: "Project", url: "/project", icon: LayoutGrid },
    { title: "Galeri", url: "/galeri", icon: GalleryVerticalEnd },
    { title: "Improve Design", url: "/improve", icon: Zap },
    { title: "Template Project", url: "/template-project", icon: LayoutTemplate },
];

export function AppSidebar() {
    const { user, loading, signOut } = useAuth();
    const pathname = usePathname();

    const username = user?.user_metadata?.full_name || user?.user_metadata.name || user?.email?.split("@")[0] || "User";
    const email = user?.email || "No email";
    const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

    if (loading) {
        return (
            <Sidebar className="bg-white dark:bg-neutral-900">
                <SidebarHeader className="bg-white dark:bg-neutral-900">
                    <Link href={"/"} className="text-purp text-center text-3xl font-normal tracking-tight">
                        rotanera
                    </Link>
                </SidebarHeader>
                <SidebarContent className="bg-white px-2 dark:bg-neutral-900">
                    <div className="flex items-center justify-center py-8">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
                    </div>
                </SidebarContent>
            </Sidebar>
        );
    }

    return (
        <Sidebar className="bg-white dark:border-r dark:border-neutral-800 dark:bg-neutral-900">
            {/* Header */}
            <SidebarHeader className="bg-white dark:bg-neutral-900">
                <Link href={"/"} className="text-purp text-center text-3xl font-normal tracking-tight">
                    rotanera
                </Link>
            </SidebarHeader>

            {/* Main menu */}
            <SidebarContent className="bg-white px-2 dark:bg-neutral-900">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">Menu Utama</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => {
                                const isActive = pathname === item.url || (item.url === "/project" && (pathname.startsWith("/project") || pathname.startsWith("/canvas")));
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild className={`relative flex items-center gap-2 rounded-md border px-2 py-2 transition-all hover:border-gray-200 hover:bg-gray-100/70 active:bg-gray-200 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/70 dark:active:bg-neutral-800 ${isActive ? "bg-purp border-purp text-white" : "border-transparent"}`}>
                                            <Link href={item.url}>
                                                <item.icon size={18} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="bg-white px-2 pt-3 pb-4 dark:bg-neutral-900">
                <Link href={"/project-baru"} className="border-purp hover:border-purp-darker text-purp mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed bg-white px-2 py-2 text-sm transition hover:bg-neutral-50 dark:border-purple-500 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Plus size={16} />
                    <span>Tambah Project</span>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-neutral-800">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <UserAvatar className="rounded-lg" src={avatarUrl} alt={username} />
                                </Avatar>

                                <div className="flex flex-col text-left">
                                    <span className="font-medium dark:text-neutral-200">{username}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{email}</span>
                                </div>
                            </div>
                            <ChevronsUpDown size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="end" className="ml-3 w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{username}</p>
                                <p className="text-xs text-gray-500">{email}</p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="cursor-pointer">
                                <CircleUser className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

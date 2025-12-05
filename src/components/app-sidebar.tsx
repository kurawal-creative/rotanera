import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ChevronsUpDown,
  CircleUser,
  GalleryVerticalEnd,
  LayoutGrid,
  LayoutTemplate,
  LogOut,
  PersonStandingIcon,
  Plus,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const items = [
  { title: "Project", url: "/project", icon: LayoutGrid },
  { title: "Galeri", url: "/galeri", icon: GalleryVerticalEnd },
  { title: "Template Project", url: "/template-project", icon: LayoutTemplate },
];

export function AppSidebar() {
  const { user, loading, signOut } = useAuth();

  const username =
    user?.user_metadata?.full_name ||
    user?.user_metadata.name ||
    user?.email?.split("@")[0] ||
    "User";
  const email = user?.email || "No email";
  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  if (loading) {
    return (
      <Sidebar className="bg-white">
        <SidebarHeader className="bg-white">
          <Link
            href={"/"}
            className="text-purp text-center text-3xl font-normal tracking-tight"
          >
            rotanera
          </Link>
        </SidebarHeader>
        <SidebarContent className="bg-white px-2">
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="bg-white">
      {/* Header */}
      <SidebarHeader className="bg-white">
        <Link
          href={"/"}
          className="text-purp text-center text-3xl font-normal tracking-tight"
        >
          rotanera
        </Link>
      </SidebarHeader>

      {/* Main menu */}
      <SidebarContent className="bg-white px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Menu Utama
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="data-[state=active]:bg-purp relative flex items-center gap-2 rounded-md border border-transparent px-2 py-2 transition-all hover:border-gray-200 hover:bg-gray-100/70 active:bg-gray-200 data-[state=active]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="bg-white px-2 pt-3 pb-4">
        <Link
          href={"/project-baru"}
          className="border-purp hover:border-purp-darker text-purp mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed bg-white px-2 py-2 text-sm transition hover:bg-neutral-50"
        >
          <Plus size={16} />
          <span>Tambah Project</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-full">
                  <UserAvatar
                    className="rounded-lg"
                    src={avatarUrl}
                    alt={username}
                  />
                </Avatar>

                <div className="flex flex-col text-left">
                  <span className="font-medium">{username}</span>
                  <span className="text-xs text-gray-500">{email}</span>
                </div>
              </div>
              <ChevronsUpDown size={16} className="text-gray-500" />
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

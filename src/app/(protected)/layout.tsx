"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import RotaneraBot from "@/components/rotanera-bot";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            {children}
            <RotaneraBot />
        </SidebarProvider>
    );
}

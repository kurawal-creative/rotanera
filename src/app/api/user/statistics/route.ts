import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get total projects count
        const totalProjects = await prisma.project.count({
            where: {
                userId: user.id,
            },
        });

        // Get favorite images count (favorites in gallery)
        const favoriteImagesCount = await prisma.favorite.count({
            where: {
                userId: user.id,
            },
        });

        // Get templates used count (if you have template usage tracking)
        // For now, we'll use placeholder values
        const templatesUsed = 0; // TODO: Implement when template usage is tracked
        const totalTemplateUsage = 0; // TODO: Implement when template usage is tracked

        // Get recent activity (recent projects)
        const recentProjects = await prisma.project.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 5,
        });

        const recentActivity = recentProjects.map((project) => ({
            id: project.id,
            action: "PROJECT_UPDATED",
            description: `Updated project "${project.name}"`,
            timestamp: project.updatedAt.toISOString(),
            icon: "📁",
        }));

        // Get user join date
        const userRecord = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                createdAt: true,
            },
        });

        const statistics = {
            // Template Statistics
            templatesUsed,
            totalTemplateUsage,
            favoriteTemplatesCount: favoriteImagesCount, // Using favorite images as "favorite templates"
            mostUsedTemplate: null,

            // Project Statistics
            totalProjects,
            draftProjects: 0, // TODO: Add status field to Project model
            publishedProjects: totalProjects,
            archivedProjects: 0,

            // Activity Statistics
            recentActivity,
            joinDate: userRecord?.createdAt.toISOString() || new Date().toISOString(),
            lastActive: new Date().toISOString(),

            // Weekly activity (placeholder for now)
            weeklyActivity: [],
        };

        return NextResponse.json(statistics);
    } catch (error) {
        console.error("Error fetching user statistics:", error);
        return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
    }
}

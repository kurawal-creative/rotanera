import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: projectId } = await params;

        const project = await prisma.project.findFirst({
            where: {
                userId: user.id,
                id: projectId,
            },
            include: {
                images: true,
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: projectId } = await params;

        // Check if project exists and belongs to user
        const project = await prisma.project.findFirst({
            where: {
                userId: user.id,
                id: projectId,
            },
            include: {
                images: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Get all image IDs from this project
        const imageIds = project.images.map((img) => img.id);

        // Step 1: Delete all favorites associated with these images
        if (imageIds.length > 0) {
            await prisma.favorite.deleteMany({
                where: {
                    imageId: {
                        in: imageIds,
                    },
                },
            });
        }

        // Step 2: Delete all images associated with the project
        await prisma.image.deleteMany({
            where: {
                projectId: projectId,
            },
        });

        // Step 3: Delete the project
        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });

        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}

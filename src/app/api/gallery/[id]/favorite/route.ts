import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: imageId } = await params;

        // Check if already favorited
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_imageId: {
                    userId: user.id,
                    imageId: imageId,
                },
            },
        });

        if (existing) {
            // Unfavorite
            await prisma.favorite.delete({
                where: {
                    id: existing.id,
                },
            });
            return NextResponse.json({ favorited: false });
        } else {
            // Favorite
            await prisma.favorite.create({
                data: {
                    userId: user.id,
                    imageId: imageId,
                },
            });
            return NextResponse.json({ favorited: true });
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
        return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
    }
}

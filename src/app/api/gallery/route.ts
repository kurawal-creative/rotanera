import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/supabase/server";

export async function GET() {
    try {
        const user = await getCurrentUser();

        const images = await prisma.image.findMany({
            include: {
                project: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                avatar: true,
                            },
                        },
                    },
                },
                favorites: user
                    ? {
                          where: {
                              userId: user.id,
                          },
                      }
                    : false,
                _count: {
                    select: {
                        favorites: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const galleryImages = images.map((img) => ({
            id: img.id,
            title: img.project.name,
            description: `Image from project ${img.project.name}`,
            imageUrl: img.url,
            category: "all" as const,
            tags: [],
            likes: img._count.favorites,
            views: img.views,
            downloads: img.downloads,
            author: {
                name: img.project.user.name || img.project.user.email.split("@")[0],
                avatar: img.project.user.avatar,
            },
            isLiked: user ? img.favorites.length > 0 : false,
            width: 400,
            height: 400,
            createdAt: img.createdAt.toISOString(),
        }));

        return NextResponse.json(galleryImages);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      include: {
        project: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
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
      category: "all" as const, // For now, all in one category
      tags: [],
      likes: 0, // Not implemented yet
      views: 0,
      author: {
        name: img.project.user.name || img.project.user.email.split("@")[0],
      },
      width: 400, // Placeholder
      height: 400,
      createdAt: img.createdAt.toISOString(),
    }));

    return NextResponse.json(galleryImages);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

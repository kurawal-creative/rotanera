import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: imageId } = await params;

        // Increment download count
        await prisma.image.update({
            where: {
                id: imageId,
            },
            data: {
                downloads: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking download:", error);
        return NextResponse.json({ error: "Failed to track download" }, { status: 500 });
    }
}

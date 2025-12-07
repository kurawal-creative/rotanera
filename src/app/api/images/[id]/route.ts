import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { createStorageSupabaseClient } from "@/lib/supabase/storage";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const imageId = (await params).id;

        // Find image and check ownership
        const image = await prisma.image.findFirst({
            where: {
                id: imageId,
                project: {
                    userId: user.id,
                },
            },
        });

        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Delete from storage
        const supabase = createStorageSupabaseClient();
        const bucketName = process.env.SUPABASE_STORAGE_BUCKET!;
        const fileName = image.url.split("/").pop(); // Extract filename from URL
        if (fileName) {
            await supabase.storage.from(bucketName).remove([fileName]);
        }

        // Delete from database
        await prisma.image.delete({
            where: { id: imageId },
        });

        return NextResponse.json({ message: "Image deleted" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createStorageSupabaseClient } from "@/lib/supabase/storage";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/supabase/server";

const KURAWAL_URL = process.env.API_URL ?? "";
const KURAWAL_API_KEY = process.env.API_KEY ?? "";

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const prompt = (formData.get("prompt") as string) ?? "";
        const imageEntry = formData.get("image");

        if (!prompt || !imageEntry) {
            return NextResponse.json({ error: "Both `prompt` and `image` are required" }, { status: 400 });
        }

        if (!(imageEntry instanceof File)) {
            return NextResponse.json({ error: "`image` must be a file" }, { status: 400 });
        }

        if (!KURAWAL_URL || !KURAWAL_API_KEY) {
            return NextResponse.json({ error: "Kurawal configuration is missing" }, { status: 500 });
        }

        const payload = new FormData();
        payload.append("image", imageEntry, imageEntry.name || "uploaded.png");
        payload.append("prompt", prompt);

        const response = await axios.post(KURAWAL_URL, payload, {
            headers: {
                "x-api-key": KURAWAL_API_KEY,
            },
            responseType: "arraybuffer",
        });

        // Convert to buffer for upload
        const buffer = Buffer.from(response.data, "binary");

        // Create temporary project
        const project = await prisma.project.create({
            data: {
                name: `Improve-${Date.now()}`,
                userId: user.id,
            },
        });
        const projectId = project.id;

        // Save to database first with placeholder URL
        let savedImage;
        try {
            savedImage = await prisma.image.create({
                data: {
                    url: "uploading", // Placeholder
                    projectId: projectId,
                },
            });
        } catch (dbError) {
            console.error("Error saving to database:", dbError);
            return NextResponse.json({ error: "Failed to save image to database" }, { status: 500 });
        }

        // Upload to Supabase Storage
        const supabase = createStorageSupabaseClient();
        const bucketName = process.env.SUPABASE_STORAGE_BUCKET!;
        const fileName = `improved-${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, buffer, {
            contentType: "image/png",
        });

        if (uploadError) {
            console.error("Error uploading to storage:", uploadError);
            // Rollback: delete record from database if upload fails
            await prisma.image.delete({
                where: { id: savedImage.id },
            });
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;

        // Update database with actual URL
        try {
            await prisma.image.update({
                where: { id: savedImage.id },
                data: { url: imageUrl },
            });
        } catch (updateError) {
            console.error("Error updating database:", updateError);
            // Optional: delete file from storage if update fails
            await supabase.storage.from(bucketName).remove([fileName]);
            return NextResponse.json({ error: "Failed to update image URL" }, { status: 500 });
        }

        return NextResponse.json({ image: imageUrl, id: savedImage.id });
    } catch (error) {
        console.error("Error improving image:", error);
        return NextResponse.json({ error: "Failed to improve image" }, { status: 500 });
    }
}

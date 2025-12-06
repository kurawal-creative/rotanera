import axios from "axios";
import { API_KEY, API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { createStorageSupabaseClient } from "@/lib/supabase/storage";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const prompt = formData.get("prompt") as string;
        const image = formData.get("image") as File;
        const projectId = formData.get("projectId") as string;

        if (!prompt || !image || !projectId) {
            return NextResponse.json({ error: "Prompt, image, and projectId are required" }, { status: 400 });
        }

        const apiFormData = new FormData();
        apiFormData.append("prompt", prompt);
        apiFormData.append("image", image);

        const response = await axios.post(API_URL, apiFormData, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "multipart/form-data",
            },
            responseType: "arraybuffer",
        });

        // Convert to buffer for upload
        const buffer = Buffer.from(response.data, "binary");

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
        const fileName = `generated-${Date.now()}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, buffer, {
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
        console.error("Error generating image:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}

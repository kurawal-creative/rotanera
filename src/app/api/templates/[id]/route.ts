import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const templateId = params.id;
        const body = await request.json();
        const { name, description, image, prompt, tags, isPublic } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        // Check if template belongs to user
        const existingTemplate = await prisma.template.findUnique({
            where: { id: templateId },
        });

        if (!existingTemplate) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        if (existingTemplate.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const template = await prisma.template.update({
            where: { id: templateId },
            data: {
                name,
                description: description || null,
                image: image || null,
                prompt: prompt || null,
                tags: tags || [],
                isPublic: isPublic || false,
            },
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("Error updating template:", error);
        return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const templateId = params.id;

        // Check if template belongs to user
        const existingTemplate = await prisma.template.findUnique({
            where: { id: templateId },
        });

        if (!existingTemplate) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        if (existingTemplate.userId !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.template.delete({
            where: { id: templateId },
        });

        return NextResponse.json({ message: "Template deleted successfully" });
    } catch (error) {
        console.error("Error deleting template:", error);
        return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
    }
}

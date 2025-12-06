import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user's templates
        const myTemplates = await prisma.template.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Get public templates (excluding user's own)
        const publicTemplates = await prisma.template.findMany({
            where: {
                isPublic: true,
                userId: {
                    not: user.id,
                },
            },
            orderBy: {
                popularity: "desc",
            },
        });

        return NextResponse.json({
            myTemplates,
            publicTemplates,
        });
    } catch (error) {
        console.error("Error fetching templates:", error);
        return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, image, prompt, tags, isPublic } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const template = await prisma.template.create({
            data: {
                name,
                description: description || null,
                image: image || null,
                prompt: prompt || null,
                tags: tags || [],
                isPublic: isPublic || false,
                userId: user.id,
            },
        });

        return NextResponse.json(template, { status: 201 });
    } catch (error) {
        console.error("Error creating template:", error);
        return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
    }
}

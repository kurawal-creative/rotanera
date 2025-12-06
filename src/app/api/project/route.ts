import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
        const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10", 10);

        const total = await prisma.project.count({
            where: { userId: user.id },
        });
        const skip = (page - 1) * limit;
        const projects = await prisma.project.findMany({
            where: { userId: user.id },
            include: {
                images: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
            skip,
            take: limit,
        });
        const totalPages = Math.ceil(total / limit);
        return NextResponse.json({
            projects,
            pagination: { total, page, limit, totalPages },
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name } = await request.json();
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const project = await prisma.project.create({
            data: {
                name: name.trim(),
                userId: user.id,
            },
        });

        return NextResponse.json({ id: project.id }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

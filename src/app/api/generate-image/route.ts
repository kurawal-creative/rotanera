import axios from "axios";
import { API_KEY, API_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const image = formData.get("image") as File;

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Prompt and image are required" },
        { status: 400 },
      );
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

    // Convert to base64
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}

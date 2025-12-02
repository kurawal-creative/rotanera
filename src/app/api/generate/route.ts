rotanera\src\app\api\generate\route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const apiResponse = await axios.post(
      "https://yaya.kurawal.site/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}

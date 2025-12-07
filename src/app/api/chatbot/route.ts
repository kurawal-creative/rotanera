// app/api/chatbot/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Debug: Cek env (bisa dihapus nanti)
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing! Check .env.local");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    console.log("Incoming request to /api/chatbot");
    const { message, username } = await request.json();

    if (!message || !username) {
      return NextResponse.json({ error: "Message dan username wajib diisi" }, { status: 400 });
    }

    // System prompt untuk RotaneraBot
    const systemPrompt = `
    Kamu adalah RotaneraBot, asisten pengrajin rotan yang ramah dan intuitive. Jawab pertanyaan user seputar:
    - Sketsa kerajinan rotan.
    - Blueprint anyaman rotan.
    - Cara pakai fitur Rotanera (AI Image Generative Anyaman Rotan).
    
    Selalu jawab dalam bahasa Indonesia yang santai tapi informatif. Gunakan emoji secukupnya biar engaging. Kalau pertanyaan di luar topik, arahkan balik ke /Rotanera.
    
    User ini: ${username}. Mulai percakapan dengan salam personal kalau relevan.
    `;

    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;

    console.log("Generating response with prompt...");

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",  // Fix: Ganti ke model free-tier friendly (quota 15 RPM)
      contents: fullPrompt,
    });

    const reply = response.text;

    console.log("Response generated successfully");

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chatbot:", error.message || error);
    
    // Handle quota error spesifik
    if (error.status === 429) {
      return NextResponse.json(
        { error: "Quota Gemini API habis sementara. Coba lagi besok atau upgrade plan di https://ai.google.dev/pricing" },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Maaf, ada kesalahan saat memproses pesanmu. Coba lagi ya!" },
      { status: 500 }
    );
  }
}
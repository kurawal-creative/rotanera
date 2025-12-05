"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { PaintApp, type PaintAppRef } from "@/components/paint-app";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";

export default function CanvasPage() {
  const { id } = useParams();
  const paintAppRef = useRef<PaintAppRef>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState(
    "ubah gambar ini menjadi desain rotan yang realistis dan indah",
  );

  const handleGenerate = useCallback(async () => {
    const dataUrl = paintAppRef.current?.exportImage();
    if (!dataUrl) {
      alert("Tidak ada gambar di canvas.");
      return;
    }

    setIsProcessing(true);
    try {
      // Convert dataUrl to File
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "canvas.png", { type: "image/png" });

      // Prepare FormData
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image", file);

      // Call API route
      const apiResponse = await axios.post("/api/generate-image", formData);

      const generatedUrl = apiResponse.data.image;
      setGeneratedImages((prev) => [...prev, generatedUrl]);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Gagal menghasilkan gambar. Coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  }, [prompt]);

  const handleReset = useCallback(() => {
    setGeneratedImages([]);
  }, []);

  return (
    <>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Canvas Project</h1>
        <p className="text-neutral-600">ID: {id}</p>

        <PaintApp
          ref={paintAppRef}
          onReset={handleReset}
          width={800}
          height={600}
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-neutral-700"
            >
              Prompt
            </label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              placeholder="Masukkan prompt untuk generate gambar"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isProcessing}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? "Memproses..." : "Generate"}
          </Button>
        </div>

        {isProcessing && (
          <div className="mt-4 text-center">
            <p className="text-neutral-600">Memproses gambar...</p>
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Hasil Generasi</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {generatedImages.map((img, index) => (
                <div
                  key={index}
                  className="relative h-48 overflow-hidden rounded-lg border"
                >
                  <Image
                    src={img}
                    alt={`Generated ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

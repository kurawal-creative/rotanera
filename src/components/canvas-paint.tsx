import { useRef, useCallback, useState } from "react";
import axios from "axios";
import { PaintApp, type PaintAppRef } from "@/components/paint-app";
import Image from "next/image";

export default function Home() {
  const paintRef = useRef<PaintAppRef>(null);
  const [lastExport, setLastExport] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = useCallback(async (dataUrl: string) => {
    setIsProcessing(true);
    try {
      // Convert dataUrl to File
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      // Create form data
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", "di bikin rotan dan realistis 8k");

      // Send to API
      const apiResponse = await axios.post(
        "https://yaya.kurawal.site/generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const resultDataUrl = apiResponse.data.image;
      setProcessedImage(resultDataUrl);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Terjadi kesalahan saat memproses gambar");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleOutput = useCallback(
    async (dataUrl: string) => {
      setLastExport(dataUrl);
      console.log("Image exported:", dataUrl.substring(0, 50) + "...");
      await processImage(dataUrl);
    },
    [processImage],
  );

  const handleReset = useCallback(() => {
    console.log("Canvas has been reset");
    setLastExport(null);
    setProcessedImage(null);
  }, []);

  const handleExternalReset = () => {
    paintRef.current?.resetCanvas();
  };

  const handleExternalExport = useCallback(async () => {
    const dataUrl = paintRef.current?.exportImage();
    if (dataUrl) {
      setLastExport(dataUrl);
      alert("Gambar berhasil di-export! Cek console untuk dataURL.");
      await processImage(dataUrl);
    }
  }, [processImage]);

  return (
    <main className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            🎨 Paint App
          </h1>
          <p className="text-muted-foreground">
            Aplikasi menggambar sederhana mirip Microsoft Paint
          </p>
        </header>

        <PaintApp
          ref={paintRef}
          onOutput={handleOutput}
          onReset={handleReset}
          width={800}
          height={500}
        />

        {/* External Controls Demo */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleExternalReset}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 transition-colors"
          >
            Reset via Ref
          </button>
          <button
            onClick={handleExternalExport}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
          >
            Export via Ref
          </button>
        </div>

        {/* Preview last export */}
        {lastExport && (
          <div className="mt-8 text-center">
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Preview Export Terakhir:
            </h3>
            <Image
              src={lastExport || "/placeholder.svg"}
              alt="Last export preview"
              className="border-border mx-auto max-w-xs rounded-lg border shadow-md"
            />
          </div>
        )}

        {/* Processed image */}
        {isProcessing && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">Memproses gambar...</p>
          </div>
        )}
        {processedImage && (
          <div className="mt-8 text-center">
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Hasil Pemrosesan:
            </h3>
            <Image
              src={processedImage}
              alt="Processed image"
              className="border-border mx-auto max-w-xs rounded-lg border shadow-md"
            />
          </div>
        )}
      </div>
    </main>
  );
}

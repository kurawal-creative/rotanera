"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { PaintApp, type PaintAppRef } from "@/components/paint-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Topbar } from "@/components/app-topbar";
import axios from "axios";
import Image from "next/image";

import { Sparkles, Clock, Download, Loader2, Wand2, Image as ImageIcon } from "lucide-react";

export default function CanvasPage() {
    const { id } = useParams();
    const paintAppRef = useRef<PaintAppRef>(null);
    const [generatedImages, setGeneratedImages] = useState<Array<{ url: string; createdAt: string }>>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prompt, setPrompt] = useState("ubah gambar ini menjadi desain rotan yang realistis dan indah");

    useEffect(() => {
        const fetchProjectImages = async () => {
            try {
                const response = await axios.get(`/api/project/${id}`);
                const images = response.data.project.images
                    .map((img: { url: string; createdAt: string }) => ({
                        url: img.url,
                        createdAt: img.createdAt,
                    }))
                    .sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setGeneratedImages(images);
            } catch (error) {
                console.error("Error fetching project images:", error);
            }
        };
        fetchProjectImages();
    }, [id]);

    const handleGenerate = useCallback(async () => {
        const dataUrl = paintAppRef.current?.exportImage();
        if (!dataUrl) {
            alert("Tidak ada gambar di canvas.");
            return;
        }

        setIsProcessing(true);
        try {
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const file = new File([blob], "canvas.png", { type: "image/png" });

            const formData = new FormData();
            formData.append("prompt", prompt);
            formData.append("image", file);
            formData.append("projectId", id as string);

            const apiResponse = await axios.post("/api/generate-image", formData);

            const generatedUrl = apiResponse.data.image;
            setGeneratedImages((prev) => [{ url: generatedUrl, createdAt: new Date().toISOString() }, ...prev]);
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Gagal menghasilkan gambar. Coba lagi.");
        } finally {
            setIsProcessing(false);
        }
    }, [prompt, id]);

    const handleReset = useCallback(() => {
        // Reset canvas, but keep history
        // setGeneratedImages([]);
    }, []);

    const handleDownloadImage = useCallback((url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "generated-image.png";
        link.click();
    }, []);

    return (
        <>
            <main className="relative w-full">
                <Topbar breadcrumb={[{ label: "Canvas", href: "/canvas" }, { label: `Project ${id}` }]} />

                {/* Gradient background */}
                <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-32 bg-linear-to-b from-purple-50/50 via-transparent to-transparent dark:from-purple-950/20" />

                <div className="relative p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Canvas Studio</h1>
                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                Project ID: <span className="font-mono text-purple-600 dark:text-purple-400">{id}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">
                                <Clock className="h-4 w-4" />
                                Auto-saved
                            </div>
                        </div>
                    </div>

                    {/* Main Layout - Canvas Left, Generations Right */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Canvas and AI Panel */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Canvas */}
                            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <PaintApp ref={paintAppRef} onReset={handleReset} width={800} height={600} />
                            </div>

                            {/* AI Generation Panel */}
                            <div className="rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 to-white p-6 shadow-sm dark:border-purple-900/50 dark:from-purple-950/20 dark:to-neutral-800">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                                        <Wand2 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">AI Generation</h2>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Transform your design with AI</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            Prompt
                                        </label>
                                        <div className="relative">
                                            <Sparkles className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-purple-500" />
                                            <Input id="prompt" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="pl-10 focus:border-purple-500 focus:ring-purple-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400" placeholder="Describe your desired transformation..." disabled={isProcessing} />
                                        </div>
                                    </div>

                                    <Button onClick={handleGenerate} disabled={isProcessing} className="w-full bg-linear-to-r from-purple-600 to-violet-600 py-6 text-base font-semibold shadow-lg transition-all hover:from-purple-700 hover:to-violet-700 hover:shadow-xl disabled:opacity-50">
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Generating Magic...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="mr-2 h-5 w-5" />
                                                Generate with AI
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {isProcessing && (
                                    <div className="mt-4 rounded-lg bg-purple-100 p-4 dark:bg-purple-950/30">
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="h-5 w-5 animate-spin text-purple-600 dark:text-purple-400" />
                                            <div>
                                                <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Processing your image...</p>
                                                <p className="text-xs text-purple-700 dark:text-purple-400">This may take a few moments</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Recent Generations */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Generation History</h2>
                                    </div>
                                    {generatedImages.length > 0 && <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-950/30 dark:text-purple-400">{generatedImages.length}</span>}
                                </div>

                                {generatedImages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-700 dark:bg-neutral-900/50">
                                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950/30">
                                            <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <p className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">No generations yet</p>
                                        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                                            Draw something on the canvas
                                            <br />
                                            and generate with AI
                                        </p>
                                    </div>
                                ) : (
                                    <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
                                        <div className="grid grid-cols-2 gap-3">
                                            {generatedImages.map((img, index) => (
                                                <div key={index} className="group relative aspect-video overflow-hidden rounded-lg border border-neutral-200 bg-linear-to-br from-purple-50 to-violet-100 transition-all hover:border-purple-300 hover:shadow-md dark:border-neutral-700 dark:from-purple-950/20 dark:to-violet-950/20 dark:hover:border-purple-600">
                                                    <Image src={img.url} alt={`Generated ${index + 1}`} fill className="object-cover transition-transform group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                                        <div className="absolute right-1 bottom-1 flex gap-1">
                                                            <Button size="sm" variant="secondary" className="h-6 w-6 rounded-full p-0 shadow-lg" onClick={() => handleDownloadImage(img.url)}>
                                                                <Download className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                        <div className="absolute top-1 left-1">
                                                            <span className="rounded-full bg-white/90 px-1.5 py-0.5 text-xs font-medium text-neutral-900">#{generatedImages.length - index}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

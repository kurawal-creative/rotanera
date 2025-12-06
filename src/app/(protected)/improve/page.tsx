"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/app-topbar";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import Image from "next/image";

import { Upload, Loader2, Zap, Image as ImageIcon } from "lucide-react";

export default function ImprovePage() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [improvedImage, setImprovedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);
    const defaultPrompt = "Improve this rattan furniture design to make it more beautiful, realistic, and high-quality";

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
                setImprovedImage(null);
                setInfoMessage(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleImprove = useCallback(async () => {
        if (!uploadedImage) {
            alert("Please upload an image first.");
            return;
        }

        setIsProcessing(true);
        setInfoMessage("Improving your design…");
        try {
            const response = await fetch(uploadedImage);
            const blob = await response.blob();
            const file = new File([blob], "uploaded.png", { type: "image/png" });

            const geminiForm = new FormData();
            geminiForm.append("image", file);
            geminiForm.append("prompt", defaultPrompt);

            const geminiResponse = await axios.post("/api/improve-gemini", geminiForm);

            if (geminiResponse.data.image) {
                setImprovedImage(geminiResponse.data.image);
                setInfoMessage("Design improved successfully.");
            } else {
                setInfoMessage("Failed to improve image. Try again.");
            }
        } catch (error) {
            console.error("Error improving image:", error);
            setInfoMessage("Failed to improve image. Try again.");
        } finally {
            setIsProcessing(false);
        }
    }, [uploadedImage]);

    return (
        <>
            <main className="relative w-full">
                <Topbar breadcrumb={[{ label: "Improve Design" }]} />

                <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-32 bg-linear-to-b from-purple-50/50 via-transparent to-transparent dark:from-purple-950/20" />

                <div className="relative p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Improve Design</h1>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Upload a rattan design and let AI enhance it for you</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                        <Upload className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Upload Image</h2>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Select a rattan furniture photo for improvement</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                                        <label htmlFor="image-upload">
                                            <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/20">
                                                {uploadedImage ? (
                                                    <div className="text-center">
                                                        <ImageIcon className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400" />
                                                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Image ready</p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <Upload className="mx-auto h-8 w-8 text-neutral-400 dark:text-neutral-500" />
                                                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Click to upload</p>
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {uploadedImage && (
                                <Dialog>
                                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                                <ImageIcon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Uploaded Image Preview</h2>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Click to view full size</p>
                                            </div>
                                        </div>
                                        <DialogTrigger asChild>
                                            <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                                                <Image src={uploadedImage} alt="Uploaded" fill className="object-cover" />
                                            </div>
                                        </DialogTrigger>
                                    </div>
                                    <DialogContent className="max-w-4xl">
                                        <DialogTitle>Uploaded Image Preview</DialogTitle>
                                        <div className="relative h-[80vh] w-full">
                                            <Image src={uploadedImage} alt="Uploaded Preview" fill className="object-contain" />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}

                            <div className="rounded-2xl border border-green-200 bg-linear-to-br from-green-50 to-white p-6 shadow-sm dark:border-green-900/50 dark:from-green-950/20 dark:to-neutral-800">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                                        <Zap className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Improve Settings</h2>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">AI will enhance your design automatically</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button onClick={handleImprove} disabled={isProcessing || !uploadedImage} className="w-full bg-linear-to-r from-green-600 to-emerald-600 py-6 text-base font-semibold shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50">
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Improving Design...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="mr-2 h-5 w-5" />
                                                Improve Design
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {infoMessage && <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-900 dark:bg-green-900/20 dark:text-green-200">{infoMessage}</div>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                                        <ImageIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Improved Result</h2>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Your refreshed rattan design</p>
                                    </div>
                                </div>

                                {improvedImage ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                                                <Image src={improvedImage} alt="Improved" fill className="object-cover" />
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl">
                                            <DialogTitle>Improved Image Preview</DialogTitle>
                                            <div className="relative h-[80vh] w-full">
                                                <Image src={improvedImage} alt="Improved Preview" fill className="object-contain" />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                                        <div className="text-center">
                                            <ImageIcon className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-500" />
                                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Improved image will appear here</p>
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

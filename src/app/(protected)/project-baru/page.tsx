"use client";

import { Topbar } from "@/components/app-topbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectBaruPage() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleBuat = async () => {
        if (!name.trim()) {
            toast.warning("Nama project belum diisi!");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("/api/project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim() }),
            });
            if (!response.ok) {
                throw new Error("Failed to create project");
            }
            const data = await response.json();
            router.push(`/canvas/${data.id}`);
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Gagal membuat project. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="relative w-full">
                <Topbar breadcrumb={[{ label: "Project" }]} />

                <div className="relative p-2">
                    <div className="mx-auto max-w-2xl p-4">
                        <div className="rounded-xl border dark:border-neutral-700 dark:bg-neutral-800/50">
                            <div className="border-b p-6 dark:border-neutral-700">
                                <h1 className="mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-100">Buat Project Baru</h1>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">Project baru kamu akan di tampilkan pada galeri dan menjadi reverensi bagi banyak pengrajin rotan di luar sana</p>
                            </div>
                            <div className="px-6 py-4">
                                <label className="mb-2 block text-sm text-neutral-700 dark:text-neutral-300">Nama Project</label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama project yang akan di buat" className="dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
                            </div>

                            <div className="border-t px-6 py-2 dark:border-neutral-700">
                                <div className="flex justify-end">
                                    <Button onClick={handleBuat} disabled={loading} className="bg-purp hover:bg-purp-darker transition">
                                        {loading ? "Membuat..." : "Buat"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

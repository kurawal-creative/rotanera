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
                        <div className="rounded-xl border">
                            <div className="border-b p-6">
                                <h1 className="mb-2 text-lg font-semibold text-neutral-800">Buat Project Baru</h1>
                                <p className="text-sm text-neutral-600">Project baru kamu akan di tampilkan pada galeri dan menjadi reverensi bagi banyak pengrajin rotan di luar sana</p>
                            </div>
                            <div className="px-6 py-4">
                                <label className="mb-2 block text-sm text-neutral-700">Nama Project</label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama project yang akan di buat" />
                            </div>

                            <div className="border-t px-6 py-2">
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

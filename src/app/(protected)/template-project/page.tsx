"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/app-topbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, Loader2, Image as ImageIcon, Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

type Template = {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    prompt: string | null;
    tags: string[];
    popularity: number;
    usageCount: number;
    isPublic: boolean;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
};

export default function TemplateProjectPage() {
    const [myTemplates, setMyTemplates] = useState<Template[]>([]);
    const [publicTemplates, setPublicTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        prompt: "",
        tags: "",
        isPublic: false,
    });

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/templates");
            setMyTemplates(response.data.myTemplates || []);
            setPublicTemplates(response.data.publicTemplates || []);
        } catch (error) {
            console.error("Error fetching templates:", error);
            toast.error("Gagal memuat template");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!formData.name.trim()) {
            toast.error("Nama template harus diisi");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post("/api/templates", {
                name: formData.name,
                description: formData.description || null,
                image: formData.image || null,
                prompt: formData.prompt || null,
                tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
                isPublic: formData.isPublic,
            });
            toast.success("Template berhasil dibuat");
            setIsCreateOpen(false);
            resetForm();
            fetchTemplates();
        } catch (error) {
            console.error("Error creating template:", error);
            toast.error("Gagal membuat template");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!editingTemplate) return;
        if (!formData.name.trim()) {
            toast.error("Nama template harus diisi");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.put(`/api/templates/${editingTemplate.id}`, {
                name: formData.name,
                description: formData.description || null,
                image: formData.image || null,
                prompt: formData.prompt || null,
                tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
                isPublic: formData.isPublic,
            });
            toast.success("Template berhasil diperbarui");
            setIsEditOpen(false);
            setEditingTemplate(null);
            resetForm();
            fetchTemplates();
        } catch (error) {
            console.error("Error updating template:", error);
            toast.error("Gagal memperbarui template");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus template ini?")) return;

        try {
            await axios.delete(`/api/templates/${id}`);
            toast.success("Template berhasil dihapus");
            fetchTemplates();
        } catch (error) {
            console.error("Error deleting template:", error);
            toast.error("Gagal menghapus template");
        }
    };

    const openEditDialog = (template: Template) => {
        setEditingTemplate(template);
        setFormData({
            name: template.name,
            description: template.description || "",
            image: template.image || "",
            prompt: template.prompt || "",
            tags: template.tags.join(", "),
            isPublic: template.isPublic,
        });
        setIsEditOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            image: "",
            prompt: "",
            tags: "",
            isPublic: false,
        });
    };

    const filterTemplates = (templates: Template[]) => {
        if (!searchQuery) return templates;
        return templates.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description?.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    };

    const TemplateCard = ({ template, showActions = false }: { template: Template; showActions?: boolean }) => (
        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30">
                {template.image ? (
                    <Image src={template.image} alt={template.name} fill className="object-cover" />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                    </div>
                )}
                {showActions && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => openEditDialog(template)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(template.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">{template.name}</h3>
                {template.description && <p className="mb-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{template.description}</p>}
                <div className="mb-3 flex flex-wrap gap-1.5">
                    {template.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-600 dark:bg-purple-950/30 dark:text-purple-400">
                            #{tag}
                        </span>
                    ))}
                    {template.tags.length > 3 && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">+{template.tags.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {template.usageCount}x digunakan
                    </div>
                    <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {template.popularity}
                    </div>
                </div>
            </div>
        </div>
    );

    const FormDialog = ({ open, onOpenChange, onSubmit, title, description }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: () => void; title: string; description: string }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="mb-2">
                            Nama Template *
                        </Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Kursi Rotan Modern" />
                    </div>
                    <div>
                        <Label htmlFor="description" className="mb-2">
                            Deskripsi
                        </Label>
                        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi singkat tentang template..." rows={3} />
                    </div>
                    <div>
                        <Label htmlFor="image" className="mb-2">
                            URL Gambar
                        </Label>
                        <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                        <Label htmlFor="prompt" className="mb-2">
                            Prompt AI
                        </Label>
                        <Textarea id="prompt" value={formData.prompt} onChange={(e) => setFormData({ ...formData, prompt: e.target.value })} placeholder="Prompt untuk generate gambar dengan AI..." rows={3} />
                    </div>
                    <div>
                        <Label htmlFor="tags" className="mb-2">
                            Tags (pisahkan dengan koma)
                        </Label>
                        <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="modern, minimalis, rotan" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="isPublic" checked={formData.isPublic} onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked === true })} />
                        <Label htmlFor="isPublic">Jadikan template publik</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                        Batal
                    </Button>
                    <Button onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            "Simpan"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <>
            <main className="relative w-full">
                <Topbar breadcrumb={[{ label: "Template Project" }]} />

                <div className="pointer-events-none absolute inset-x-0 top-13 -z-10 h-32 bg-linear-to-b from-purple-50/50 via-transparent to-transparent dark:from-purple-950/20" />

                <div className="relative p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Template Furniture Rotan</h1>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Kelola template pribadi Anda atau jelajahi template dari komunitas</p>
                    </div>

                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1 sm:max-w-md">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input type="text" placeholder="Cari template..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Buat Template
                                </Button>
                            </DialogTrigger>
                        </Dialog>
                    </div>

                    <Tabs defaultValue="my" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="my">Template Saya</TabsTrigger>
                            <TabsTrigger value="community">Template Komunitas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="my" className="mt-6">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="mb-4 h-12 w-12 animate-spin text-purple-600" />
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Memuat template...</p>
                                </div>
                            ) : filterTemplates(myTemplates).length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-700 dark:bg-neutral-900/50">
                                    <ImageIcon className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                                    <h3 className="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">Belum ada template</h3>
                                    <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">Mulai dengan membuat template pertama Anda</p>
                                    <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Buat Template
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filterTemplates(myTemplates).map((template) => (
                                        <TemplateCard key={template.id} template={template} showActions={true} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="community" className="mt-6">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="mb-4 h-12 w-12 animate-spin text-purple-600" />
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Memuat template...</p>
                                </div>
                            ) : filterTemplates(publicTemplates).length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-700 dark:bg-neutral-900/50">
                                    <ImageIcon className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                                    <h3 className="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">Tidak ada template komunitas</h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Belum ada template publik yang tersedia</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filterTemplates(publicTemplates).map((template) => (
                                        <TemplateCard key={template.id} template={template} showActions={false} />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <FormDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} onSubmit={handleCreate} title="Buat Template Baru" description="Isi informasi untuk membuat template furniture rotan Anda" />
            <FormDialog open={isEditOpen} onOpenChange={setIsEditOpen} onSubmit={handleEdit} title="Edit Template" description="Perbarui informasi template furniture rotan Anda" />
        </>
    );
}

"use client";

import { Topbar } from "@/components/app-topbar";
import { StatisticsCards } from "@/components/profile-page/statistics-cards";
import { RecentActivity } from "@/components/profile-page/recent-activity";
import { useAuth } from "@/hooks/use-auth";
import { useStatistics } from "@/hooks/use-statistics";
import { useTheme } from "@/hooks/use-theme";
import { User, Mail, Calendar, Settings, Edit2, Camera, Palette } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const { statistics } = useStatistics();
    const { isDark, setTheme } = useTheme();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Handle dark mode toggle
    const handleDarkModeToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    const handleEditProfile = () => {
        setEditedName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "");
        setIsEditDialogOpen(true);
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        setIsEditDialogOpen(false);
        // In a real app, you would update the user profile here
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600 dark:border-purple-900 dark:border-t-purple-400" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Memuat profil...</p>
                </div>
            </div>
        );
    }

    const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
    const userEmail = user?.email || "";
    const joinDate = user?.created_at ? new Date(user.created_at) : new Date();

    return (
        <>
            <main className="relative w-full bg-white dark:bg-neutral-900">
                <Topbar breadcrumb={[{ label: "Profil" }]} />

                {/* Gradient background */}
                <div className="via-purple-25 pointer-events-none absolute inset-x-0 top-13 -z-10 h-48 bg-linear-to-b from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent" />

                <div className="relative p-6">
                    {/* Profile Header Card */}
                    <div className="mb-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-800">
                        {/* Cover gradient */}
                        <div className="h-32 bg-linear-to-r from-purple-500 via-violet-500 to-pink-500" />

                        <div className="relative px-6 pb-6">
                            {/* Avatar */}
                            <div className="relative -mt-16 mb-4 flex items-end justify-between">
                                <div className="group relative">
                                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-linear-to-br from-purple-400 to-pink-400 shadow-lg dark:border-neutral-800">
                                        {user?.user_metadata?.avatar_url ? (
                                            <Image src={user.user_metadata.avatar_url} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <User className="h-16 w-16 text-white" />
                                            </div>
                                        )}
                                        {/* Upload overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Camera className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <button className="absolute right-2 bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition hover:bg-purple-700">
                                        <Camera className="h-5 w-5" />
                                    </button>
                                </div>

                                <Button onClick={handleEditProfile} variant="outline" className="gap-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                                    <Edit2 className="h-4 w-4" />
                                    Edit Profil
                                </Button>
                            </div>

                            {/* User Info */}
                            <div>
                                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{userName}</h1>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                        <span>{userEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                        <span>Bergabung {format(joinDate, "MMMM yyyy", { locale: localeId })}</span>
                                    </div>
                                </div>

                                {/* Status Badge Only */}
                                <div className="mt-4 flex gap-6">
                                    <div className="rounded-lg bg-purple-50 px-4 py-2 dark:bg-purple-900/30">
                                        <p className="text-xs text-purple-600 dark:text-purple-400">Status</p>
                                        <p className="text-sm font-semibold text-purple-900 dark:text-purple-300">Active Member</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Layout */}
                    <Tabs defaultValue="statistics" className="w-full">
                        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 bg-neutral-100 dark:bg-neutral-800">
                            <TabsTrigger value="statistics" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                                <Settings className="h-4 w-4" />
                                Statistik
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-neutral-900 dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-white">
                                <Settings className="h-4 w-4" />
                                Pengaturan
                            </TabsTrigger>
                        </TabsList>

                        {/* Statistics Tab */}
                        <TabsContent value="statistics">
                            <div className="space-y-6">
                                {/* Stats Cards */}
                                {statistics && <StatisticsCards statistics={statistics} />}

                                {/* Two Column Layout */}
                                <div className="grid gap-6 lg:grid-cols-2">
                                    {/* Recent Activity */}
                                    <div className="lg:col-span-1">{statistics && <RecentActivity statistics={statistics} />}</div>

                                    {/* Account Info */}
                                    <div className="lg:col-span-1">
                                        <div className="rounded-xl border bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Informasi Akun</h3>

                                            <div className="mt-4 space-y-4">
                                                {/* Join Date */}
                                                <div className="flex items-center gap-3 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 p-4 dark:from-blue-950/30 dark:to-cyan-950/30">
                                                    <div className="shrink-0">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Bergabung sejak</p>
                                                        <p className="mt-0.5 text-sm font-semibold text-neutral-900 dark:text-white">
                                                            {format(joinDate, "dd MMMM yyyy", {
                                                                locale: localeId,
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Last Active */}
                                                <div className="flex items-center gap-3 rounded-lg bg-linear-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-950/30 dark:to-pink-950/30">
                                                    <div className="shrink-0">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                                                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Terakhir aktif</p>
                                                        <p className="mt-0.5 text-sm font-semibold text-neutral-900 dark:text-white">
                                                            {format(new Date(), "dd MMM yyyy, HH:mm", {
                                                                locale: localeId,
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* Appearance Settings */}
                                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                                            <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Tampilan</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Sesuaikan tampilan aplikasi</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-lg border p-4 dark:border-neutral-700">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">Dark Mode</p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Gunakan tema gelap</p>
                                            </div>
                                            <Switch checked={isDark} onCheckedChange={handleDarkModeToggle} />
                                        </div>
                                    </div>
                                </div>

                                {/* Account Settings */}
                                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                                            <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Akun</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Informasi akun Anda</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 rounded-lg border p-4 dark:border-neutral-700">
                                        <div>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">User ID</p>
                                            <p className="font-mono text-sm text-neutral-900 dark:text-neutral-300">{user?.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Email</p>
                                            <p className="text-sm text-neutral-900 dark:text-neutral-300">{userEmail}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Email Verified</p>
                                            <p className="text-sm text-neutral-900 dark:text-neutral-300">{user?.email_confirmed_at ? <span className="text-green-600 dark:text-green-400">✓ Verified</span> : <span className="text-orange-600 dark:text-orange-400">⚠ Not verified</span>}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Edit Profile Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                    <DialogHeader>
                        <DialogTitle className="dark:text-white">Edit Profil</DialogTitle>
                        <DialogDescription className="dark:text-neutral-400">Ubah informasi profil Anda di sini. Klik simpan untuk menyimpan perubahan.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="dark:text-neutral-300">
                                Nama Lengkap
                            </Label>
                            <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="Masukkan nama lengkap" className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="dark:text-neutral-300">
                                Email
                            </Label>
                            <Input id="email" value={userEmail} disabled className="bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-400" />
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Email tidak dapat diubah</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio" className="dark:text-neutral-300">
                                Bio
                            </Label>
                            <textarea id="bio" className="min-h-20 w-full rounded-lg border border-neutral-300 p-2 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-purple-400" placeholder="Ceritakan tentang diri Anda..." />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSaving} className="dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                            Batal
                        </Button>
                        <Button onClick={handleSaveProfile} disabled={isSaving} className="dark:bg-purple-600 dark:hover:bg-purple-700">
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

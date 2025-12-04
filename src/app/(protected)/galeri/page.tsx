"use client";

import { Topbar } from "@/components/app-topbar";

export default function KoleksiDashboardPage() {
  return (
    <>
      <main className="relative w-full">
        <Topbar breadcrumb={[{ label: "Koleksi" }]} />
        <div></div>
      </main>
    </>
  );
}

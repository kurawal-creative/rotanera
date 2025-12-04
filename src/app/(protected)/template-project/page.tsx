import { Topbar } from "@/components/app-topbar";

export default function TemplateProjectDashboardPage() {
  return (
    <>
      <main className="relative w-full">
        <Topbar breadcrumb={[{ label: "Template Project" }]} />
        <div>hello</div>
      </main>
    </>
  );
}

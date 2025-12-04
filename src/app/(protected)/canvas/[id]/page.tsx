"use client";

import { useParams } from "next/navigation";

export default function CanvasPage() {
  const { id } = useParams();
  return (
    <>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Canvas Project</h1>
        <p className="text-neutral-600">ID: {id}</p>
      </main>
    </>
  );
}

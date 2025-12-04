"use client";

import type React from "react";
import Image from "next/image";

import { Check, X, Move } from "lucide-react";
import type { FloatingImage } from "../types";

interface FloatingImageOverlayProps {
  floatingImage: FloatingImage;
  screenCoords: { x: number; y: number; width: number; height: number };
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (e: React.MouseEvent, corner: string) => void;
  onCommit: () => void;
  onCancel: () => void;
}

export function FloatingImageOverlay({
  floatingImage,
  screenCoords,
  isDragging,
  onMouseDown,
  onResizeMouseDown,
  onCommit,
  onCancel,
}: FloatingImageOverlayProps) {
  return (
    <>
      {/* Image container */}
      <div
        style={{
          position: "absolute",
          left: screenCoords.x,
          top: screenCoords.y,
          width: screenCoords.width,
          height: screenCoords.height,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="border-primary border-2 border-dashed dark:border-blue-400"
        onMouseDown={onMouseDown}
      >
        <Image
          src={floatingImage.src || "/placeholder.svg"}
          alt="Uploaded"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="pointer-events-none object-fill select-none"
          draggable={false}
        />

        {/* Move indicator */}
        <div className="bg-primary/80 text-primary-foreground pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 sm:p-2 dark:bg-blue-500/80 dark:text-white">
          <Move className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>

        {/* Resize handles */}
        {["nw", "ne", "sw", "se"].map((corner) => (
          <div
            key={corner}
            className="bg-primary border-primary-foreground absolute h-3 w-3 rounded-sm border-2 sm:h-4 sm:w-4 dark:border-white dark:bg-blue-500"
            style={{
              cursor: `${corner}-resize`,
              ...(corner.includes("n") ? { top: -6 } : { bottom: -6 }),
              ...(corner.includes("w") ? { left: -6 } : { right: -6 }),
            }}
            onMouseDown={(e) => onResizeMouseDown(e, corner)}
          />
        ))}
      </div>

      {/* Control buttons */}
      <div
        className="bg-card border-border absolute flex gap-1.5 rounded-lg border p-1.5 shadow-lg sm:gap-2 sm:p-2 dark:border-zinc-600 dark:bg-zinc-800"
        style={{
          left: screenCoords.x + screenCoords.width / 2,
          top: screenCoords.y + screenCoords.height + 12,
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={onCommit}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
          title="Terapkan (Enter)"
        >
          <Check className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Terapkan</span>
        </button>
        <button
          onClick={onCancel}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          title="Batal (Esc)"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Batal</span>
        </button>
      </div>
    </>
  );
}

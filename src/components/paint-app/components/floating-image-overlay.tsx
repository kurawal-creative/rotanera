"use client"

import type React from "react"

import { Check, X, Move } from "lucide-react"
import type { FloatingImage } from "../types"

interface FloatingImageOverlayProps {
  floatingImage: FloatingImage
  screenCoords: { x: number; y: number; width: number; height: number }
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onResizeMouseDown: (e: React.MouseEvent, corner: string) => void
  onCommit: () => void
  onCancel: () => void
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
        className="border-2 border-dashed border-primary dark:border-blue-400"
        onMouseDown={onMouseDown}
      >
        <img
          src={floatingImage.src || "/placeholder.svg"}
          alt="Uploaded"
          className="w-full h-full object-fill pointer-events-none select-none"
          draggable={false}
        />

        {/* Move indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/80 dark:bg-blue-500/80 text-primary-foreground dark:text-white rounded-full p-1.5 sm:p-2 pointer-events-none">
          <Move className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>

        {/* Resize handles */}
        {["nw", "ne", "sw", "se"].map((corner) => (
          <div
            key={corner}
            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-primary dark:bg-blue-500 border-2 border-primary-foreground dark:border-white rounded-sm"
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
        className="absolute flex gap-1.5 sm:gap-2 bg-card dark:bg-zinc-800 border border-border dark:border-zinc-600 rounded-lg shadow-lg p-1.5 sm:p-2"
        style={{
          left: screenCoords.x + screenCoords.width / 2,
          top: screenCoords.y + screenCoords.height + 12,
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={onCommit}
          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-primary dark:bg-blue-600 text-primary-foreground dark:text-white rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 dark:hover:bg-blue-700 transition-colors"
          title="Terapkan (Enter)"
        >
          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Terapkan</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-destructive dark:bg-red-600 text-destructive-foreground dark:text-white rounded-md text-xs sm:text-sm font-medium hover:bg-destructive/90 dark:hover:bg-red-700 transition-colors"
          title="Batal (Esc)"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Batal</span>
        </button>
      </div>
    </>
  )
}

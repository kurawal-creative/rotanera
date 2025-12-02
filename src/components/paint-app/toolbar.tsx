"use client"

import type React from "react"
import { type ToolType, type CanvasRatio, DEFAULT_TOOLS, CANVAS_RATIOS } from "./types"
import { Pencil, Minus, Square, Circle, Type, Eraser, Undo2, Redo2, Trash2, Upload, Download } from "lucide-react"

interface ToolbarProps {
  activeTool: ToolType
  onToolChange: (tool: ToolType) => void
  color: string
  onColorChange: (color: string) => void
  lineWidth: number
  onLineWidthChange: (width: number) => void
  fontSize: number
  onFontSizeChange: (size: number) => void
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onUploadClick: () => void
  onExport: () => void
  availableTools: ToolType[]
  disabled?: boolean
  canvasRatio: CanvasRatio
  onCanvasRatioChange: (ratio: CanvasRatio) => void
}

const toolIcons: Record<ToolType, React.ReactNode> = {
  pencil: <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />,
  line: <Minus className="w-4 h-4 sm:w-5 sm:h-5" />,
  rectangle: <Square className="w-4 h-4 sm:w-5 sm:h-5" />,
  circle: <Circle className="w-4 h-4 sm:w-5 sm:h-5" />,
  text: <Type className="w-4 h-4 sm:w-5 sm:h-5" />,
  eraser: <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />,
}

const toolLabels: Record<ToolType, string> = {
  pencil: "Pensil",
  line: "Garis",
  rectangle: "Persegi",
  circle: "Lingkaran",
  text: "Teks",
  eraser: "Penghapus",
}

export function Toolbar({
  activeTool,
  onToolChange,
  color,
  onColorChange,
  lineWidth,
  onLineWidthChange,
  fontSize,
  onFontSizeChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onUploadClick,
  onExport,
  availableTools,
  disabled = false,
  canvasRatio,
  onCanvasRatioChange,
}: ToolbarProps) {
  const filteredTools = DEFAULT_TOOLS.filter((tool) => availableTools.includes(tool))

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 p-2 sm:p-3 pr-12 bg-secondary/50 dark:bg-zinc-800/50 border-b border-border dark:border-zinc-700 rounded-t-lg transition-opacity ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Drawing Tools */}
      <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-background dark:bg-zinc-800 rounded-md border border-border dark:border-zinc-600">
        {filteredTools.map((tool) => (
          <button
            key={tool}
            onClick={() => onToolChange(tool)}
            disabled={disabled}
            className={`p-1.5 sm:p-2 rounded transition-colors ${
              activeTool === tool
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent dark:hover:bg-zinc-700 text-foreground dark:text-zinc-200"
            }`}
            title={toolLabels[tool]}
            type="button"
          >
            {toolIcons[tool]}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-border dark:bg-zinc-600 hidden sm:block" />

      {/* Color Picker */}
      <div className="flex items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 hidden md:block">Warna:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          disabled={disabled}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded cursor-pointer border border-border dark:border-zinc-600"
          title="Pilih warna"
        />
      </div>

      {/* Line Width */}
      <div className="flex items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 hidden md:block">Ukuran:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => onLineWidthChange(Number(e.target.value))}
          disabled={disabled}
          className="w-12 sm:w-20 accent-primary"
          title={`Ketebalan: ${lineWidth}px`}
        />
        <span className="text-xs text-muted-foreground dark:text-zinc-400 w-4 sm:w-5">{lineWidth}</span>
      </div>

      {/* Font Size (only when text tool is active) */}
      {activeTool === "text" && (
        <div className="flex items-center gap-1 sm:gap-2">
          <label className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 hidden md:block">Font:</label>
          <input
            type="number"
            min="8"
            max="72"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            disabled={disabled}
            className="w-12 sm:w-14 px-1 sm:px-2 py-1 text-xs sm:text-sm border border-border dark:border-zinc-600 rounded bg-background dark:bg-zinc-800 text-foreground dark:text-zinc-200"
            title="Ukuran font"
          />
        </div>
      )}

      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-border dark:bg-zinc-600 hidden sm:block" />

      {/* Canvas Ratio */}
      <div className="flex items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 hidden md:block">Rasio:</label>
        <select
          value={canvasRatio}
          onChange={(e) => onCanvasRatioChange(e.target.value as CanvasRatio)}
          disabled={disabled}
          className="px-1 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm border border-border dark:border-zinc-600 rounded bg-background dark:bg-zinc-800 text-foreground dark:text-zinc-200"
          title="Rasio canvas"
        >
          {Object.entries(CANVAS_RATIOS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-border dark:bg-zinc-600 hidden sm:block" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className="p-1.5 sm:p-2 rounded hover:bg-accent dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-foreground dark:text-zinc-200"
          title="Undo (Ctrl+Z)"
          type="button"
        >
          <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || disabled}
          className="p-1.5 sm:p-2 rounded hover:bg-accent dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-foreground dark:text-zinc-200"
          title="Redo (Ctrl+Y)"
          type="button"
        >
          <Redo2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-border dark:bg-zinc-600 hidden sm:block" />

      {/* Actions */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <button
          onClick={onUploadClick}
          disabled={disabled}
          className="p-1.5 sm:p-2 rounded hover:bg-accent dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-foreground dark:text-zinc-200"
          title="Upload gambar"
          type="button"
        >
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={onExport}
          disabled={disabled}
          className="p-1.5 sm:p-2 rounded hover:bg-accent dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-foreground dark:text-zinc-200"
          title="Export gambar"
          type="button"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={onClear}
          disabled={disabled}
          className="p-1.5 sm:p-2 rounded hover:bg-destructive/20 dark:hover:bg-red-900/30 disabled:opacity-40 disabled:cursor-not-allowed text-destructive dark:text-red-400"
          title="Hapus semua"
          type="button"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}

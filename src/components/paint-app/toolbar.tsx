"use client";

import type React from "react";
import { type ToolType, type CanvasRatio, DEFAULT_TOOLS, CANVAS_RATIOS } from "./types";
import { Pencil, Minus, Square, Circle, Type, Eraser, Undo2, Redo2, Trash2, Upload, Download } from "lucide-react";

interface ToolbarProps {
    activeTool: ToolType;
    onToolChange: (tool: ToolType) => void;
    color: string;
    onColorChange: (color: string) => void;
    lineWidth: number;
    onLineWidthChange: (width: number) => void;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onClear: () => void;
    onUploadClick: () => void;
    onExport: () => void;
    availableTools: ToolType[];
    disabled?: boolean;
    canvasRatio: CanvasRatio;
    onCanvasRatioChange: (ratio: CanvasRatio) => void;
}

const toolIcons: Record<ToolType, React.ReactNode> = {
    pencil: <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />,
    line: <Minus className="h-4 w-4 sm:h-5 sm:w-5" />,
    rectangle: <Square className="h-4 w-4 sm:h-5 sm:w-5" />,
    circle: <Circle className="h-4 w-4 sm:h-5 sm:w-5" />,
    text: <Type className="h-4 w-4 sm:h-5 sm:w-5" />,
    eraser: <Eraser className="h-4 w-4 sm:h-5 sm:w-5" />,
};

const toolLabels: Record<ToolType, string> = {
    pencil: "Pensil",
    line: "Garis",
    rectangle: "Persegi",
    circle: "Lingkaran",
    text: "Teks",
    eraser: "Penghapus",
};

export function Toolbar({ activeTool, onToolChange, color, onColorChange, lineWidth, onLineWidthChange, fontSize, onFontSizeChange, canUndo, canRedo, onUndo, onRedo, onClear, onUploadClick, onExport, availableTools, disabled = false, canvasRatio, onCanvasRatioChange }: ToolbarProps) {
    const filteredTools = DEFAULT_TOOLS.filter((tool) => availableTools.includes(tool));

    return (
        <div className={`flex flex-wrap items-center gap-1.5 rounded-t-lg border-b border-purple-200 bg-linear-to-r from-purple-50 to-violet-50 p-2 pr-12 transition-opacity sm:gap-2 sm:p-3 dark:border-neutral-700 dark:bg-neutral-800 dark:from-neutral-800 dark:to-neutral-800 ${disabled ? "pointer-events-none opacity-50" : ""}`}>
            {/* Drawing Tools */}
            <div className="flex items-center gap-0.5 rounded-lg border border-purple-200 bg-white p-0.5 shadow-sm sm:gap-1 sm:p-1 dark:border-neutral-600 dark:bg-neutral-900">
                {filteredTools.map((tool) => (
                    <button key={tool} onClick={() => onToolChange(tool)} disabled={disabled} className={`rounded-md p-1.5 transition-all sm:p-2 ${activeTool === tool ? "bg-linear-to-r from-purple-600 to-violet-600 text-white shadow-md" : "text-neutral-700 hover:bg-purple-100 dark:text-neutral-200 dark:hover:bg-neutral-700"}`} title={toolLabels[tool]} type="button">
                        {toolIcons[tool]}
                    </button>
                ))}
            </div>

            {/* Separator */}
            <div className="hidden h-6 w-px bg-purple-200 sm:block sm:h-8 dark:bg-neutral-600" />

            {/* Color Picker */}
            <div className="flex items-center gap-1 sm:gap-2">
                <label className="hidden text-xs font-medium text-purple-700 sm:text-sm md:block dark:text-neutral-300">Warna:</label>
                <input type="color" value={color} onChange={(e) => onColorChange(e.target.value)} disabled={disabled} className="h-7 w-7 cursor-pointer rounded-lg border-2 border-purple-200 shadow-sm sm:h-8 sm:w-8 dark:border-neutral-600 dark:bg-neutral-900" title="Pilih warna" />
            </div>

            {/* Line Width */}
            <div className="flex items-center gap-1 sm:gap-2">
                <label className="hidden text-xs font-medium text-purple-700 sm:text-sm md:block dark:text-neutral-300">Ukuran:</label>
                <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => onLineWidthChange(Number(e.target.value))} disabled={disabled} className="w-12 accent-purple-600 sm:w-20 dark:accent-purple-400" title={`Ketebalan: ${lineWidth}px`} />
                <span className="w-4 text-xs font-medium text-purple-600 sm:w-5 dark:text-neutral-300">{lineWidth}</span>
            </div>

            {/* Font Size (only when text tool is active) */}
            {activeTool === "text" && (
                <div className="flex items-center gap-1 sm:gap-2">
                    <label className="hidden text-xs font-medium text-purple-700 sm:text-sm md:block dark:text-neutral-300">Font:</label>
                    <input
                        type="number"
                        min="8"
                        max="72"
                        value={fontSize}
                        onChange={(e) => onFontSizeChange(Number(e.target.value))}
                        disabled={disabled}
                        className="w-12 rounded-lg border border-purple-200 bg-white px-1 py-1 text-xs text-neutral-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none sm:w-14 sm:px-2 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:border-purple-400 dark:focus:ring-purple-400"
                        title="Ukuran font"
                    />
                </div>
            )}

            {/* Separator */}
            <div className="hidden h-6 w-px bg-purple-200 sm:block sm:h-8 dark:bg-neutral-600" />

            {/* Canvas Ratio */}
            <div className="flex items-center gap-1 sm:gap-2">
                <label className="hidden text-xs font-medium text-purple-700 sm:text-sm md:block dark:text-neutral-300">Rasio:</label>
                <select
                    value={canvasRatio}
                    onChange={(e) => onCanvasRatioChange(e.target.value as CanvasRatio)}
                    disabled={disabled}
                    className="rounded-lg border border-purple-200 bg-white px-1 py-1 text-xs text-neutral-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none sm:px-2 sm:py-1.5 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:border-purple-400 dark:focus:ring-purple-400"
                    title="Rasio canvas"
                >
                    {Object.entries(CANVAS_RATIOS).map(([key, { label }]) => (
                        <option key={key} value={key} className="dark:bg-neutral-900 dark:text-neutral-200">
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Separator */}
            <div className="hidden h-6 w-px bg-purple-200 sm:block sm:h-8 dark:bg-neutral-600" />

            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5 sm:gap-1">
                <button onClick={onUndo} disabled={!canUndo || disabled} className="rounded-md p-1.5 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:disabled:text-neutral-500" title="Undo (Ctrl+Z)" type="button">
                    <Undo2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button onClick={onRedo} disabled={!canRedo || disabled} className="rounded-md p-1.5 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:disabled:text-neutral-500" title="Redo (Ctrl+Y)" type="button">
                    <Redo2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>

            {/* Separator */}
            <div className="hidden h-6 w-px bg-purple-200 sm:block sm:h-8 dark:bg-neutral-600" />

            {/* Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1">
                <button onClick={onUploadClick} disabled={disabled} className="rounded-md p-1.5 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2 dark:text-neutral-200 dark:hover:bg-neutral-700" title="Upload gambar" type="button">
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button onClick={onExport} disabled={disabled} className="rounded-md p-1.5 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2 dark:text-neutral-200 dark:hover:bg-neutral-700" title="Export gambar" type="button">
                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button onClick={onClear} disabled={disabled} className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2 dark:text-red-400 dark:hover:bg-red-950/30" title="Hapus semua" type="button">
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
            </div>
        </div>
    );
}

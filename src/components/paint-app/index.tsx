"use client";

import {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Toolbar } from "./toolbar";
import { Canvas, type CanvasRef } from "./canvas";
import { Upload } from "./upload";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  type PaintAppProps,
  type PaintAppRef,
  type ToolType,
  type FloatingImage,
  type CanvasRatio,
  DEFAULT_TOOLS,
  CANVAS_RATIOS,
} from "./types";

export const PaintApp = forwardRef<PaintAppRef, PaintAppProps>(
  function PaintApp(
    { onOutput, initialImage, width, height, tools = DEFAULT_TOOLS, onReset },
    ref,
  ) {
    const canvasRef = useRef<CanvasRef>(null);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [canvasRatio, setCanvasRatio] = useState<CanvasRatio>("16:9");
    const [canvasSize, setCanvasSize] = useState(() => {
      if (width && height) {
        return { width, height };
      }
      const defaultRatio = CANVAS_RATIOS["16:9"];
      return {
        width: defaultRatio.displayWidth,
        height: defaultRatio.displayHeight,
      };
    });

    const [activeTool, setActiveTool] = useState<ToolType>("pencil");
    const [color, setColor] = useState("#000000");
    const [lineWidth, setLineWidth] = useState(3);
    const [fontSize, setFontSize] = useState(16);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [floatingImage, setFloatingImage] = useState<FloatingImage | null>(
      null,
    );
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleCanvasRatioChange = useCallback((ratio: CanvasRatio) => {
      setCanvasRatio(ratio);
      const ratioConfig = CANVAS_RATIOS[ratio];
      setCanvasSize({
        width: ratioConfig.displayWidth,
        height: ratioConfig.displayHeight,
      });
      setFloatingImage(null);
    }, []);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
    }, []);

    const toggleFullscreen = useCallback(async () => {
      if (!containerRef.current) return;

      try {
        if (!document.fullscreenElement) {
          await containerRef.current.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }, []);

    const handleHistoryChange = useCallback((undo: boolean, redo: boolean) => {
      setCanUndo(undo);
      setCanRedo(redo);
    }, []);

    const handleUndo = useCallback(() => {
      canvasRef.current?.undo?.();
    }, []);

    const handleRedo = useCallback(() => {
      canvasRef.current?.redo?.();
    }, []);

    const handleClear = useCallback(() => {
      setFloatingImage(null);
      canvasRef.current?.resetCanvas();
      onReset?.();
    }, [onReset]);

    const handleExport = useCallback(() => {
      const dataUrl = canvasRef.current?.exportImage();
      if (dataUrl) {
        onOutput?.(dataUrl);
        const link = document.createElement("a");
        const ratioConfig = CANVAS_RATIOS[canvasRatio];
        link.download = `paint-${ratioConfig.exportWidth}x${ratioConfig.exportHeight}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    }, [onOutput, canvasRatio]);

    const handleUploadClick = useCallback(() => {
      uploadInputRef.current?.click();
    }, []);

    const handleImageUpload = useCallback((imageData: string) => {
      canvasRef.current?.loadImage(imageData);
    }, []);

    const handleCommitFloatingImage = useCallback(() => {
      setFloatingImage(null);
    }, []);

    const handleCancelFloatingImage = useCallback(() => {
      setFloatingImage(null);
    }, []);

    // Expose API via ref
    useImperativeHandle(
      ref,
      () => ({
        resetCanvas: () => {
          setFloatingImage(null);
          canvasRef.current?.resetCanvas();
          onReset?.();
        },
        exportImage: () => {
          return canvasRef.current?.exportImage() || "";
        },
      }),
      [onReset],
    );

    return (
      <div
        ref={containerRef}
        className={`mx-auto w-full p-2 sm:p-4 ${isFullscreen ? "bg-background flex h-screen flex-col" : "max-w-4xl"}`}
      >
        <div
          className={`bg-card border-border overflow-hidden rounded-lg border shadow-lg dark:border-zinc-700 dark:bg-zinc-900 ${
            isFullscreen ? "flex flex-1 flex-col" : ""
          }`}
        >
          <div className="relative">
            <Toolbar
              activeTool={activeTool}
              onToolChange={setActiveTool}
              color={color}
              onColorChange={setColor}
              lineWidth={lineWidth}
              onLineWidthChange={setLineWidth}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={handleClear}
              onUploadClick={handleUploadClick}
              onExport={handleExport}
              availableTools={tools}
              disabled={!!floatingImage}
              canvasRatio={canvasRatio}
              onCanvasRatioChange={handleCanvasRatioChange}
            />
            {/* Fullscreen toggle button */}
            <button
              onClick={toggleFullscreen}
              className="hover:bg-accent text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-2 transition-colors dark:text-zinc-200 dark:hover:bg-zinc-700"
              title={isFullscreen ? "Keluar Fullscreen (Esc)" : "Fullscreen"}
              type="button"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>
          </div>
          <div
            className={
              isFullscreen
                ? "flex flex-1 items-center justify-center overflow-auto"
                : ""
            }
          >
            <Canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              canvasRatio={canvasRatio}
              activeTool={activeTool}
              color={color}
              lineWidth={lineWidth}
              fontSize={fontSize}
              initialImage={initialImage}
              onHistoryChange={handleHistoryChange}
              floatingImage={floatingImage}
              onFloatingImageChange={setFloatingImage}
              onCommitFloatingImage={handleCommitFloatingImage}
              onCancelFloatingImage={handleCancelFloatingImage}
              isFullscreen={isFullscreen}
            />
          </div>
          <Upload inputRef={uploadInputRef} onImageUpload={handleImageUpload} />
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs dark:text-zinc-500">
          Export: {CANVAS_RATIOS[canvasRatio].exportWidth}x
          {CANVAS_RATIOS[canvasRatio].exportHeight}px | Ctrl+Z Undo, Ctrl+Y Redo
          {floatingImage && " | Enter: Terapkan, Esc: Batal"}
        </p>
      </div>
    );
  },
);

export type {
  PaintAppProps,
  PaintAppRef,
  ToolType,
  CanvasRatio,
} from "./types";

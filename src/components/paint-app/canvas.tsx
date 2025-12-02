"use client";

import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { ToolType, FloatingImage, CanvasRatio } from "./types";
import { CANVAS_RATIOS } from "./types";
import { useCanvasHistory } from "./hooks/use-canvas-history";
import { useCanvasDrawing } from "./hooks/use-canvas-drawing";
import { useFloatingImage } from "./hooks/use-floating-image";
import { FloatingImageOverlay } from "./components/floating-image-overlay";

interface CanvasProps {
  width: number;
  height: number;
  canvasRatio: CanvasRatio;
  activeTool: ToolType;
  color: string;
  lineWidth: number;
  fontSize: number;
  initialImage?: string;
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void;
  floatingImage: FloatingImage | null;
  onFloatingImageChange: (image: FloatingImage | null) => void;
  onCommitFloatingImage: () => void;
  onCancelFloatingImage: () => void;
  isFullscreen?: boolean;
}

export interface CanvasRef {
  resetCanvas: () => void;
  exportImage: () => string;
  loadImage: (imageData: string) => void;
  undo: () => void;
  redo: () => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(function Canvas(
  {
    width,
    height,
    canvasRatio,
    activeTool,
    color,
    lineWidth,
    fontSize,
    initialImage,
    onHistoryChange,
    floatingImage,
    onFloatingImageChange,
    onCommitFloatingImage,
    onCancelFloatingImage,
    isFullscreen = false,
  },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // History hook
  const { history, historyIndex, saveToHistory, undo, redo, resetHistory } =
    useCanvasHistory({
      canvasRef,
      onHistoryChange,
    });

  // Drawing hook
  const {
    textInput,
    textValue,
    textInputRef,
    setTextValue,
    getScale,
    startDrawing,
    draw,
    stopDrawing,
    handleTextSubmit,
    cancelTextInput,
  } = useCanvasDrawing({
    canvasRef,
    activeTool,
    color,
    lineWidth,
    fontSize,
    history,
    historyIndex,
    saveToHistory,
    hasFloatingImage: !!floatingImage,
  });

  // Floating image hook
  const {
    isDragging,
    getScreenCoords,
    handleMouseDown,
    handleResizeMouseDown,
  } = useFloatingImage({
    floatingImage,
    onFloatingImageChange,
    getScale,
    containerRef,
  });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (initialImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveToHistory();
      };
      img.src = initialImage;
    } else {
      saveToHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reinitialize when canvas size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resetHistory();
    saveToHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resetHistory();
    saveToHistory();
  }, [resetHistory, saveToHistory]);

  const exportImage = useCallback((): string => {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    const ratioConfig = CANVAS_RATIOS[canvasRatio];

    // Create high-res offscreen canvas
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = ratioConfig.exportWidth;
    exportCanvas.height = ratioConfig.exportHeight;

    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return canvas.toDataURL("image/png");

    // Enable image smoothing for better quality
    exportCtx.imageSmoothingEnabled = true;
    exportCtx.imageSmoothingQuality = "high";

    // Scale up the display canvas to FHD
    exportCtx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      ratioConfig.exportWidth,
      ratioConfig.exportHeight,
    );

    return exportCanvas.toDataURL("image/png");
  }, [canvasRatio]);

  const loadImage = useCallback(
    (imageData: string) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const aspectRatio = img.width / img.height;

        const maxWidth = canvas.width * 0.8;
        const maxHeight = canvas.height * 0.8;
        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth > maxWidth) {
          const ratio = maxWidth / newWidth;
          newWidth = maxWidth;
          newHeight = newHeight * ratio;
        }
        if (newHeight > maxHeight) {
          const ratio = maxHeight / newHeight;
          newHeight = newHeight * ratio;
          newWidth = newWidth * ratio;
        }

        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        onFloatingImageChange({
          src: imageData,
          x,
          y,
          width: newWidth,
          height: newHeight,
          element: img,
          aspectRatio,
        });
      };
      img.src = imageData;
    },
    [onFloatingImageChange],
  );

  const commitFloatingImage = useCallback(() => {
    if (!floatingImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      floatingImage.element,
      floatingImage.x,
      floatingImage.y,
      floatingImage.width,
      floatingImage.height,
    );
    saveToHistory();
    onCommitFloatingImage();
  }, [floatingImage, saveToHistory, onCommitFloatingImage]);

  useImperativeHandle(
    ref,
    () => ({
      resetCanvas,
      exportImage,
      loadImage,
      undo,
      redo,
    }),
    [resetCanvas, exportImage, loadImage, undo, redo],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && floatingImage) {
        onCancelFloatingImage();
        return;
      }
      if (e.key === "Enter" && floatingImage) {
        commitFloatingImage();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, floatingImage, onCancelFloatingImage, commitFloatingImage]);

  const screenCoords = getScreenCoords();

  return (
    <div
      ref={containerRef}
      className={`bg-secondary/30 relative flex w-full justify-center p-2 sm:p-4 dark:bg-zinc-900/50 ${
        isFullscreen ? "h-full items-center" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          touchAction: "none",
          maxWidth: "100%",
          maxHeight: isFullscreen ? "calc(100vh - 120px)" : "auto",
        }}
        className={`border-border rounded border bg-white shadow-sm dark:border-zinc-600 ${floatingImage ? "cursor-default" : "cursor-crosshair"}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {floatingImage && screenCoords && (
        <FloatingImageOverlay
          floatingImage={floatingImage}
          screenCoords={screenCoords}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onResizeMouseDown={handleResizeMouseDown}
          onCommit={commitFloatingImage}
          onCancel={onCancelFloatingImage}
        />
      )}

      {textInput.visible && (
        <input
          ref={textInputRef}
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onBlur={handleTextSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTextSubmit();
            if (e.key === "Escape") cancelTextInput();
          }}
          style={{
            position: "absolute",
            left: textInput.x,
            top: textInput.y,
            fontSize: `${fontSize}px`,
            color: color,
          }}
          className="border-primary min-w-[100px] border border-dashed bg-transparent px-1 outline-none"
          placeholder="Ketik teks..."
        />
      )}
    </div>
  );
});

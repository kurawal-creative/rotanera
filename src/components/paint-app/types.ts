export type ToolType = "pencil" | "line" | "rectangle" | "circle" | "text" | "eraser"

export type CanvasRatio = "16:9" | "9:16" | "4:3" | "3:4" | "1:1"

export interface FloatingImage {
  src: string
  x: number
  y: number
  width: number
  height: number
  element: HTMLImageElement
  aspectRatio: number
}

export interface Point {
  x: number
  y: number
}

export interface DrawAction {
  tool: ToolType
  color: string
  lineWidth: number
  points: Point[]
  text?: string
  fontSize?: number
}

export interface PaintAppProps {
  onOutput?: (dataUrl: string) => void
  initialImage?: string
  width?: number
  height?: number
  tools?: ToolType[]
  onReset?: () => void
}

export interface PaintAppRef {
  resetCanvas: () => void
  exportImage: () => string
}

export const DEFAULT_TOOLS: ToolType[] = ["pencil", "line", "rectangle", "circle", "text", "eraser"]
export const DEFAULT_COLOR = "#000000"
export const DEFAULT_LINE_WIDTH = 2
export const DEFAULT_FONT_SIZE = 16
export const ERASER_SIZE = 20

export const CANVAS_RATIOS: Record<
  CanvasRatio,
  {
    displayWidth: number
    displayHeight: number
    exportWidth: number
    exportHeight: number
    label: string
  }
> = {
  "16:9": {
    displayWidth: 800,
    displayHeight: 450,
    exportWidth: 1920,
    exportHeight: 1080,
    label: "Landscape 16:9 (FHD)",
  },
  "9:16": {
    displayWidth: 450,
    displayHeight: 800,
    exportWidth: 1080,
    exportHeight: 1920,
    label: "Portrait 9:16 (FHD)",
  },
  "4:3": {
    displayWidth: 800,
    displayHeight: 600,
    exportWidth: 1920,
    exportHeight: 1440,
    label: "Landscape 4:3",
  },
  "3:4": {
    displayWidth: 600,
    displayHeight: 800,
    exportWidth: 1440,
    exportHeight: 1920,
    label: "Portrait 3:4",
  },
  "1:1": {
    displayWidth: 600,
    displayHeight: 600,
    exportWidth: 1920,
    exportHeight: 1920,
    label: "Square 1:1",
  },
}

export function getScaleFactor(ratio: CanvasRatio): number {
  const config = CANVAS_RATIOS[ratio]
  return config.exportWidth / config.displayWidth
}

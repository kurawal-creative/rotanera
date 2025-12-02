"use client"

import type React from "react"

import { useRef, useState, useCallback } from "react"
import type { ToolType, Point } from "../types"
import { ERASER_SIZE } from "../types"

interface UseCanvasDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  activeTool: ToolType
  color: string
  lineWidth: number
  fontSize: number
  history: ImageData[]
  historyIndex: number
  saveToHistory: () => void
  hasFloatingImage: boolean
}

export function useCanvasDrawing({
  canvasRef,
  activeTool,
  color,
  lineWidth,
  fontSize,
  history,
  historyIndex,
  saveToHistory,
  hasFloatingImage,
}: UseCanvasDrawingProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [textInput, setTextInput] = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  })
  const [textValue, setTextValue] = useState("")
  const textInputRef = useRef<HTMLInputElement>(null)

  const getScale = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return { scaleX: 1, scaleY: 1 }
    const rect = canvas.getBoundingClientRect()
    return {
      scaleX: canvas.width / rect.width,
      scaleY: canvas.height / rect.height,
    }
  }, [canvasRef])

  const getCoordinates = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const { scaleX, scaleY } = getScale()

      if ("touches" in e) {
        const touch = e.touches[0] || e.changedTouches[0]
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        }
      }

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    },
    [canvasRef, getScale],
  )

  const drawShape = useCallback(
    (ctx: CanvasRenderingContext2D, start: Point, end: Point) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (activeTool === "line") {
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
      } else if (activeTool === "rectangle") {
        ctx.beginPath()
        ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y)
      } else if (activeTool === "circle") {
        const radiusX = Math.abs(end.x - start.x) / 2
        const radiusY = Math.abs(end.y - start.y) / 2
        const centerX = start.x + (end.x - start.x) / 2
        const centerY = start.y + (end.y - start.y) / 2
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
        ctx.stroke()
      }
    },
    [activeTool, color, lineWidth],
  )

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (hasFloatingImage) return
      e.preventDefault()
      const point = getCoordinates(e)

      if (activeTool === "text") {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()

        if ("touches" in e) {
          const touch = e.touches[0]
          setTextInput({ visible: true, x: touch.clientX - rect.left, y: touch.clientY - rect.top })
        } else {
          setTextInput({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
        setTextValue("")
        setTimeout(() => textInputRef.current?.focus(), 0)
        return
      }

      setIsDrawing(true)
      setStartPoint(point)

      if (activeTool === "pencil" || activeTool === "eraser") {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
      }
    },
    [hasFloatingImage, activeTool, canvasRef, getCoordinates],
  )

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || hasFloatingImage) return
      e.preventDefault()

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const point = getCoordinates(e)

      if (activeTool === "pencil") {
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      } else if (activeTool === "eraser") {
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = ERASER_SIZE
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      } else if (startPoint && history[historyIndex]) {
        ctx.putImageData(history[historyIndex], 0, 0)
        drawShape(ctx, startPoint, point)
      }
    },
    [
      isDrawing,
      hasFloatingImage,
      activeTool,
      canvasRef,
      color,
      lineWidth,
      startPoint,
      history,
      historyIndex,
      getCoordinates,
      drawShape,
    ],
  )

  const stopDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing || hasFloatingImage) return
      e.preventDefault()

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      if (startPoint && (activeTool === "line" || activeTool === "rectangle" || activeTool === "circle")) {
        const point = getCoordinates(e)
        if (history[historyIndex]) {
          ctx.putImageData(history[historyIndex], 0, 0)
        }
        drawShape(ctx, startPoint, point)
      }

      setIsDrawing(false)
      setStartPoint(null)
      saveToHistory()
    },
    [
      isDrawing,
      hasFloatingImage,
      activeTool,
      canvasRef,
      startPoint,
      history,
      historyIndex,
      getCoordinates,
      drawShape,
      saveToHistory,
    ],
  )

  const handleTextSubmit = useCallback(() => {
    if (!textValue.trim()) {
      setTextInput({ visible: false, x: 0, y: 0 })
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { scaleX, scaleY } = getScale()

    ctx.fillStyle = color
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillText(textValue, textInput.x * scaleX, textInput.y * scaleY)

    setTextInput({ visible: false, x: 0, y: 0 })
    setTextValue("")
    saveToHistory()
  }, [textValue, canvasRef, color, fontSize, textInput, getScale, saveToHistory])

  const cancelTextInput = useCallback(() => {
    setTextInput({ visible: false, x: 0, y: 0 })
  }, [])

  return {
    isDrawing,
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
  }
}

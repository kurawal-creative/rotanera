"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"

interface UseCanvasHistoryProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void
}

export function useCanvasHistory({ canvasRef, onHistoryChange }: UseCanvasHistoryProps) {
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    onHistoryChange(historyIndex > 0, historyIndex < history.length - 1)
  }, [historyIndex, history.length, onHistoryChange])

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(imageData)
      if (newHistory.length > 50) {
        newHistory.shift()
        return newHistory
      }
      return newHistory
    })
    setHistoryIndex((prev) => Math.min(prev + 1, 49))
  }, [canvasRef, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex <= 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const newIndex = historyIndex - 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }, [canvasRef, history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const newIndex = historyIndex + 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }, [canvasRef, history, historyIndex])

  const resetHistory = useCallback(() => {
    setHistory([])
    setHistoryIndex(-1)
  }, [])

  return {
    history,
    historyIndex,
    saveToHistory,
    undo,
    redo,
    resetHistory,
  }
}

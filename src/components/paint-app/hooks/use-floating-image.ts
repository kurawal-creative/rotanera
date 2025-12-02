"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import type { FloatingImage, Point } from "../types"

interface UseFloatingImageProps {
  floatingImage: FloatingImage | null
  onFloatingImageChange: (image: FloatingImage | null) => void
  getScale: () => { scaleX: number; scaleY: number }
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function useFloatingImage({
  floatingImage,
  onFloatingImageChange,
  getScale,
  containerRef,
}: UseFloatingImageProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeCorner, setResizeCorner] = useState<string | null>(null)
  const [resizeStart, setResizeStart] = useState<{
    mouseX: number
    mouseY: number
    width: number
    height: number
  } | null>(null)

  const getScreenCoords = useCallback(() => {
    if (!floatingImage) return null
    const { scaleX, scaleY } = getScale()
    return {
      x: floatingImage.x / scaleX,
      y: floatingImage.y / scaleY,
      width: floatingImage.width / scaleX,
      height: floatingImage.height / scaleY,
    }
  }, [floatingImage, getScale])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!floatingImage) return
      e.preventDefault()
      e.stopPropagation()

      const screenCoords = getScreenCoords()
      if (!screenCoords) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      setIsDragging(true)
      setDragOffset({
        x: mouseX - screenCoords.x,
        y: mouseY - screenCoords.y,
      })
    },
    [floatingImage, getScreenCoords, containerRef],
  )

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging || !floatingImage) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const { scaleX, scaleY } = getScale()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const newX = (mouseX - dragOffset.x) * scaleX
      const newY = (mouseY - dragOffset.y) * scaleY

      onFloatingImageChange({
        ...floatingImage,
        x: newX,
        y: newY,
      })
    },
    [isDragging, floatingImage, dragOffset, getScale, onFloatingImageChange, containerRef],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
    setResizeCorner(null)
    setResizeStart(null)
  }, [])

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, corner: string) => {
      if (!floatingImage) return
      e.preventDefault()
      e.stopPropagation()

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      setIsResizing(true)
      setResizeCorner(corner)
      setResizeStart({
        mouseX: e.clientX - rect.left,
        mouseY: e.clientY - rect.top,
        width: floatingImage.width,
        height: floatingImage.height,
      })
    },
    [floatingImage, containerRef],
  )

  const handleResizeMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isResizing || !floatingImage || !resizeCorner || !resizeStart) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const { scaleX, scaleY } = getScale()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate delta from resize start
      const deltaX = (mouseX - resizeStart.mouseX) * scaleX
      const deltaY = (mouseY - resizeStart.mouseY) * scaleY

      // Determine resize direction and calculate new size maintaining aspect ratio
      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      let newX = floatingImage.x
      let newY = floatingImage.y

      const aspectRatio = floatingImage.aspectRatio

      // Calculate based on which corner is being dragged
      if (resizeCorner === "se") {
        // Bottom-right: expand/shrink from top-left anchor
        const delta = Math.max(deltaX, deltaY * aspectRatio)
        newWidth = Math.max(40, resizeStart.width + delta)
        newHeight = newWidth / aspectRatio
      } else if (resizeCorner === "sw") {
        // Bottom-left: expand/shrink, adjust x
        const delta = Math.max(-deltaX, deltaY * aspectRatio)
        newWidth = Math.max(40, resizeStart.width + delta)
        newHeight = newWidth / aspectRatio
        newX = floatingImage.x + (floatingImage.width - newWidth)
      } else if (resizeCorner === "ne") {
        // Top-right: expand/shrink, adjust y
        const delta = Math.max(deltaX, -deltaY * aspectRatio)
        newWidth = Math.max(40, resizeStart.width + delta)
        newHeight = newWidth / aspectRatio
        newY = floatingImage.y + (floatingImage.height - newHeight)
      } else if (resizeCorner === "nw") {
        // Top-left: expand/shrink, adjust both x and y
        const delta = Math.max(-deltaX, -deltaY * aspectRatio)
        newWidth = Math.max(40, resizeStart.width + delta)
        newHeight = newWidth / aspectRatio
        newX = floatingImage.x + (floatingImage.width - newWidth)
        newY = floatingImage.y + (floatingImage.height - newHeight)
      }

      onFloatingImageChange({
        ...floatingImage,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      })
    },
    [isResizing, floatingImage, resizeCorner, resizeStart, getScale, onFloatingImageChange, containerRef],
  )

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleResizeMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizing, handleResizeMouseMove, handleMouseUp])

  return {
    isDragging,
    isResizing,
    getScreenCoords,
    handleMouseDown,
    handleResizeMouseDown,
  }
}

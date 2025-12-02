"use client"

import type React from "react"

import type { ChangeEvent } from "react"

interface UploadProps {
  onImageUpload: (imageData: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function Upload({ onImageUpload, inputRef }: UploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar yang valid")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === "string") {
        onImageUpload(result)
      }
    }
    reader.readAsDataURL(file)

    // Reset input agar bisa upload file yang sama
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
      aria-label="Upload gambar"
    />
  )
}

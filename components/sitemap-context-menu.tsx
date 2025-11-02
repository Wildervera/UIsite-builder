"use client"

import { ChevronRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"

interface SitemapContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export function SitemapContextMenu({ x, y, onClose }: SitemapContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-64 rounded-lg border border-gray-200 bg-white shadow-lg"
      style={{ left: x, top: y }}
    >
      {/* Search */}
      <div className="border-b border-gray-200 p-2">
        <input
          type="text"
          placeholder="Search actions..."
          className="w-full rounded border-none bg-transparent px-2 py-1 text-sm focus:outline-none"
        />
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-purple-50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>Ask AI</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50">
          <span>Duplicate</span>
        </button>

        <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50">
          <span>Delete</span>
        </button>

        <div className="my-1 border-t border-gray-200" />

        <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50">
          <span>Move to top</span>
        </button>

        <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50">
          <span>Move up</span>
        </button>

        <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50">
          <span>Move down</span>
        </button>
      </div>
    </div>
  )
}

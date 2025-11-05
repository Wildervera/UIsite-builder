"use client"

import { ChevronRight, Sparkles, Copy, Trash2, Home as HomeIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ColorPicker } from "./color-picker"
import type { SectionColor } from "@/lib/sitemap-types"

export type ContextMenuAction =
  | 'ask-ai'
  | 'duplicate'
  | 'delete'
  | 'move-top'
  | 'move-up'
  | 'move-down'
  | 'add-page'
  | 'add-section'
  | 'set-home'
  | 'change-color'

interface SitemapContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onAction: (action: ContextMenuAction, data?: any) => void
  targetType?: 'project' | 'page' | 'section'
  currentColor?: SectionColor
}

export function SitemapContextMenu({
  x,
  y,
  onClose,
  onAction,
  targetType = 'section',
  currentColor = 'none'
}: SitemapContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleAction = (action: ContextMenuAction, data?: any) => {
    onAction(action, data)
    if (action !== 'change-color') {
      onClose()
    }
  }

  const menuItems = [
    { action: 'ask-ai' as const, label: 'Ask AI', icon: Sparkles, iconColor: 'text-purple-600', showFor: ['project', 'page', 'section'] },
    { action: 'add-page' as const, label: 'Add page', showFor: ['project', 'page'] },
    { action: 'add-section' as const, label: 'Add section', showFor: ['page'] },
    { action: 'duplicate' as const, label: 'Duplicate', icon: Copy, showFor: ['page', 'section'] },
    { action: 'set-home' as const, label: 'Set as home page', icon: HomeIcon, showFor: ['page'] },
    { action: 'delete' as const, label: 'Delete', icon: Trash2, iconColor: 'text-red-600', showFor: ['page', 'section'] },
    { action: 'move-top' as const, label: 'Move to top', showFor: ['page', 'section'], dividerBefore: true },
    { action: 'move-up' as const, label: 'Move up', showFor: ['page', 'section'] },
    { action: 'move-down' as const, label: 'Move down', showFor: ['page', 'section'] },
  ]

  const filteredItems = menuItems.filter(item =>
    item.showFor.includes(targetType) &&
    (!searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-64 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden"
      style={{ left: x, top: y }}
    >
      {/* Search */}
      <div className="border-b border-gray-200 p-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search actions..."
          className="w-full rounded border-none bg-transparent px-2 py-1 text-sm focus:outline-none"
        />
      </div>

      {/* Menu Items */}
      <div className="py-1 max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div key={item.action}>
            {item.dividerBefore && <div className="my-1 border-t border-gray-200" />}
            <button
              onClick={() => handleAction(item.action)}
              className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className={`h-4 w-4 ${item.iconColor || 'text-gray-600'}`} />}
                <span>{item.label}</span>
              </div>
              {item.action === 'ask-ai' && <ChevronRight className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
        ))}

        {/* Color Picker for Sections */}
        {targetType === 'section' && (
          <>
            <div className="my-1 border-t border-gray-200" />
            <div className="px-2 py-1">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
              >
                <span>Change color</span>
                <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${showColorPicker ? 'rotate-90' : ''}`} />
              </button>
              {showColorPicker && (
                <ColorPicker
                  currentColor={currentColor}
                  onColorChange={(color) => handleAction('change-color', color)}
                />
              )}
            </div>
          </>
        )}

        {filteredItems.length === 0 && !showColorPicker && (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No actions found
          </div>
        )}
      </div>
    </div>
  )
}

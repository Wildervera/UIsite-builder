"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, GripVertical, Plus } from "lucide-react"
import type { Section, SectionColor } from "@/lib/sitemap-types"

interface SectionCardProps {
  section: Section
  onUpdate: (section: Section) => void
  onContextMenu: (e: React.MouseEvent, sectionId: string) => void
  onAddSection?: () => void
  isDragging?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
}

const COLOR_CLASSES: Record<SectionColor, string> = {
  blue: 'bg-blue-100 border-blue-300',
  purple: 'bg-purple-100 border-purple-300',
  green: 'bg-green-100 border-green-300',
  orange: 'bg-orange-100 border-orange-300',
  gray: 'bg-gray-100 border-gray-300',
  red: 'bg-red-100 border-red-300',
  yellow: 'bg-yellow-100 border-yellow-300',
  pink: 'bg-pink-100 border-pink-300',
  none: 'bg-white border-gray-200',
}

export function SectionCard({
  section,
  onUpdate,
  onContextMenu,
  onAddSection,
  isDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: SectionCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [title, setTitle] = useState(section.title)
  const [description, setDescription] = useState(section.description)
  const [showAddButton, setShowAddButton] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus()
      descriptionInputRef.current.select()
    }
  }, [isEditingDescription])

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (title.trim() !== section.title) {
      onUpdate({ ...section, title: title.trim() || section.title })
    }
  }

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false)
    if (description.trim() !== section.description) {
      onUpdate({ ...section, description: description.trim() || section.description })
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
    >
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`group rounded-lg border-2 p-4 transition-all ${COLOR_CLASSES[section.color]} ${
          isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab hover:shadow-md'
        }`}
      >
        <div className="flex items-start gap-2">
          {/* Drag Handle */}
          <div className="flex-shrink-0 pt-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleBlur()
                  if (e.key === 'Escape') {
                    setTitle(section.title)
                    setIsEditingTitle(false)
                  }
                }}
                className="w-full text-sm font-medium bg-transparent border-none outline-none focus:outline-none p-0 mb-2"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="text-sm font-medium mb-2 cursor-text hover:bg-white/50 rounded px-1 -mx-1"
              >
                {section.title}
              </div>
            )}

            {/* Description */}
            {isEditingDescription ? (
              <textarea
                ref={descriptionInputRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setDescription(section.description)
                    setIsEditingDescription(false)
                  }
                }}
                className="w-full text-xs text-gray-600 bg-transparent border-none outline-none focus:outline-none p-0 resize-none"
                rows={3}
              />
            ) : (
              <div
                onClick={() => setIsEditingDescription(true)}
                className="text-xs text-gray-600 cursor-text hover:bg-white/50 rounded px-1 -mx-1 min-h-[3rem]"
              >
                {section.description}
              </div>
            )}
          </div>

          {/* Menu Button */}
          <button
            onClick={(e) => onContextMenu(e, section.id)}
            className="flex-shrink-0 rounded p-1 hover:bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Add Button (appears on hover between sections) */}
      {showAddButton && onAddSection && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-10">
          <button
            onClick={onAddSection}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

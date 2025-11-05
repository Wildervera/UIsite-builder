"use client"

import { useState } from "react"
import { Home, MoreVertical, Plus, Sparkles, FileText } from "lucide-react"
import { SectionCard } from "./section-card"
import type { Page, Section, SectionTemplate } from "@/lib/sitemap-types"
import { Button } from "./ui/button"

interface PageCardProps {
  page: Page
  onUpdate: (page: Page) => void
  onContextMenu: (e: React.MouseEvent, pageId: string, type: 'page' | 'section', targetId?: string) => void
  onAddSection: (pageId: string, template: SectionTemplate, afterSectionId?: string) => void
  onAskAI: (pageId: string) => void
}

export function PageCard({ page, onUpdate, onContextMenu, onAddSection, onAskAI }: PageCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(page.title)

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (title.trim() !== page.title) {
      onUpdate({ ...page, title: title.trim() || page.title })
    }
  }

  const handleSectionUpdate = (updatedSection: Section) => {
    const updatedSections = page.sections.map(s =>
      s.id === updatedSection.id ? updatedSection : s
    )
    onUpdate({ ...page, sections: updatedSections })
  }

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('sectionId', sectionId)
    e.dataTransfer.setData('pageId', page.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault()
    const draggedSectionId = e.dataTransfer.getData('sectionId')
    const sourcePageId = e.dataTransfer.getData('pageId')

    if (sourcePageId !== page.id) return // Only allow reordering within same page

    const draggedIndex = page.sections.findIndex(s => s.id === draggedSectionId)
    const targetIndex = page.sections.findIndex(s => s.id === targetSectionId)

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return

    const newSections = [...page.sections]
    const [draggedSection] = newSections.splice(draggedIndex, 1)
    newSections.splice(targetIndex, 0, draggedSection)

    // Update order property
    const updatedSections = newSections.map((s, index) => ({ ...s, order: index }))
    onUpdate({ ...page, sections: updatedSections })
  }

  return (
    <div className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {page.isHomePage ? (
            <Home className="h-4 w-4 text-purple-600" />
          ) : (
            <FileText className="h-4 w-4 text-gray-600" />
          )}
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleBlur()
                if (e.key === 'Escape') {
                  setTitle(page.title)
                  setIsEditingTitle(false)
                }
              }}
              className="flex-1 text-sm font-medium bg-transparent border-none outline-none focus:outline-none p-0"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditingTitle(true)}
              className="flex-1 text-sm font-medium cursor-text hover:bg-gray-50 rounded px-2 py-1 -mx-2"
            >
              {page.title}
            </div>
          )}
          {page.isHomePage && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Home</span>
          )}
        </div>
        <button
          onClick={(e) => onContextMenu(e, page.id, 'page')}
          className="rounded p-1 hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Sections */}
      {page.sections.length > 0 ? (
        <div className="space-y-3">
          {page.sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              onUpdate={handleSectionUpdate}
              onContextMenu={(e, sectionId) => onContextMenu(e, page.id, 'section', sectionId)}
              onAddSection={() => {}}
              onDragStart={(e) => handleDragStart(e, section.id)}
              onDragEnd={() => {}}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, section.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600 mb-4">
            Click below to add sections or
            <br />
            <span className="text-purple-600 font-medium">generate with AI</span>
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddSection(page.id, {
                id: 'blank',
                name: 'Blank Section',
                category: 'Blank',
                description: 'Empty section to customize',
                defaultColor: 'none'
              })}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
            <Button
              size="sm"
              onClick={() => onAskAI(page.id)}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="h-4 w-4" />
              Generate content
            </Button>
          </div>
        </div>
      )}

      {/* Add Section Button (at bottom when sections exist) */}
      {page.sections.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddSection(page.id, {
              id: 'blank',
              name: 'Blank Section',
              category: 'Blank',
              description: 'Empty section to customize',
              defaultColor: 'none'
            })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </div>
      )}
    </div>
  )
}

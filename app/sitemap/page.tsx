"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Home, MoreVertical, Pencil, Plus, Redo, Undo, Menu, ArrowLeft, Sparkles } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { ProjectSettingsModal } from "@/components/project-settings-modal"
import { SitemapContextMenu, type ContextMenuAction } from "@/components/sitemap-context-menu"
import { AddSectionPanel } from "@/components/add-section-panel"
import { AskAIModal } from "@/components/ask-ai-modal"
import { PageCard } from "@/components/page-card"
import Link from "next/link"
import type { SitemapProject, Page, Section, SectionTemplate } from "@/lib/sitemap-types"
import { generateSitemap, generateSectionsForPageAI, importSitemapFromUrl } from "@/lib/ai-generator"
import { Button } from "@/components/ui/button"

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

export default function SitemapPage() {
  // State management
  const [project, setProject] = useState<SitemapProject>({
    id: generateId(),
    name: 'Untitled Project',
    description: '',
    numberOfPages: '2-5',
    language: 'English (US)',
    pages: [],
  })

  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [showAskAIModal, setShowAskAIModal] = useState(false)
  const [askAITarget, setAskAITarget] = useState<{ type: 'project' | 'page' | 'section', id: string } | null>(null)

  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    targetType: 'project' | 'page' | 'section'
    targetId: string
    sectionId?: string
  } | null>(null)

  const [history, setHistory] = useState<SitemapProject[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [zoom, setZoom] = useState(100)
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Save to history when project changes
  const saveToHistory = useCallback((newProject: SitemapProject) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(JSON.parse(JSON.stringify(newProject)))
      return newHistory.slice(-50) // Keep last 50 states
    })
    setHistoryIndex(prev => Math.min(prev + 1, 49))
  }, [historyIndex])

  // Update project and save to history
  const updateProject = useCallback((newProject: SitemapProject) => {
    setProject(newProject)
    saveToHistory(newProject)
  }, [saveToHistory])

  // Undo/Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setProject(JSON.parse(JSON.stringify(history[historyIndex - 1])))
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setProject(JSON.parse(JSON.stringify(history[historyIndex + 1])))
    }
  }

  // Generate sitemap from project settings
  const handleGenerateSitemap = async (data: {
    description: string
    numberOfPages: string
    language: string
  }) => {
    setIsGenerating(true)
    const pages = await generateSitemap(data)
    const newProject = {
      ...project,
      description: data.description,
      numberOfPages: data.numberOfPages,
      language: data.language,
      pages,
    }
    updateProject(newProject)
    setIsGenerating(false)
    setShowProjectModal(false)
  }

  // Import sitemap from URL
  const handleImportSitemap = async (url: string) => {
    setIsGenerating(true)
    const pages = await importSitemapFromUrl(url)
    const newProject = {
      ...project,
      pages,
    }
    updateProject(newProject)
    setIsGenerating(false)
  }

  // Add page
  const handleAddPage = (title: string = 'New Page') => {
    const newPage: Page = {
      id: generateId(),
      title,
      isHomePage: project.pages.length === 0,
      sections: [],
      order: project.pages.length,
    }
    updateProject({
      ...project,
      pages: [...project.pages, newPage],
    })
  }

  // Update page
  const handleUpdatePage = (updatedPage: Page) => {
    updateProject({
      ...project,
      pages: project.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
    })
  }

  // Delete page
  const handleDeletePage = (pageId: string) => {
    const updatedPages = project.pages.filter(p => p.id !== pageId)

    // If deleted page was home, make first page home
    if (updatedPages.length > 0 && !updatedPages.some(p => p.isHomePage)) {
      updatedPages[0].isHomePage = true
    }

    updateProject({
      ...project,
      pages: updatedPages.map((p, index) => ({ ...p, order: index })),
    })
  }

  // Duplicate page
  const handleDuplicatePage = (pageId: string) => {
    const pageToDuplicate = project.pages.find(p => p.id === pageId)
    if (!pageToDuplicate) return

    const duplicatedPage: Page = {
      ...JSON.parse(JSON.stringify(pageToDuplicate)),
      id: generateId(),
      title: `${pageToDuplicate.title} (Copy)`,
      isHomePage: false,
      order: project.pages.length,
      sections: pageToDuplicate.sections.map(s => ({
        ...s,
        id: generateId(),
      })),
    }

    updateProject({
      ...project,
      pages: [...project.pages, duplicatedPage],
    })
  }

  // Set home page
  const handleSetHomePage = (pageId: string) => {
    updateProject({
      ...project,
      pages: project.pages.map(p => ({
        ...p,
        isHomePage: p.id === pageId,
      })),
    })
  }

  // Move page
  const handleMovePage = (pageId: string, direction: 'up' | 'down' | 'top') => {
    const pageIndex = project.pages.findIndex(p => p.id === pageId)
    if (pageIndex === -1) return

    const newPages = [...project.pages]

    if (direction === 'top') {
      const [page] = newPages.splice(pageIndex, 1)
      newPages.unshift(page)
    } else if (direction === 'up' && pageIndex > 0) {
      [newPages[pageIndex - 1], newPages[pageIndex]] = [newPages[pageIndex], newPages[pageIndex - 1]]
    } else if (direction === 'down' && pageIndex < newPages.length - 1) {
      [newPages[pageIndex], newPages[pageIndex + 1]] = [newPages[pageIndex + 1], newPages[pageIndex]]
    }

    updateProject({
      ...project,
      pages: newPages.map((p, index) => ({ ...p, order: index })),
    })
  }

  // Add section to page
  const handleAddSection = (pageId: string, template: SectionTemplate, afterSectionId?: string) => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return

    const newSection: Section = {
      id: generateId(),
      title: template.name,
      description: template.description,
      color: template.defaultColor,
      order: page.sections.length,
    }

    let newSections: Section[]

    if (afterSectionId) {
      // Insert after specific section
      const afterIndex = page.sections.findIndex(s => s.id === afterSectionId)
      if (afterIndex !== -1) {
        newSections = [
          ...page.sections.slice(0, afterIndex + 1),
          newSection,
          ...page.sections.slice(afterIndex + 1)
        ]
      } else {
        newSections = [...page.sections, newSection]
      }
    } else {
      // Add at the end
      newSections = [...page.sections, newSection]
    }

    // Update order property
    const sectionsWithOrder = newSections.map((s, index) => ({ ...s, order: index }))

    const updatedPage = {
      ...page,
      sections: sectionsWithOrder,
    }

    handleUpdatePage(updatedPage)
  }

  // Delete section
  const handleDeleteSection = (pageId: string, sectionId: string) => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return

    const updatedPage = {
      ...page,
      sections: page.sections.filter(s => s.id !== sectionId).map((s, index) => ({ ...s, order: index })),
    }

    handleUpdatePage(updatedPage)
  }

  // Duplicate section
  const handleDuplicateSection = (pageId: string, sectionId: string) => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return

    const sectionToDuplicate = page.sections.find(s => s.id === sectionId)
    if (!sectionToDuplicate) return

    const duplicatedSection: Section = {
      ...sectionToDuplicate,
      id: generateId(),
      order: page.sections.length,
    }

    const updatedPage = {
      ...page,
      sections: [...page.sections, duplicatedSection],
    }

    handleUpdatePage(updatedPage)
  }

  // Change section color
  const handleChangeSectionColor = (pageId: string, sectionId: string, color: string) => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return

    const updatedPage = {
      ...page,
      sections: page.sections.map(s =>
        s.id === sectionId ? { ...s, color: color as any } : s
      ),
    }

    handleUpdatePage(updatedPage)
  }

  // Move section
  const handleMoveSection = (pageId: string, sectionId: string, direction: 'up' | 'down' | 'top') => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return

    const sectionIndex = page.sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) return

    const newSections = [...page.sections]

    if (direction === 'top') {
      const [section] = newSections.splice(sectionIndex, 1)
      newSections.unshift(section)
    } else if (direction === 'up' && sectionIndex > 0) {
      [newSections[sectionIndex - 1], newSections[sectionIndex]] = [newSections[sectionIndex], newSections[sectionIndex - 1]]
    } else if (direction === 'down' && sectionIndex < newSections.length - 1) {
      [newSections[sectionIndex], newSections[sectionIndex + 1]] = [newSections[sectionIndex + 1], newSections[sectionIndex]]
    }

    const updatedPage = {
      ...page,
      sections: newSections.map((s, index) => ({ ...s, order: index })),
    }

    handleUpdatePage(updatedPage)
  }

  // Handle context menu actions
  const handleContextMenuAction = (action: ContextMenuAction, data?: any) => {
    if (!contextMenu) return

    const { targetType, targetId, sectionId } = contextMenu

    switch (action) {
      case 'ask-ai':
        setAskAITarget({ type: targetType, id: targetId })
        setShowAskAIModal(true)
        break
      case 'add-page':
        handleAddPage()
        break
      case 'add-section':
        setSelectedPageId(targetId)
        setShowAddPanel(true)
        break
      case 'duplicate':
        if (targetType === 'page') {
          handleDuplicatePage(targetId)
        } else if (targetType === 'section' && sectionId) {
          handleDuplicateSection(targetId, sectionId)
        }
        break
      case 'delete':
        if (targetType === 'page') {
          handleDeletePage(targetId)
        } else if (targetType === 'section' && sectionId) {
          handleDeleteSection(targetId, sectionId)
        }
        break
      case 'set-home':
        handleSetHomePage(targetId)
        break
      case 'change-color':
        if (targetType === 'section' && sectionId) {
          handleChangeSectionColor(targetId, sectionId, data)
        }
        break
      case 'move-top':
        if (targetType === 'page') {
          handleMovePage(targetId, 'top')
        } else if (targetType === 'section' && sectionId) {
          handleMoveSection(targetId, sectionId, 'top')
        }
        break
      case 'move-up':
        if (targetType === 'page') {
          handleMovePage(targetId, 'up')
        } else if (targetType === 'section' && sectionId) {
          handleMoveSection(targetId, sectionId, 'up')
        }
        break
      case 'move-down':
        if (targetType === 'page') {
          handleMovePage(targetId, 'down')
        } else if (targetType === 'section' && sectionId) {
          handleMoveSection(targetId, sectionId, 'down')
        }
        break
    }

    setContextMenu(null)
  }

  // Handle Ask AI
  const handleAskAI = async (prompt: string) => {
    if (!askAITarget) return

    setIsGenerating(true)

    if (askAITarget.type === 'project') {
      // Generate entire sitemap
      const pages = await generateSitemap({
        description: prompt,
        numberOfPages: project.numberOfPages,
        language: project.language,
      })
      updateProject({ ...project, pages, description: prompt })
    } else if (askAITarget.type === 'page') {
      // Generate sections for page
      const page = project.pages.find(p => p.id === askAITarget.id)
      if (page) {
        const sections = await generateSectionsForPageAI(page.title, prompt)
        handleUpdatePage({ ...page, sections })
      }
    }

    setIsGenerating(false)
    setShowAskAIModal(false)
    setAskAITarget(null)
  }

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, pageId: string, type: 'page' | 'section', sectionId?: string) => {
    e.preventDefault()

    // Get section for color picker
    let currentColor: any = 'none'
    if (type === 'section' && sectionId) {
      const page = project.pages.find(p => p.id === pageId)
      const section = page?.sections.find(s => s.id === sectionId)
      currentColor = section?.color || 'none'
    }

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      targetType: type,
      targetId: pageId,
      sectionId,
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center rounded-lg p-2 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <input
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Center Navigation */}
          <nav className="flex items-center gap-1">
            <button className="rounded-lg border-b-2 border-black px-4 py-2 text-sm font-medium">Sitemap</button>
            <Link href="/wireframe" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Wireframe
            </Link>
            <Link href="/style-guide" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Style Guide
            </Link>
            <Link
              href="/design"
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Design
              <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-600">Beta</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="w-[100px]" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Toolbar */}
        <aside className="flex w-16 flex-col items-center gap-2 border-r border-gray-200 bg-white py-4">
          <button
            onClick={() => setShowProjectModal(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
            title="Project Settings"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowAddPanel(!showAddPanel)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 ${
              showAddPanel ? 'bg-purple-100 text-purple-600' : ''
            }`}
            title="Add Sections"
          >
            <Plus className="h-5 w-5" />
          </button>
        </aside>

        {/* Add Panel */}
        <AddSectionPanel
          isOpen={showAddPanel}
          onClose={() => setShowAddPanel(false)}
          onAddSection={(template) => {
            if (selectedPageId) {
              handleAddSection(selectedPageId, template)
            }
            setShowAddPanel(false)
          }}
        />

        {/* Canvas Area */}
        <main className="flex-1 overflow-auto p-8">
          <div
            className="mx-auto max-w-5xl space-y-8 transition-transform origin-top"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-200 px-4 py-2">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Project</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setContextMenu({
                      x: e.clientX,
                      y: e.clientY,
                      targetType: 'project',
                      targetId: project.id,
                    })
                  }}
                  className="rounded p-1 hover:bg-gray-300"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Empty State or Pages */}
              {project.pages.length === 0 ? (
                <Card className="border-gray-200 bg-white p-8">
                  <div className="text-center">
                    <Home className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Click the project bar above to{' '}
                      <span className="text-purple-600 font-medium">generate a full sitemap with AI</span>
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => handleAddPage('Home')}
                      >
                        Add Page Manually
                      </Button>
                      <Button
                        onClick={() => setShowProjectModal(true)}
                        className="gap-2 bg-purple-600 hover:bg-purple-700"
                      >
                        <Sparkles className="h-4 w-4" />
                        Generate with AI
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {project.pages.map((page) => (
                    <PageCard
                      key={page.id}
                      page={page}
                      onUpdate={handleUpdatePage}
                      onContextMenu={handleContextMenu}
                      onAddSection={handleAddSection}
                      onAskAI={(pageId) => {
                        setAskAITarget({ type: 'page', id: pageId })
                        setShowAskAIModal(true)
                      }}
                    />
                  ))}

                  {/* Add Page Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAddPage()}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                      title="Add Page"
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              className="rounded-lg p-2 hover:bg-gray-100"
              title="Zoom Out"
            >
              <span className="text-sm font-medium">-</span>
            </button>
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="rounded-lg p-2 hover:bg-gray-100"
              title="Zoom In"
            >
              <span className="text-sm font-medium">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProjectModal && (
        <ProjectSettingsModal
          onClose={() => setShowProjectModal(false)}
          onGenerate={handleGenerateSitemap}
          onImport={handleImportSitemap}
          initialDescription={project.description}
          initialPages={project.numberOfPages}
          initialLanguage={project.language}
        />
      )}

      {contextMenu && (
        <SitemapContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextMenuAction}
          targetType={contextMenu.targetType}
          currentColor={
            contextMenu.sectionId
              ? project.pages
                  .find(p => p.id === contextMenu.targetId)
                  ?.sections.find(s => s.id === contextMenu.sectionId)?.color
              : 'none'
          }
        />
      )}

      {showAskAIModal && (
        <AskAIModal
          onClose={() => {
            setShowAskAIModal(false)
            setAskAITarget(null)
          }}
          onGenerate={handleAskAI}
          title={
            askAITarget?.type === 'project'
              ? 'Generate Sitemap with AI'
              : askAITarget?.type === 'page'
              ? 'Generate Page Sections with AI'
              : 'Ask AI'
          }
          placeholder={
            askAITarget?.type === 'project'
              ? 'Describe your website or company...'
              : 'Describe what sections you want to add...'
          }
        />
      )}

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
              <span className="text-lg font-medium">Generating with AI...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Home, MoreVertical, Pencil, Plus, Redo, Undo, Menu, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { ProjectSettingsModal } from "@/components/project-settings-modal"
import { SitemapContextMenu } from "@/components/sitemap-context-menu"
import Link from "next/link"

export default function SitemapPage() {
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: string } | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [zoom, setZoom] = useState(75)
  const [sitemaps, setSitemaps] = useState([{ id: 1, name: "Sitemap 1" }])

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      console.log("[v0] Undo action")
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      console.log("[v0] Redo action")
    }
  }

  const handleAddSitemap = () => {
    const newId = sitemaps.length + 1
    setSitemaps([...sitemaps, { id: newId, name: `Sitemap ${newId}` }])
    console.log("[v0] Added new sitemap")
  }

  const handleContextMenu = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, target })
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
              defaultValue="Untitled Project"
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
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddSitemap}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Project Section */}
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
                <button onClick={(e) => handleContextMenu(e, "project")} className="rounded p-1 hover:bg-gray-300">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Home Card */}
              <Card className="border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span className="text-sm font-medium">Home</span>
                  </div>
                  <button onClick={(e) => handleContextMenu(e, "home")} className="rounded p-1 hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Click the sitemap bar above to generate
                  <br />
                  <span className="text-purple-600">a full sitemap with AI</span>
                </p>
              </Card>
            </div>

            {/* Sitemap 1 Section */}
            {sitemaps.map((sitemap) => (
              <div key={sitemap.id} className="space-y-4">
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
                    <span className="text-sm font-medium">{sitemap.name}</span>
                  </div>
                  <button
                    onClick={(e) => handleContextMenu(e, `sitemap${sitemap.id}`)}
                    className="rounded p-1 hover:bg-gray-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Home Card */}
                <Card className="border-gray-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span className="text-sm font-medium">Home</span>
                    </div>
                    <button
                      onClick={(e) => handleContextMenu(e, `home${sitemap.id}`)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Click the sitemap bar above to generate
                    <br />
                    <span className="text-purple-600">a full sitemap with AI</span>
                  </p>
                </Card>
              </div>
            ))}

            {/* Add Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAddSitemap}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </button>
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
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <span className="text-sm font-medium">Project</span>
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
              </svg>
            </button>
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="7" y="3" width="10" height="18" rx="2" strokeWidth={2} />
              </svg>
            </button>
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
                <path d="M8 21h8" strokeWidth={2} />
                <path d="M12 17v4" strokeWidth={2} />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setZoom(Math.max(25, zoom - 10))}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            -
          </button>
          <span className="text-sm text-gray-600">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            +
          </button>
        </div>
      </div>

      {/* Modals */}
      {showProjectModal && <ProjectSettingsModal onClose={() => setShowProjectModal(false)} />}
      {contextMenu && <SitemapContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />}
    </div>
  )
}

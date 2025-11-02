"use client"

import { ArrowLeft, Pencil, Plus, Undo2, Redo2, Menu, Monitor, Tablet, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function WireframePage() {
  const [activeTab, setActiveTab] = useState("wireframe")
  const [projectName, setProjectName] = useState("Untitled Project")
  const [zoom, setZoom] = useState(57)
  const [sections, setSections] = useState<string[]>([])
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const handleAddSection = () => {
    setSections([...sections, `Section ${sections.length + 1}`])
    console.log("[v0] Added new section")
  }

  const handleGeneratePage = () => {
    setShowAIModal(true)
  }

  const handleAIGenerate = () => {
    console.log("[v0] Generating page with AI:", aiPrompt)
    setShowAIModal(false)
    setAiPrompt("")
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium focus:border-gray-300 focus:outline-none"
          />
        </div>

        {/* Center navigation */}
        <nav className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          <Link
            href="/sitemap"
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "sitemap" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sitemap
          </Link>
          <button
            onClick={() => setActiveTab("wireframe")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "wireframe" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Wireframe
          </button>
          <button
            onClick={() => setActiveTab("style-guide")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "style-guide" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Style Guide
          </button>
          <button
            onClick={() => setActiveTab("design")}
            className="relative rounded-md px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Design
            <span className="ml-1.5 rounded bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-600">Beta</span>
          </button>
        </nav>

        {/* Right section - empty for simplified header */}
        <div className="w-[100px]" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="flex w-16 flex-col items-center gap-2 border-r border-gray-200 bg-white py-4">
          <button
            onClick={() => console.log("[v0] Edit mode activated")}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <Pencil className="h-5 w-5 text-gray-700" />
          </button>
          <button onClick={handleAddSection} className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Plus className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="flex flex-1 flex-col">
          {/* Page Tab Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-t-lg bg-white px-4 py-2 border-t border-x border-gray-200">
                <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-900">Home</span>
                <button className="ml-2 hover:bg-gray-100 rounded p-0.5">
                  <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="18" r="1.5" />
                  </svg>
                </button>
              </div>
              <button className="rounded-lg p-1.5 hover:bg-gray-200 transition-colors">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
            <div className="flex h-full w-full max-w-4xl items-center justify-center rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleAddSection}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Section
                </button>
                <button
                  onClick={handleGeneratePage}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Generate page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
        {/* Left - Undo/Redo */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Undo2 className="h-4 w-4 text-gray-600" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Redo2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Right - Project Controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Project
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Menu className="h-4 w-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <button
              onClick={() => setDevice("desktop")}
              className={`rounded-lg p-2 transition-colors ${device === "desktop" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Monitor className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`rounded-lg p-2 transition-colors ${device === "tablet" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Tablet className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`rounded-lg p-2 transition-colors ${device === "mobile" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Smartphone className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <button
            onClick={() => setZoom(Math.max(25, zoom - 10))}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {zoom}%
          </button>
        </div>
      </div>

      {/* AI generation modal */}
      {showAIModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowAIModal(false)}
        >
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Generate Page with AI</h2>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe the page you want to create..."
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAIModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAIGenerate}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

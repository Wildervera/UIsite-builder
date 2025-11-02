"use client"

import { ArrowLeft, Plus, Undo2, Redo2, Menu, Monitor, Tablet, Smartphone, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DesignPage() {
  const [projectName, setProjectName] = useState("Untitled Project")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [zoom, setZoom] = useState(57)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editContent, setEditContent] = useState("")

  const handleElementClick = (element: string) => {
    setSelectedElement(element)
    setShowEditModal(true)
    console.log("[v0] Selected element:", element)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving edit for:", selectedElement, editContent)
    setShowEditModal(false)
    setEditContent("")
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-lg p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="rounded-lg border-0 bg-transparent px-2 py-1 text-sm font-medium focus:bg-gray-50 focus:outline-none"
          />
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1">
          <Link href="/sitemap" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Sitemap
          </Link>
          <Link href="/wireframe" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Wireframe
          </Link>
          <Link href="/style-guide" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Style Guide
          </Link>
          <button className="rounded-lg border-b-2 border-black px-4 py-2 text-sm font-medium">
            Design
            <span className="ml-2 rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-600">Beta</span>
          </button>
        </nav>

        <div className="w-32" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="flex w-16 flex-col items-center gap-2 border-r border-gray-200 bg-white py-4">
          <button onClick={() => console.log("[v0] Edit mode activated")} className="rounded-lg p-2 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button onClick={() => console.log("[v0] Adding new element")} className="rounded-lg p-2 hover:bg-gray-100">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Page Tabs */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm shadow-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </button>
            </div>
            <button className="rounded p-1 hover:bg-gray-200">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-lg">
              {/* Header Section */}
              <div
                className="flex items-center justify-between border-b border-gray-200 px-8 py-4 hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => handleElementClick("header")}
              >
                <div className="font-serif italic">Logo</div>
                <nav className="flex items-center gap-6 text-sm">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Link One
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Link Two
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Link Three
                  </a>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                    Link Four
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">Button</button>
                  <button className="rounded-md bg-[#FF4500] px-4 py-2 text-white hover:bg-[#FF4500]/90">Button</button>
                </nav>
              </div>

              {/* Hero Section */}
              <div
                className="grid grid-cols-2 gap-12 px-8 py-16 hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => handleElementClick("hero")}
              >
                <div className="flex flex-col justify-center">
                  <h1 className="mb-6 text-4xl font-medium leading-tight">Medium length hero heading goes here</h1>
                  <p className="mb-6 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                    tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                    vitae erat.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
                    />
                    <button className="rounded-md bg-[#FF4500] px-6 py-2 text-white hover:bg-[#FF4500]/90">
                      Sign up
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
                  </p>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-32 w-32 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
              </div>

              {/* Social Proof Section */}
              <div
                className="border-t border-gray-200 px-8 py-12 hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => handleElementClick("social-proof")}
              >
                <p className="mb-6 text-center text-sm text-gray-600">Used by the world's leading companies</p>
                <div className="flex items-center justify-center gap-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12">
                      <svg className="h-6 w-20" viewBox="0 0 80 24" fill="currentColor">
                        <text x="0" y="18" className="text-base font-bold">
                          Webflow
                        </text>
                      </svg>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-black" />
                        <span className="text-base font-bold">Relume</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div
                className="border-t border-gray-200 px-8 py-16 hover:bg-blue-50/50 cursor-pointer transition-colors"
                onClick={() => handleElementClick("content")}
              >
                <p className="mb-2 text-center text-sm text-gray-600">Tagline</p>
                <h2 className="mb-4 text-center text-3xl font-medium">Short heading goes here</h2>
                <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                          <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="mb-2 font-medium">Medium length</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Undo2 className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Redo2 className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Project
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setDevice("desktop")}
              className={`rounded p-1 ${device === "desktop" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`rounded p-1 ${device === "tablet" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`rounded p-1 ${device === "mobile" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <Smartphone className="h-4 w-4" />
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

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowEditModal(false)}
        >
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Edit {selectedElement}</h2>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Enter your changes or describe what you want to modify..."
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
              rows={6}
            />
            <div className="flex justify-between">
              <button
                onClick={() => console.log("[v0] AI assist for:", selectedElement)}
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                AI Assist
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="rounded-lg bg-black px-4 py-2 text-white hover:bg-black/90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

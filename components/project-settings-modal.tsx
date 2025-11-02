"use client"

import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { useState } from "react"

interface ProjectSettingsModalProps {
  onClose: () => void
}

export function ProjectSettingsModal({ onClose }: ProjectSettingsModalProps) {
  const [description, setDescription] = useState("")
  const [pages, setPages] = useState("2-5")
  const [language, setLanguage] = useState("English (US)")
  const [websiteUrl, setWebsiteUrl] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Project</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <button className="text-sm text-gray-500 hover:text-gray-700">Try example</button>
          </div>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the company in a sentence or two to generate a sitemap..."
              className="min-h-32 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
            />
            <button className="absolute bottom-3 right-3 flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700">
              Prompt <span className="text-lg">+</span>
            </button>
          </div>
        </div>

        {/* Number of pages */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Number of pages</label>
          <select
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
          >
            <option>2-5</option>
            <option>6-10</option>
            <option>11-20</option>
            <option>20+</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
          >
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">Or</span>
          </div>
        </div>

        {/* Import sitemap */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Import sitemap</label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Enter website URL"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Generate Button */}
        <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
          <Sparkles className="h-4 w-4" />
          Generate sitemap
        </Button>
      </div>
    </div>
  )
}

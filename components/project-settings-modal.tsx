"use client"

import { Button } from "@/components/ui/button"
import { X, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"

interface ProjectSettingsModalProps {
  onClose: () => void
  onGenerate: (data: {
    description: string
    numberOfPages: string
    language: string
  }) => void
  onImport?: (url: string) => void
  initialDescription?: string
  initialPages?: string
  initialLanguage?: string
}

export function ProjectSettingsModal({
  onClose,
  onGenerate,
  onImport,
  initialDescription = "",
  initialPages = "2-5",
  initialLanguage = "English (US)"
}: ProjectSettingsModalProps) {
  const [description, setDescription] = useState(initialDescription)
  const [pages, setPages] = useState(initialPages)
  const [language, setLanguage] = useState(initialLanguage)
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const exampleDescriptions = [
    "A SaaS platform for project management with team collaboration features, task tracking, and real-time updates.",
    "An e-commerce store selling eco-friendly home products with a focus on sustainability and modern design.",
    "A digital marketing agency specializing in SEO, content marketing, and social media management for small businesses.",
  ]

  const handleTryExample = () => {
    const randomExample = exampleDescriptions[Math.floor(Math.random() * exampleDescriptions.length)]
    setDescription(randomExample)
  }

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    onGenerate({ description, numberOfPages: pages, language })
    setIsGenerating(false)
  }

  const handleImport = async () => {
    if (!websiteUrl.trim()) return

    setIsImporting(true)
    // Simulate import delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (onImport) {
      onImport(websiteUrl)
    }
    setIsImporting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Project Settings</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100" disabled={isGenerating || isImporting}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <button
              onClick={handleTryExample}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              disabled={isGenerating || isImporting}
            >
              Try example
            </button>
          </div>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the company in a sentence or two to generate a sitemap..."
              className="min-h-32 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
              disabled={isGenerating || isImporting}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {description.length} characters
            </div>
          </div>
        </div>

        {/* Number of pages */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Number of pages</label>
          <select
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
            disabled={isGenerating || isImporting}
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
            disabled={isGenerating || isImporting}
          >
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Portuguese</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>Japanese</option>
          </select>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!description.trim() || isGenerating || isImporting}
          className="w-full gap-2 bg-purple-600 hover:bg-purple-700 mb-6"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate sitemap
            </>
          )}
        </Button>

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
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Import sitemap</label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
            disabled={isGenerating || isImporting}
          />
        </div>

        <Button
          onClick={handleImport}
          disabled={!websiteUrl.trim() || isGenerating || isImporting}
          variant="outline"
          className="w-full"
        >
          {isImporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Importing...
            </>
          ) : (
            'Import from URL'
          )}
        </Button>
      </div>
    </div>
  )
}

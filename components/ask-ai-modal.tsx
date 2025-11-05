"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"

interface AskAIModalProps {
  onClose: () => void
  onGenerate: (prompt: string) => void
  title?: string
  placeholder?: string
}

export function AskAIModal({
  onClose,
  onGenerate,
  title = "Ask AI",
  placeholder = "Describe what you want to add or modify..."
}: AskAIModalProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    onGenerate(prompt)
    setIsGenerating(false)
    onClose()
  }

  const examplePrompts = [
    "Add a pricing section with 3 tiers",
    "Create a testimonials section with 6 reviews",
    "Add an FAQ section with 8 common questions",
    "Generate a features section highlighting key benefits",
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            What would you like to do?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="min-h-32 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
            autoFocus
          />
        </div>

        {/* Example Prompts */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-medium text-gray-500">
            Example prompts:
          </label>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700"
            disabled={!prompt.trim() || isGenerating}
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  )
}

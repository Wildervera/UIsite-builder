"use client"

import { useState } from "react"
import { X, Search, ChevronRight } from "lucide-react"
import { SECTION_TEMPLATES, SECTION_CATEGORIES, type SectionTemplate } from "@/lib/sitemap-types"

interface AddSectionPanelProps {
  isOpen: boolean
  onClose: () => void
  onAddSection: (template: SectionTemplate) => void
}

export function AddSectionPanel({ isOpen, onClose, onAddSection }: AddSectionPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  if (!isOpen) return null

  const filteredTemplates = SECTION_TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {} as Record<string, SectionTemplate[]>)

  return (
    <div className="fixed left-16 top-0 bottom-0 z-40 w-80 border-r border-gray-200 bg-white shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2">
          {SECTION_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Saved Templates */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Saved</h3>
          <div className="text-sm text-gray-500">
            <p className="mb-1">Page Templates (0 saved)</p>
          </div>
        </div>

        {/* Template Categories */}
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h3>
            <div className="space-y-1">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onAddSection(template)}
                  className="group w-full flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-left hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                      {template.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {template.description}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No sections found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

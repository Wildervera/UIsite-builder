"use client"

import type { SectionColor } from "@/lib/sitemap-types"

interface ColorPickerProps {
  currentColor: SectionColor
  onColorChange: (color: SectionColor) => void
}

const COLORS: { value: SectionColor; label: string; class: string }[] = [
  { value: 'none', label: 'None', class: 'bg-white border-2 border-gray-300' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-400' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-400' },
  { value: 'green', label: 'Green', class: 'bg-green-400' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-400' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-400' },
  { value: 'red', label: 'Red', class: 'bg-red-400' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-400' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-400' },
]

export function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="p-2">
      <div className="mb-2 text-xs font-medium text-gray-700">Section Color</div>
      <div className="grid grid-cols-5 gap-2">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`group relative h-8 w-8 rounded-lg ${color.class} hover:scale-110 transition-transform ${
              currentColor === color.value ? 'ring-2 ring-purple-600 ring-offset-2' : ''
            }`}
            title={color.label}
          >
            {currentColor === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-4 w-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

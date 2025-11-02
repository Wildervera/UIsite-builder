"use client"

import { ArrowLeft, Sun, Moon, Sparkles, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function StyleGuidePage() {
  const [concept, setConcept] = useState("Concept 1")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [colors, setColors] = useState(["#FFFFFF", "#FF4500", "#1E90FF", "#32CD32"])

  const handleShuffleColors = () => {
    console.log("[v0] Shuffling colors")
    const newColors = Array(4)
      .fill(0)
      .map(
        () =>
          `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`,
      )
    setColors(newColors)
  }

  const handleShuffleTypography = () => {
    console.log("[v0] Shuffling typography")
  }

  const handleShuffleUI = () => {
    console.log("[v0] Shuffling UI styling")
  }

  const handlePitchConcepts = () => {
    console.log("[v0] Opening pitch concepts")
  }

  return (
    <div className={`flex h-screen flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:bg-gray-800 dark:text-white">
        <div className="flex items-center gap-4">
          <Link href="/" className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <input
            type="text"
            defaultValue="Untitled Project"
            className="rounded-lg border-0 bg-transparent px-2 py-1 text-sm font-medium focus:bg-gray-50 focus:outline-none dark:focus:bg-gray-800"
          />
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/sitemap"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
          >
            Sitemap
          </Link>
          <Link
            href="/wireframe"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
          >
            Wireframe
          </Link>
          <button
            className={`rounded-lg border-b-2 border-black px-4 py-2 text-sm font-medium ${theme === "dark" ? "dark:border-white" : ""}`}
          >
            Style Guide
          </button>
          <Link
            href="/design"
            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
          >
            Design
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Beta
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePitchConcepts}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Pitch Concepts
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700">
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Style Guide Editor */}
        <div className="w-[800px] overflow-y-auto border-r border-gray-200 bg-white p-8 dark:bg-gray-800 dark:text-white">
          {/* Concept Selector */}
          <div className="mb-8">
            <select
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium focus:border-gray-300 focus:outline-none dark:border-gray-600 dark:focus:border-gray-400"
            >
              <option>Concept 1</option>
              <option>Concept 2</option>
              <option>Concept 3</option>
            </select>
          </div>

          {/* Colors Section */}
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Colors</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`rounded-lg border border-gray-200 p-2 ${theme === "light" ? "bg-gray-100" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`rounded-lg border border-gray-200 p-2 ${theme === "dark" ? "bg-gray-100" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  <Moon className="h-4 w-4" />
                </button>
                <button
                  onClick={handleShuffleColors}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Shuffle
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">
                    C
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Neutrals */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-600">
                <div className="space-y-0">
                  <div className="h-12 bg-white dark:bg-gray-900"></div>
                  <div className="h-12 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-12 bg-gray-500 dark:bg-gray-600"></div>
                  <div className="h-12 bg-gray-700 dark:bg-gray-500"></div>
                  <div className="h-12 bg-black dark:bg-gray-400"></div>
                </div>
                <div className="bg-white p-3 dark:bg-gray-800">
                  <p className="text-sm font-medium dark:text-white">Neutrals</p>
                </div>
              </div>

              {/* Vermilion */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FF4500] dark:border-gray-600">
                <div className="flex h-[288px] flex-col justify-between p-4 text-white dark:text-black">
                  <div>
                    <p className="text-sm font-medium dark:text-white">Vermilion</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xl font-semibold dark:text-black">FF4500</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-white/30 dark:bg-gray-900/30"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900"></div>
                      <div className="h-1 w-8 rounded-full bg-black/30 dark:bg-gray-400/30"></div>
                    </div>
                    <p className="mt-2 text-xs dark:text-white">Main</p>
                  </div>
                </div>
              </div>

              {/* Dodger Blue & Apple */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#1E90FF] dark:border-gray-600">
                  <div className="flex h-[138px] flex-col justify-between p-4 text-white dark:text-black">
                    <p className="text-sm font-medium dark:text-white">Dodger Bl...</p>
                    <div>
                      <p className="mb-2 text-lg font-semibold dark:text-black">1E90FF</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-white/30 dark:bg-gray-900/30"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900"></div>
                        <div className="h-1 w-8 rounded-full bg-black/30 dark:bg-gray-400/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#32CD32] dark:border-gray-600">
                  <div className="flex h-[138px] flex-col justify-between p-4 text-white dark:text-black">
                    <p className="text-sm font-medium dark:text-white">Apple</p>
                    <div>
                      <p className="mb-2 text-lg font-semibold dark:text-black">32CD32</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-white/30 dark:bg-gray-900/30"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900"></div>
                        <div className="h-1 w-8 rounded-full bg-black/30 dark:bg-gray-400/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Color */}
              <button className="flex h-[288px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Plus className="h-8 w-8 text-gray-400 dark:text-gray-600" />
              </button>
            </div>
          </div>

          {/* Typography Section */}
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">Typography</h2>
              <div className="flex items-center gap-2">
                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none dark:border-gray-600 dark:focus:border-gray-400">
                  <option>Regular - medium</option>
                  <option>Light</option>
                  <option>Bold</option>
                </select>
                <button
                  onClick={handleShuffleTypography}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Shuffle
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">
                    T
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Heading */}
              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                <p className="mb-4 text-sm text-gray-600 dark:text-white">Heading</p>
                <p className="mb-4 text-5xl font-medium" style={{ fontFamily: "Fustat, sans-serif" }}>
                  Fustat
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                  <span className="flex items-center gap-1">
                    <span className="text-blue-600 dark:text-blue-300">G</span>
                    <span className="text-red-600 dark:text-red-300">o</span>
                    <span className="text-yellow-600 dark:text-yellow-300">o</span>
                    <span className="text-blue-600 dark:text-blue-300">g</span>
                    <span className="text-green-600 dark:text-green-300">l</span>
                    <span className="text-red-600 dark:text-red-300">e</span>
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">
                    Free
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                <p className="mb-4 text-sm text-gray-600 dark:text-white">Body</p>
                <p className="mb-4 text-5xl font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  Inter
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                  <span className="flex items-center gap-1">
                    <span className="text-blue-600 dark:text-blue-300">G</span>
                    <span className="text-red-600 dark:text-red-300">o</span>
                    <span className="text-yellow-600 dark:text-yellow-300">o</span>
                    <span className="text-blue-600 dark:text-blue-300">g</span>
                    <span className="text-green-600 dark:text-green-300">l</span>
                    <span className="text-red-600 dark:text-red-300">e</span>
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">
                    Free
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* UI Styling Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold dark:text-white">UI Styling</h2>
              <button
                onClick={handleShuffleUI}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <Sparkles className="h-4 w-4 text-purple-600" />
                Shuffle
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-700 dark:text-gray-300">U</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Buttons & Forms */}
              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                <p className="mb-6 text-sm font-medium dark:text-white">Buttons & Forms</p>
                <div className="mb-6 flex items-center gap-3">
                  <button className="rounded-lg bg-[#FF4500] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#FF4500]/90 dark:hover:bg-[#FF4500]/80">
                    Button
                  </button>
                  <button className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    Button
                  </button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Label</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Placeholder</p>
                </div>
              </div>

              {/* Cards & Images */}
              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                <p className="mb-6 text-sm font-medium dark:text-white">Cards & Images</p>
                <div className="flex gap-3">
                  <img
                    src="/majestic-mountain-vista.png"
                    alt="Mountain"
                    className="h-[120px] w-[100px] rounded-lg object-cover"
                  />
                  <div className="flex-1 rounded-lg border border-gray-200 bg-white p-3 dark:bg-gray-800 dark:text-white">
                    <img
                      src="/majestic-mountain-peaks.png"
                      alt="Mountain peaks"
                      className="mb-2 h-[60px] w-full rounded object-cover"
                    />
                    <p className="mb-1 text-xs font-medium dark:text-white">Flat Card</p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400">
                      Pick a card style that matches your overall aesthetic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-8 dark:bg-gray-800 dark:text-white">
          <div className="mx-auto max-w-4xl">
            {/* Preview Header */}
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-600">
              <p className="font-serif italic dark:text-white">Logo</p>
              <nav className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                  Link One
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                  Link Two
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                  Link Three
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300">
                  Link Four
                </a>
                <button className="rounded-lg bg-[#FF4500] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF4500]/90 dark:hover:bg-[#FF4500]/80">
                  Button
                </button>
              </nav>
            </div>

            {/* Hero Section */}
            <div className="mb-12 grid grid-cols-2 gap-8">
              <div>
                <h1 className="mb-4 text-5xl font-medium leading-tight dark:text-white">
                  Medium length hero heading goes here
                </h1>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                  tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                  vitae erat.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gray-300 focus:outline-none dark:border-gray-600 dark:focus:border-gray-400"
                  />
                  <button className="rounded-lg bg-[#FF4500] px-6 py-2 text-sm font-medium text-white hover:bg-[#FF4500]/90 dark:hover:bg-[#FF4500]/80">
                    Sign up
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
                </p>
              </div>
              <div className="rounded-lg bg-gray-200 p-8 dark:bg-gray-700">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-gray-400 dark:text-gray-500">
                    <div className="mx-auto mb-2 h-16 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logos Section */}
            <div className="mb-12">
              <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Used by the world's leading companies
              </p>
              <div className="flex items-center justify-center gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-lg font-bold dark:text-white">W</div>
                    <span className="text-sm font-medium dark:text-white">{i % 2 === 0 ? "Relume" : "Webflow"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:bg-gray-800 dark:text-white">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Tagline</p>
              <h2 className="mb-4 text-3xl font-medium dark:text-white">Short heading goes here</h2>
              <button className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-300">
                <Sparkles className="h-4 w-4" />
                Scheme shuffle
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  SPACE
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

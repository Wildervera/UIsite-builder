"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Download, Plus, Gift, ChevronRight, HelpCircle, MoreVertical, ExternalLink, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Dashboard() {
  const [showImportModal, setShowImportModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Left Sidebar */}
      <aside className="w-72 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
              <div className="h-4 w-4 rounded bg-white" />
            </div>
            <span className="text-lg font-semibold">Relume</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {/* Site Builder - Active */}
            <button className="flex w-full items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-left text-sm font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
                  <path d="M3 9h18M9 21V9" strokeWidth={2} />
                </svg>
              </div>
              Site Builder
            </button>

            {/* Personal */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-white">
                  WV
                </div>
                <span className="text-sm font-medium">Personal</span>
              </div>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">Free</span>
            </div>

            {/* Create a team */}
            <button
              onClick={() => setShowTeamModal(true)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-600 hover:text-gray-900"
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <Plus className="h-5 w-5 text-red-500" />
              </div>
              Create a team
            </button>

            {/* Figma Library */}
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 2a3 3 0 0 0 0 6v6a3 3 0 1 0 3 3V8a3 3 0 1 0 3-3V2H8z" />
                </svg>
              </div>
              Figma Library
            </button>

            {/* Webflow Library */}
            <button className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 2L24 12l-6.5 10h-11L0 12 6.5 2z" />
                  </svg>
                </div>
                Webflow Library
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* React Library */}
            <button className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white">
                  <svg className="h-4 w-4 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="2" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth={1.5} />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="10"
                      ry="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      transform="rotate(60 12 12)"
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="10"
                      ry="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      transform="rotate(120 12 12)"
                    />
                  </svg>
                </div>
                React Library
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </nav>

          {/* Invite & earn */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-gray-50"
            >
              <Gift className="h-5 w-5" />
              Invite & earn
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-3 px-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a project or a component"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setShowImportModal(true)}
              >
                <Download className="h-4 w-4" />
                Import from URL
              </Button>
              <Link href="/sitemap">
                <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </Link>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-white">
                WV
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-6xl">
            {/* Header with Upgrade Button */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Recent Projects</h1>
            </div>

            {/* Projects Left Banner */}
            <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
                  <path d="M9 3v18" strokeWidth={2} />
                </svg>
                <span className="text-sm">
                  You have <span className="font-semibold">0 projects left</span>. Get Pro for unlimited access
                </span>
              </div>
              <Button size="sm" className="bg-black hover:bg-black/90" onClick={() => setShowUpgradeModal(true)}>
                Upgrade to Pro
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Untitled Project Card */}
              <Card className="group relative overflow-hidden border-gray-200 bg-white transition-shadow hover:shadow-lg">
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-semibold">Untitled Project</h3>
                    <button className="rounded p-1 hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Edited 11 minutes ago</p>
                </div>
              </Card>

              {/* Getting Started Tutorials Card */}
              <Card className="group relative overflow-hidden border-gray-200 bg-black text-white transition-shadow hover:shadow-lg">
                <div className="relative h-full">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-11-02%20083345-L6lyyJTpynCrIxyN9Fwyjy4AQE5yKH.png"
                    alt="Tutorial presenter"
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <Play className="h-4 w-4" />
                      <span>10 videos</span>
                    </div>
                    <h3 className="text-xl font-semibold">Getting Started Tutorials</h3>
                  </div>
                  <button className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {showImportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowImportModal(false)}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Import from URL</h2>
            <input
              type="url"
              placeholder="Enter website URL"
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Import</Button>
            </div>
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Upgrade to Pro</h2>
            <p className="mb-4 text-gray-600">Get unlimited projects and access to all features.</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                Cancel
              </Button>
              <Button className="bg-black hover:bg-black/90">Upgrade Now</Button>
            </div>
          </div>
        </div>
      )}

      {showTeamModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowTeamModal(false)}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Create a Team</h2>
            <input
              type="text"
              placeholder="Team name"
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowTeamModal(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Create Team</Button>
            </div>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowInviteModal(false)}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-semibold">Invite & Earn</h2>
            <p className="mb-4 text-gray-600">Invite friends and earn rewards when they sign up!</p>
            <input
              type="email"
              placeholder="Enter email address"
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Send Invite</Button>
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-black/90">
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

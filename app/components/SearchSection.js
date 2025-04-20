"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import RelevanceFilter from "./RelevanceFilter"

export default function SearchSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [relevanceScore, setRelevanceScore] = useState(0)

  const handleSearch = (e) => {
    e.preventDefault()

    // Build query parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (relevanceScore > 0) params.set("minRelevance", relevanceScore.toString())

    // Navigate to activities page with search parameters
    router.push(`/activities?${params.toString()}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Your Next Adventure</h2>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities, locations, or categories..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Filter by Relevance Score</h3>
            <RelevanceFilter value={relevanceScore} onChange={setRelevanceScore} />
          </div>
        </form>
      </div>
    </section>
  )
}

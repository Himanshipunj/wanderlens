"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FaFilter, FaTimes } from "react-icons/fa"
import RelevanceFilter from "./RelevanceFilter"

export default function FilterControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get initial values from URL
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [minRelevance, setMinRelevance] = useState(
    searchParams.get("minRelevance") ? Number.parseInt(searchParams.get("minRelevance")) : 0
  )
  const [search, setSearch] = useState(searchParams.get("search") || "")

  // Available categories
  const categories = [
    "All Categories",
    "Outdoor Adventure",
    "Cultural",
    "Food & Drink",
    "Water Activities",
    "Wellness",
    "Nature",
    "Urban Exploration",
  ]

  // Apply filters (memoized)
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()

    if (category && category !== "All Categories") params.set("category", category)
    if (minRelevance > 0) params.set("minRelevance", minRelevance.toString())
    if (search) params.set("search", search)

    router.push(`/activities?${params.toString()}`)
  }, [category, minRelevance, search, router])

  // Clear all filters
  const clearFilters = () => {
    setCategory("")
    setMinRelevance(0)
    setSearch("")
    router.push("/activities")
  }

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  // Apply filters when values change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters()
    }, 500)

    return () => clearTimeout(timer)
  }, [applyFilters])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-medium flex items-center gap-2">
          <FaFilter className="h-4 w-4" />
          Filter Activities
        </h2>

        {(category || minRelevance > 0 || search) && (
          <button onClick={clearFilters} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <FaTimes className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All Categories" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Relevance Score</label>
          <RelevanceFilter value={minRelevance} onChange={setMinRelevance} />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={applyFilters}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

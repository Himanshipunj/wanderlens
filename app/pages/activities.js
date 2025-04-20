"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import Layout from "../components/Layout"
import ActivityCard from "../components/ActivityCard"
import SearchBar from "../components/SearchBar"
import RelevanceFilter from "../components/RelevanceFilter"

export default function Activities({ activities }) {
  const [filteredActivities, setFilteredActivities] = useState(activities)
  const [minRelevance, setMinRelevance] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("desc") // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Get unique categories
  const categories = ["all", ...new Set(activities.map((activity) => activity.category))]

  useEffect(() => {
    let filtered = activities.filter((activity) => {
      const matchesRelevance = activity.relevanceScore >= minRelevance
      const matchesSearch =
        searchTerm === "" ||
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter

      return matchesRelevance && matchesSearch && matchesCategory
    })

    // Sort by relevance score
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.relevanceScore - b.relevanceScore
      } else {
        return b.relevanceScore - a.relevanceScore
      }
    })

    setFilteredActivities(filtered)
  }, [minRelevance, searchTerm, sortOrder, categoryFilter, activities])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleRelevanceChange = (value) => {
    setMinRelevance(value)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <Layout>
      <Head>
        <title>Browse Activities | WanderLens</title>
        <meta name="description" content="Browse and discover travel activities around the world" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Activities</h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={toggleSortOrder}
              >
                {sortOrder === "desc" ? (
                  <>
                    <FaSortAmountDown className="mr-2" />
                    <span>Highest Relevance</span>
                  </>
                ) : (
                  <>
                    <FaSortAmountUp className="mr-2" />
                    <span>Lowest Relevance</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <RelevanceFilter minRelevance={minRelevance} onChange={handleRelevanceChange} />
          </div>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No activities found matching your criteria</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {
                setMinRelevance(1)
                setSearchTerm("")
                setCategoryFilter("all")
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    // This would be replaced with the actual API call to SharpAPI
    // For now, we'll use mock data with more activities
    const activities = [
      {
        id: 1,
        name: "Guided Mountain Hiking Tour",
        category: "Outdoor Adventure",
        relevanceScore: 9,
        image: "/placeholder.svg?height=300&width=400",
        description: "Experience breathtaking views on this guided mountain hiking tour.",
      },
      {
        id: 2,
        name: "Historical City Walking Tour",
        category: "Cultural",
        relevanceScore: 8,
        image: "/placeholder.svg?height=300&width=400",
        description: "Discover the rich history of the city with expert local guides.",
      },
      {
        id: 3,
        name: "Sunset Sailing Experience",
        category: "Water Activities",
        relevanceScore: 7,
        image: "/placeholder.svg?height=300&width=400",
        description: "Relax and enjoy a beautiful sunset from the water.",
      },
      {
        id: 4,
        name: "Local Cuisine Cooking Class",
        category: "Food & Drink",
        relevanceScore: 6,
        image: "/placeholder.svg?height=300&width=400",
        description: "Learn to cook authentic local dishes with professional chefs.",
      },
      {
        id: 5,
        name: "Wildlife Safari Adventure",
        category: "Nature & Wildlife",
        relevanceScore: 10,
        image: "/placeholder.svg?height=300&width=400",
        description: "Get up close with amazing wildlife in their natural habitat.",
      },
      {
        id: 6,
        name: "Museum Guided Tour",
        category: "Arts & Culture",
        relevanceScore: 5,
        image: "/placeholder.svg?height=300&width=400",
        description: "Explore world-class art and artifacts with expert commentary.",
      },
      {
        id: 7,
        name: "Scuba Diving Excursion",
        category: "Water Activities",
        relevanceScore: 8,
        image: "/placeholder.svg?height=300&width=400",
        description: "Explore the underwater world with certified diving instructors.",
      },
      {
        id: 8,
        name: "Wine Tasting Tour",
        category: "Food & Drink",
        relevanceScore: 7,
        image: "/placeholder.svg?height=300&width=400",
        description: "Sample local wines at renowned vineyards with expert sommeliers.",
      },
      {
        id: 9,
        name: "Hot Air Balloon Ride",
        category: "Outdoor Adventure",
        relevanceScore: 9,
        image: "/placeholder.svg?height=300&width=400",
        description: "Soar above the landscape for unforgettable views and photos.",
      },
      {
        id: 10,
        name: "Traditional Dance Performance",
        category: "Arts & Culture",
        relevanceScore: 6,
        image: "/placeholder.svg?height=300&width=400",
        description: "Experience authentic cultural performances by local artists.",
      },
      {
        id: 11,
        name: "Zip-lining Adventure",
        category: "Outdoor Adventure",
        relevanceScore: 8,
        image: "/placeholder.svg?height=300&width=400",
        description: "Fly through the forest canopy on exciting zip-lines.",
      },
      {
        id: 12,
        name: "Street Food Walking Tour",
        category: "Food & Drink",
        relevanceScore: 9,
        image: "/placeholder.svg?height=300&width=400",
        description: "Taste authentic local street food with knowledgeable guides.",
      },
    ]

    return {
      props: {
        activities,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: {
        activities: [],
      },
    }
  }
}

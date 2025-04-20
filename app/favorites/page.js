"use client"

import { useEffect, useState } from "react"
import ActivityGrid from "@components/ActivityGrid"
import EmptyState from "@components/EmptyState"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("wanderlens-favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse">Loading your favorites...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Activities</h1>

      {favorites.length > 0 ? (
        <ActivityGrid activities={favorites} />
      ) : (
        <EmptyState
          title="No favorites yet"
          description="Save activities you're interested in to find them here later."
          actionLabel="Browse Activities"
          actionHref="/activities"
        />
      )}
    </div>
  )
}

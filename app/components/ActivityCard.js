// components/ActivityCard.js
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FaHeart, FaMapPin } from "react-icons/fa"

export default function ActivityCard({ activity }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedFavorites = localStorage.getItem("wanderlens-favorites")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some((fav) => fav.id === activity.id))
    }
  }, [activity.id])

  const toggleFavorite = () => {
    if (!isMounted) return
    
    const storedFavorites = localStorage.getItem("wanderlens-favorites")
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== activity.id)
    } else {
      favorites.push({
        id: activity.id,
        name: activity.name,
        image: activity.image,
        location: activity.location
      })
    }

    localStorage.setItem("wanderlens-favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  if (!isMounted) return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-[400px] animate-pulse"></div>
  )

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={activity.image || "/placeholder.svg"}
          alt={activity.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? "bg-white text-red-500" : "bg-white/80 text-gray-600 hover:text-red-500"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
            {activity.category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-teal-600">{activity.relevanceScore}</span>
            <span className="text-xs text-gray-500">/10</span>
          </div>
        </div>

        <h3 className="font-bold mb-1">{activity.name}</h3>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaMapPin className="h-3 w-3 mr-1" />
          {activity.location}
        </div>

        <div className="mb-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full"
              style={{ width: `${activity.relevanceScore * 10}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500 text-right">Relevance Score</div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{activity.description}</p>

        <button
          className="w-full py-2 bg-teal-50 text-teal-700 rounded-md text-sm font-medium hover:bg-teal-100 transition-colors"
          onClick={() => {
            const searchQuery = encodeURIComponent(`${activity.name} ${activity.location} travel activity`)
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank")
          }}
        >
          View Details
        </button>
      </div>
    </div>
  )
}
"use client"

import ActivityCard from "./ActivityCard"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import { getFeaturedActivities } from "@/lib/api"

export default function FeaturedActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    async function loadActivities() {
      try {
        const data = await getFeaturedActivities(16)
        setActivities(data)
      } catch (error) {
        console.error("Failed to load activities:", error)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }
    
    loadActivities()
  }, [])

  if (!isMounted) {
    return (
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-96 animate-pulse"></div>
          ))}
        </div>
      </section>
    )
  }

  if (loading) {
    return <div className="py-12 text-center">Loading activities...</div>
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Activities</h2>
        <Link
          href="/activities"
          className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm font-medium"
          prefetch={false}
        >
          View all <FaArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  )
}
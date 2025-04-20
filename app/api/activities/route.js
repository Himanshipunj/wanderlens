import { NextResponse } from "next/server"
import { mockActivitiesData } from '@/lib/api'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const minRelevance = searchParams.get("minRelevance")
    const search = searchParams.get("search")

    let filteredData = [...mockActivitiesData]

    // Apply filters
    if (category && category !== "All Categories") {
      filteredData = filteredData.filter(item => item.category === category)
    }

    if (minRelevance) {
      const minScore = Number.parseInt(minRelevance, 10)
      filteredData = filteredData.filter(item => item.relevanceScore >= minScore)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json(filteredData)
  } catch (error) {
    console.error("Error in /api/activities:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
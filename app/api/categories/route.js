import { NextResponse } from "next/server"

/**
 * Handler for GET /api/categories
 */
export async function GET() {
  try {
    // Return mock data
    return NextResponse.json(getMockCategories())
  } catch (error) {
    console.error("Error in /api/categories:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Mock categories data
function getMockCategories() {
  return [
    "All Categories",
    "Outdoor Adventure",
    "Cultural",
    "Water Activities",
    "Food & Drink",
    "Nature",
    "Urban Exploration",
    "Wellness",
  ]
}

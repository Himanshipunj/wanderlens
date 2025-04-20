import { NextResponse } from "next/server"

/**
 * Handler for GET /api/activities/featured
 */
export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "4", 10)

    // Return mock data
    return NextResponse.json(getMockFeaturedActivities(limit))
  } catch (error) {
    console.error("Error in /api/activities/featured:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Mock featured activities data
function getMockFeaturedActivities(limit = 4) {
  const mockActivities = [
    {
      id: "1",
      name: "Guided Mountain Hiking Tour",
      category: "Outdoor Adventure",
      relevanceScore: 9,
      image: "/mountainhiking.jpg",
      description:
        "Experience breathtaking views with our expert mountain guides on this half-day hiking tour. Suitable for all fitness levels.",
      location: "Swiss Alps",
      price: 89,
      duration: "4 hours",
      groupSize: "Small group",
      languages: ["English", "German", "French"],
      included: ["Professional guide", "Snacks", "Safety equipment"],
      reviews: {
        average: 4.8,
        count: 156,
      },
    },
    {
      id: "5",
      name: "Wildlife Safari Adventure",
      category: "Nature",
      relevanceScore: 9,
      image: "/wildlifesafari.jpg",
      description:
        "Observe exotic wildlife in their natural habitat with experienced guides. Opportunity to see the Big Five.",
      location: "Serengeti, Tanzania",
      price: 195,
      duration: "Full day",
      groupSize: "Small group",
      languages: ["English"],
      included: ["Transportation", "Guide", "Lunch", "Refreshments"],
      reviews: {
        average: 4.9,
        count: 87,
      },
    },
    {
      id: "9",
      name: "Scuba Diving Experience",
      category: "Water Activities",
      relevanceScore: 9,
      image: "/scubadiving.jpg",
      description:
        "Explore vibrant coral reefs and marine life with certified instructors. Suitable for beginners and experienced divers.",
      location: "Great Barrier Reef, Australia",
      price: 150,
      duration: "Half day",
      groupSize: "Small group",
      languages: ["English"],
      included: ["Equipment", "Instructor", "Boat trip", "Lunch"],
      reviews: {
        average: 4.9,
        count: 201,
      },
    },
    {
      id: "10",
      name: "Ancient Temple Exploration",
      category: "Cultural",
      relevanceScore: 10,
      image: "/ancienttemple.jpg",
      description: "Discover ancient temples and learn about their historical significance with expert archaeologists.",
      location: "Siem Reap, Cambodia",
      price: 85,
      duration: "Full day",
      groupSize: "Medium group",
      languages: ["English", "Khmer"],
      included: ["Transportation", "Guide", "Entrance fees", "Lunch"],
      reviews: {
        average: 4.8,
        count: 176,
      },
    },
  ]

  return mockActivities.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit)
}

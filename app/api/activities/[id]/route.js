import { NextResponse } from "next/server"

/**
 * Handler for GET /api/activities/[id]
 */
export async function GET(request, { params }) {
  try {
    const id = params.id

    // Return mock data
    const mockActivity = getMockActivity(id)
    if (mockActivity) {
      return NextResponse.json(mockActivity)
    }

    return NextResponse.json({ error: "Activity not found" }, { status: 404 })
  } catch (error) {
    console.error(`Error in /api/activities/${params.id}:`, error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Mock activity data
function getMockActivity(id) {
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
      id: "2",
      name: "Historical City Walking Tour",
      category: "Cultural",
      relevanceScore: 8,
      image: "/historicalcity.jpg",
      description: "Discover hidden gems and fascinating history in this guided city tour led by local historians.",
      location: "Rome, Italy",
      price: 45,
      duration: "3 hours",
      groupSize: "Medium group",
      languages: ["English", "Italian", "Spanish"],
      included: ["Professional guide", "Museum entry"],
      reviews: {
        average: 4.6,
        count: 203,
      },
    },
    {
      id: "3",
      name: "Sunset Sailing Experience",
      category: "Water Activities",
      relevanceScore: 7,
      image: "/sunsetsailing.jpg",
      description: "Relax and enjoy stunning sunset views from the water with complimentary drinks and appetizers.",
      location: "Santorini, Greece",
      price: 120,
      duration: "2.5 hours",
      groupSize: "Small group",
      languages: ["English", "Greek"],
      included: ["Captain and crew", "Drinks", "Snacks"],
      reviews: {
        average: 4.9,
        count: 178,
      },
    },
    {
      id: "4",
      name: "Local Cuisine Cooking Class",
      category: "Food & Drink",
      relevanceScore: 8,
      image: "/localcuisine.jpg",
      description: "Learn to prepare authentic local dishes with expert chefs in a hands-on cooking class.",
      location: "Bangkok, Thailand",
      price: 65,
      duration: "4 hours",
      groupSize: "Small group",
      languages: ["English", "Thai"],
      included: ["Ingredients", "Recipe book", "Meal"],
      reviews: {
        average: 4.7,
        count: 142,
      },
    },
  ]

  return mockActivities.find((activity) => activity.id === id)
}

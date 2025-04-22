// API client for WanderLens
// Implementation with proper error handling and local development support

// Base API URL - we need to use absolute URLs
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

/**
 * Fetch wrapper with error handling
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    // Set default headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Get activities with optional filtering
 * @param {Object} params - Filter parameters
 * @returns {Promise<Array>} - Activities array
 */
async function getActivities(params = {}) {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.set("category", params.category);
    if (params.minRelevance)
      queryParams.set("minRelevance", params.minRelevance);
    if (params.search) queryParams.set("search", params.search);

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";

    // Make API request to our Next.js API route
    const activities = await fetchAPI(`/activities${queryString}`, {
      method: "GET",
    });

    return activities;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    // Fallback to mock data in case of API failure
    return getMockActivities(params);
  }
}

/**
 * Get a single activity by ID
 * @param {string} id - Activity ID
 * @returns {Promise<Object|null>} - Activity object or null if not found
 */
async function getActivityById(id) {
  try {
    // Make API request to our Next.js API route
    const activity = await fetchAPI(`/activities/${id}`, {
      method: "GET",
    });

    return activity;
  } catch (error) {
    console.error(`Failed to fetch activity ${id}:`, error);
    // Fallback to mock data in case of API failure
    const mockActivity = mockActivitiesData.find((a) => a.id === id);
    return mockActivity || null;
  }
}

/**
 * Get featured activities
 * @param {number} limit - Maximum number of activities to return
 * @returns {Promise<Array>} - Featured activities array
 */
async function getFeaturedActivities(limit = 16) {
  try {
    const activities = await fetchAPI(`/activities/featured?limit=${limit}`, {
      method: "GET",
    });
    return activities;
  } catch (error) {
    console.error("Failed to fetch featured activities:", error);
    // Return all mock activities sorted by relevance
    return mockActivitiesData
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit); // This will now return up to 16 activities
  }
}
/**
 * Get activity categories
 * @returns {Promise<Array>} - Categories array
 */
async function getCategories() {
  try {
    // Make API request to our Next.js API route
    const categories = await fetchAPI(`/categories`, {
      method: "GET",
    });

    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Fallback to extracting categories from mock data
    const mockCategories = [
      "All Categories",
      ...new Set(mockActivitiesData.map((activity) => activity.category)),
    ];
    return mockCategories;
  }
}

// Use stable IDs and values for mock data to prevent hydration errors
const mockActivitiesData = [
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
    category: "Cultural Experience",
    relevanceScore: 7,
    image: "/historicalcity.jpg",
    description:
      "Discover the rich history of our city with our knowledgeable guides. Explore famous landmarks and hidden gems.",
    location: "Paris, France",
    price: 65,
    duration: "3 hours",
    groupSize: "Medium group",
    languages: ["English", "French", "Spanish"],
    included: ["Professional guide", "Entrance fees"],
    reviews: {
      average: 4.5,
      count: 120,
    },
  },
  {
    id: "3",
    name: "Sunset Sailing Experience",
    category: "Water Activities",
    relevanceScore: 7,
    image: "/sunsetsailing.jpg",
    description:
      "Relax and enjoy stunning sunset views from the water with complimentary drinks and appetizers.",
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
    description:
      "Learn to prepare authentic local dishes with expert chefs in a hands-on cooking class.",
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
    id: "6",
    name: "Urban Street Art Tour",
    category: "Urban Exploration",
    relevanceScore: 6,
    image: "/urbanstreetart.jpg",
    description:
      "Discover the vibrant street art scene with local artists who know the stories behind the murals.",
    location: "Berlin, Germany",
    price: 35,
    duration: "2.5 hours",
    groupSize: "Medium group",
    languages: ["English", "German"],
    included: ["Local artist guide"],
    reviews: {
      average: 4.5,
      count: 112,
    },
  },
  {
    id: "7",
    name: "Yoga Retreat by the Beach",
    category: "Wellness",
    relevanceScore: 7,
    image: "/yogaretreat.jpg",
    description:
      "Rejuvenate your mind and body with daily yoga sessions by the ocean led by certified instructors.",
    location: "Bali, Indonesia",
    price: 75,
    duration: "3 hours",
    groupSize: "Small group",
    languages: ["English"],
    included: ["Yoga mat", "Refreshments", "Towel"],
    reviews: {
      average: 4.8,
      count: 95,
    },
  },
  {
    id: "8",
    name: "Wine Tasting Tour",
    category: "Food & Drink",
    relevanceScore: 8,
    image: "/winetasting.jpg",
    description:
      "Sample exquisite local wines at renowned vineyards with expert sommeliers guiding your experience.",
    location: "Tuscany, Italy",
    price: 110,
    duration: "5 hours",
    groupSize: "Small group",
    languages: ["English", "Italian"],
    included: ["Transportation", "Wine tasting", "Light lunch"],
    reviews: {
      average: 4.7,
      count: 163,
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
    description:
      "Discover ancient temples and learn about their historical significance with expert archaeologists.",
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
  {
    id: "11",
    name: "Mountain Biking Adventure",
    category: "Outdoor Adventure",
    relevanceScore: 7,
    image: "/mountainbiking.jpg",
    description:
      "Navigate thrilling trails with stunning mountain views. Routes available for different skill levels.",
    location: "Whistler, Canada",
    price: 95,
    duration: "3 hours",
    groupSize: "Small group",
    languages: ["English", "French"],
    included: ["Bike rental", "Helmet", "Guide", "Water"],
    reviews: {
      average: 4.6,
      count: 128,
    },
  },
  {
    id: "12",
    name: "Hot Air Balloon Ride",
    category: "Outdoor Adventure",
    relevanceScore: 8,
    image: "/hotairbaloonride.jpg",
    description:
      "Soar above picturesque landscapes at sunrise for unforgettable views and photo opportunities.",
    location: "Cappadocia, Turkey",
    price: 220,
    duration: "3 hours",
    groupSize: "Medium group",
    languages: ["English", "Turkish"],
    included: ["Hotel pickup", "Breakfast", "Champagne toast", "Certificate"],
    reviews: {
      average: 4.9,
      count: 215,
    },
  },
  {
    id: "13",
    name: "Traditional Cooking Workshop",
    category: "Food & Drink",
    relevanceScore: 7,
    image: "/cookingworkshop.jpg",
    description:
      "Learn traditional recipes passed down through generations in this hands-on cooking workshop.",
    location: "Marrakech, Morocco",
    price: 70,
    duration: "4 hours",
    groupSize: "Small group",
    languages: ["English", "French", "Arabic"],
    included: ["Ingredients", "Recipe booklet", "Meal"],
    reviews: {
      average: 4.7,
      count: 89,
    },
  },
  {
    id: "14",
    name: "Kayaking Expedition",
    category: "Water Activities",
    relevanceScore: 6,
    image: "/kayaking.jpg",
    description:
      "Paddle through scenic waterways and discover hidden coves accessible only by water.",
    location: "Dubrovnik, Croatia",
    price: 65,
    duration: "3 hours",
    groupSize: "Small group",
    languages: ["English", "Croatian"],
    included: ["Equipment", "Guide", "Waterproof bags"],
    reviews: {
      average: 4.5,
      count: 104,
    },
  },
  {
    id: "15",
    name: "Northern Lights Tour",
    category: "Nature",
    relevanceScore: 10,
    image: "/northernlights.jpg",
    description:
      "Chase the magical Aurora Borealis with expert guides who know the best viewing locations.",
    location: "Tromsø, Norway",
    price: 130,
    duration: "5 hours",
    groupSize: "Medium group",
    languages: ["English", "Norwegian"],
    included: ["Transportation", "Hot drinks", "Photos", "Thermal suits"],
    reviews: {
      average: 4.8,
      count: 167,
    },
  },
  {
    id: "16",
    name: "Desert Camel Trek",
    category: "Outdoor Adventure",
    relevanceScore: 8,
    image: "/cameltrek.jpg",
    description:
      "Experience the desert the traditional way with a camel trek to a Bedouin camp.",
    location: "Dubai, UAE",
    price: 85,
    duration: "Half day",
    groupSize: "Medium group",
    languages: ["English", "Arabic"],
    included: [
      "Camel ride",
      "Traditional dinner",
      "Entertainment",
      "Henna painting",
    ],
    reviews: {
      average: 4.6,
      count: 143,
    },
  },
];

/**
 * Get mock activities data with filtering (for fallback)
 * @param {Object} params - Filter parameters
 * @returns {Array} - Filtered activities
 */
function getMockActivities(params = {}) {
  let filteredActivities = [...mockActivitiesData];

  // Filter by category
  if (params.category && params.category !== "All Categories") {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.category === params.category
    );
  }

  // Filter by minimum relevance score
  if (params.minRelevance) {
    const minScore = Number.parseInt(params.minRelevance);
    filteredActivities = filteredActivities.filter(
      (activity) => activity.relevanceScore >= minScore
    );
  }

  // Filter by search query
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredActivities = filteredActivities.filter(
      (activity) =>
        activity.name.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower) ||
        activity.location.toLowerCase().includes(searchLower) ||
        activity.category.toLowerCase().includes(searchLower)
    );
  }

  return filteredActivities;
}

// Add these at the bottom of lib/api.js
export {
  fetchAPI,
  getActivities,
  getActivityById,
  getFeaturedActivities,
  getCategories,
  mockActivitiesData,
  getMockActivities,
};

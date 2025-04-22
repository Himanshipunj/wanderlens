"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";
import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";
import SearchBar from "../components/SearchBar";
import RelevanceFilter from "../components/RelevanceFilter";

export default function Home({ featuredActivities }) {
  const [filteredActivities, setFilteredActivities] =
    useState(featuredActivities);
  const [minRelevance, setMinRelevance] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = featuredActivities.filter((activity) => {
      return (
        activity.relevanceScore >= minRelevance &&
        (searchTerm === "" ||
          activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setFilteredActivities(filtered);
  }, [minRelevance, searchTerm, featuredActivities]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRelevanceChange = (value) => {
    setMinRelevance(value);
  };

  return (
    <Layout>
      <Head>
        <title>WanderLens | Discover Travel Activities</title>
        <meta
          name="description"
          content="Discover amazing travel activities around the world"
        />
        <link rel="icon" href="/wanderlens.jpg" type="image/jpeg" />
      </Head>

      <div className="bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 text-white py-20 md:py-24 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Unleash Your Inner Explorer
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light">
            Discover curated travel activities and create unforgettable
            memories.
          </p>
          <div className="max-w-xl mx-auto bg-white rounded-full p-3 md:p-4 shadow-lg flex items-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 md:mb-0">
            Top Picks for Your Next Adventure
          </h2>
          <div className="w-full md:w-64">
            <RelevanceFilter
              minRelevance={minRelevance}
              onChange={handleRelevanceChange}
            />
          </div>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">
              No activities found matching your criteria.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
              onClick={() => {
                setMinRelevance(1);
                setSearchTerm("");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/activities"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-lime-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition"
          >
            <span className="mr-2">Explore All Activities</span>
            <FaCompass className="text-xl" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    // This would be replaced with the actual API call to SharpAPI
    // For now, I'll use mock data
    const featuredActivities = [
      {
        id: 1,
        name: "Breathtaking Mountain Hiking Tour",
        category: "Outdoor Adventure",
        relevanceScore: 9,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Immerse yourself in stunning landscapes on this guided mountain adventure.",
      },
      {
        id: 2,
        name: "Enchanting Historical City Walking Tour",
        category: "Cultural",
        relevanceScore: 8,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Uncover the hidden stories and iconic landmarks of the city.",
      },
      {
        id: 3,
        name: "Serene Sunset Sailing Experience",
        category: "Water Activities",
        relevanceScore: 7,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Witness the sky ablaze with color as you sail into the sunset.",
      },
      {
        id: 4,
        name: "Authentic Local Cuisine Cooking Class",
        category: "Food & Drink",
        relevanceScore: 6,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Master the art of traditional cooking with local ingredients.",
      },
      {
        id: 5,
        name: "Thrilling Wildlife Safari Adventure",
        category: "Nature & Wildlife",
        relevanceScore: 10,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Embark on an unforgettable journey to encounter majestic wildlife.",
      },
      {
        id: 6,
        name: "Intriguing Museum Guided Tour",
        category: "Arts & Culture",
        relevanceScore: 5,
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Delve into the world of art and history with insightful guidance.",
      },
    ];

    return {
      props: {
        featuredActivities,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredActivities: [],
      },
    };
  }
}

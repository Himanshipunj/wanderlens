"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem("wanderlens-favorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = (activityId) => {
    const updatedFavorites = favorites.filter(
      (activity) => activity.id !== activityId
    );
    setFavorites(updatedFavorites);

    // Update localStorage
    localStorage.setItem(
      "wanderlens-favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("wanderlens-favorites");
  };

  return (
    <Layout>
      <Head>
        <title>My Favorites | WanderLens</title>
        <meta
          name="description"
          content="Your saved favorite travel activities"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Favorites</h1>

          {favorites.length > 0 && (
            <button
              className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 flex items-center"
              onClick={clearAllFavorites}
            >
              <FaHeartBroken className="mr-2" />
              Clear All
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isFavorite={true}
                onRemoveFavorite={() => removeFavorite(activity.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6">
              Save your favorite activities to find them here
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

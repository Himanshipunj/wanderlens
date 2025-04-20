"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FaCompass, FaHeart, FaHome, FaBars, FaTimes } from "react-icons/fa"

export default function Layout({ children }) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  useEffect(() => {
    // Get favorites count from localStorage
    try {
      const savedFavorites = localStorage.getItem("wanderlens-favorites")
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites)
        setFavoritesCount(favorites.length)
      }
    } catch (error) {
      console.error("Error loading favorites count:", error)
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      try {
        const savedFavorites = localStorage.getItem("wanderlens-favorites")
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites)
          setFavoritesCount(favorites.length)
        } else {
          setFavoritesCount(0)
        }
      } catch (error) {
        console.error("Error handling storage change:", error)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    window.addEventListener("favoritesUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favoritesUpdated", handleStorageChange)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return router.pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <FaCompass className="text-blue-500 text-2xl mr-2" />
              <span className="font-bold text-xl">WanderLens</span>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`flex items-center ${isActive("/") ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}
              >
                <FaHome className="mr-1" />
                <span>Home</span>
              </Link>
              <Link
                href="/activities"
                className={`flex items-center ${isActive("/activities") ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}
              >
                <FaCompass className="mr-1" />
                <span>Activities</span>
              </Link>
              <Link
                href="/favorites"
                className={`flex items-center ${isActive("/favorites") ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}
              >
                <FaHeart className="mr-1" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{favoritesCount}</span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link
              href="/"
              className={`flex items-center p-2 rounded-md ${isActive("/") ? "bg-blue-50 text-blue-500 font-medium" : "text-gray-600"}`}
              onClick={closeMenu}
            >
              <FaHome className="mr-2" />
              <span>Home</span>
            </Link>
            <Link
              href="/activities"
              className={`flex items-center p-2 rounded-md ${isActive("/activities") ? "bg-blue-50 text-blue-500 font-medium" : "text-gray-600"}`}
              onClick={closeMenu}
            >
              <FaCompass className="mr-2" />
              <span>Activities</span>
            </Link>
            <Link
              href="/favorites"
              className={`flex items-center p-2 rounded-md ${isActive("/favorites") ? "bg-blue-50 text-blue-500 font-medium" : "text-gray-600"}`}
              onClick={closeMenu}
            >
              <FaHeart className="mr-2" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{favoritesCount}</span>
              )}
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-grow bg-gray-50">{children}</main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <FaCompass className="text-blue-400 text-2xl mr-2" />
                <span className="font-bold text-xl">WanderLens</span>
              </Link>
              <p className="text-gray-400 mt-2">Discover amazing travel activities</p>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="font-semibold mb-2">Navigation</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities" className="text-gray-400 hover:text-white">
                      Activities
                    </Link>
                  </li>
                  <li>
                    <Link href="/favorites" className="text-gray-400 hover:text-white">
                      Favorites
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WanderLens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

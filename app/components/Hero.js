import Link from "next/link"
import { FaMapPin, FaSearch } from "react-icons/fa"

export default function Hero() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 opacity-90"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Discover Your Perfect Travel Experience
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Find personalized activities based on your interests with our relevance scoring system.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link
            href="/activities"
            className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaSearch className="h-5 w-5" />
            Browse Activities
          </Link>
          <Link
            href="/favorites"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaMapPin className="h-5 w-5" />
            View Favorites
          </Link>
        </div>

        <div className="text-white/80 text-sm">No login required - your favorites are saved locally on your device</div>
      </div>
    </div>
  )
}

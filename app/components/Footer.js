import Link from "next/link"
import { FaCamera, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <div className="flex items-center">
          <Image
            src="/travel.png"
            alt="WanderLens Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority={true}
          />
        </div>
        <p className="text-sm text-gray-600">Discover personalized travel activities based on your interests.</p>
</div>
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-600 hover:text-teal-600">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-600 hover:text-teal-600">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/activities?category=Outdoor" className="text-gray-600 hover:text-teal-600">
                  Outdoor Adventures
                </Link>
              </li>
              <li>
                <Link href="/activities?category=Cultural" className="text-gray-600 hover:text-teal-600">
                  Cultural Experiences
                </Link>
              </li>
              <li>
                <Link href="/activities?category=Food" className="text-gray-600 hover:text-teal-600">
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link href="/activities?category=Water" className="text-gray-600 hover:text-teal-600">
                  Water Activities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-teal-600" aria-label="GitHub">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-600" aria-label="Twitter">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-600" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} WanderLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

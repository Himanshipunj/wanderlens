import Link from "next/link"
import { FaSearch } from "react-icons/fa"

export default function EmptyState({ title, description, actionLabel, actionHref }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <FaSearch className="h-8 w-8 text-gray-400" />
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>

      <Link
        href={actionHref}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

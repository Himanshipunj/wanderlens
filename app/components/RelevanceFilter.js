"use client"

import { useState, useEffect } from "react"

export default function RelevanceFilter({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || 0)

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value || 0)
  }, [value])

  // Handle slider change
  const handleChange = (e) => {
    const newValue = Number.parseInt(e.target.value)
    setLocalValue(newValue)
  }

  // Only update parent when slider is released
  const handleChangeComplete = () => {
    onChange(localValue)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Minimum Relevance Score</span>
        <span className="font-medium text-teal-600">{localValue}/10</span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={localValue}
        onChange={handleChange}
        onMouseUp={handleChangeComplete}
        onTouchEnd={handleChangeComplete}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>Any</span>
        <span>Highly Relevant</span>
      </div>
    </div>
  )
}

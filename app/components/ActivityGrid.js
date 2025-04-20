// components/ActivityGrid.jsx
import ActivityCard from "./ActivityCard"

export default function ActivityGrid({ activities }) {
  console.log('Activities in ActivityGrid:', activities.length)

  return (
    <div className="max-h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}

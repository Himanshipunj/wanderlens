import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import FeaturedActivities from '@/components/FeaturedActivities'
import { getActivities } from '@/lib/api'

export default async function Home() {
  // Fetch featured activities from API
  const activities = await getActivities()

  return (
    <div>
      <Hero />
      <SearchSection />
      <FeaturedActivities activities={activities} />
    </div>
  )
}

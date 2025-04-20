import { getActivities } from "@lib/api";
import ActivityGrid from "@components/ActivityGrid";
import FilterControls from "@components/FilterControls";

export const metadata = {
  title: "Browse Activities - WanderLens",
  description:
    "Discover and filter travel activities based on your preferences",
};

export default async function ActivitiesPage({ searchParams }) {
  const category = searchParams.category || "";
  const minRelevance = Number.parseInt(searchParams.minRelevance) || 0;
  const search = searchParams.search || "";

  // Fetch activities with filters
  const activities = await getActivities({ category, minRelevance, search });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Activities</h1>

      <FilterControls />

      <ActivityGrid activities={activities} />
    </div>
  );
}

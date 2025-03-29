import MedalTable from "@/components/MedalTable/MedalTable";
import { sortMedalData } from "@/lib/sortMedalData";
import { getMedalData } from "@/stores/medalStore";
import type { SortKey } from "@/types/medal";

export default async function Home({
  searchParams
}: {
  searchParams: { sort?: SortKey }
}) {
  const medalData = await getMedalData();  
  const { sort } = await searchParams;
  const sortKey = sort || "gold";
  const sortedData = sortMedalData(medalData, sortKey);
  console.log('TOMMY sortedData=', sortedData);
  return (
    <div>
      <MedalTable 
        initialMedalData={sortedData}
        initialSortKey={sortKey}
      />
    </div>
  );
}

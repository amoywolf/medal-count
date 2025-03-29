import { getMedalData } from "@/stores/medalStore";
import { sortMedalData } from "@/lib/sortMedalData";

export default async function Home() {
  const medalData = await getMedalData();  
  const sortedData = sortMedalData(medalData, "gold");
  console.log('TOMMY sortedData=', sortedData);
  return (
    <div>
      <h1>MEDAL COUNT</h1>
    </div>
  );
}

import { getMedalData } from "@/stores/medalStore";

export default async function Home() {
  const medalData = await getMedalData();
  console.log('TOMMY medalData=', medalData);
  return (
    <div>
      <h1>MEDAL COUNT</h1>
    </div>
  );
}

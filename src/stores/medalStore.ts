import { MedalRecord } from "@/types/medal";
import { fetchMedalData } from "@/lib/api";

let medalData: MedalRecord[] | null = null;

// TODO: implement state management by using state management library

export const getMedalData = async (): Promise<MedalRecord[]> => {
  if (medalData) {
    return medalData;
  }
  
  try {
    const data = await fetchMedalData();
    // Sort the data by code in ascending order
    data.sort((a, b) => {
      return a.code > b.code ? 1 : -1;
    });
    medalData = data.map((record, index) => ({ ...record, orderIndex: index, total: record.gold + record.silver + record.bronze }));
    return medalData;
  } catch (error) {
    medalData = null;
    throw error;
  }
};

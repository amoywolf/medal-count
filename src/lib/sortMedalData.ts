import { MedalRecord, SortKey } from "@/types/medal";

export const sortMedalData = (data: MedalRecord[], sortKey: SortKey): MedalRecord[] => {
  // If sortKey is not a valid SortKey, set to default "gold"
  // TODO: use constants for sort keys instead of hardcode
  const validSortKeys: SortKey[] = ["gold", "silver", "bronze", "total"];
  const newSortKey: SortKey = validSortKeys.includes(sortKey) ? sortKey : "gold";

  const sortedData = [...data].sort((a, b) => {
    const primaryComparator = (b[newSortKey] || 0) - (a[newSortKey] || 0);
    if (primaryComparator !== 0) return primaryComparator;

    const subSortKeys: SortKey[] = ["gold", "silver", "bronze"]
      .filter(k => k !== newSortKey) as SortKey[];
    for (const key of subSortKeys) {
      const diff = (b[key] || 0) - (a[key] || 0);
      if (diff !== 0) return diff;
    }

    return 0;
  });

  // TODO: use dynamic limit instead of hardcoding 10
  return sortedData.slice(0, 10);
};
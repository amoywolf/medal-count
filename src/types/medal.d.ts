export interface MedalRecord {
  orderIndex?: number;
  code: string;
  gold: number;
  silver: number;
  bronze: number;
  total?: number;
};

export type SortKey = "gold" | "silver" | "bronze" | "total";

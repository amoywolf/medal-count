"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MedalRecord, SortKey } from "@/types/medal";
import { sortMedalData } from "@/lib/sortMedalData";
import "@/styles/medal-table.css";

export default function MedalTable({
  initialMedalData,
  initialSortKey,
}: {
  initialMedalData: MedalRecord[];
  initialSortKey: SortKey;
}) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>(initialSortKey);
  const [sortedMedalData, setSortedMedalData] = useState(initialMedalData);

  const handleSort = (key: SortKey) => {
    console.log("TOMMY handleSort key=", key, sortKey);
    if (key === sortKey) {
      return;
    }
    const newSortedData = sortMedalData(initialMedalData, key);
    setSortKey(key);
    setSortedMedalData(newSortedData);

    const params = new URLSearchParams();
    params.set("sort", key);
    router.replace(`/?${params.toString()}`);
  };

  return (
    <div className="medal-table-container">
      <div>MEDAL COUNT</div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th
              onClick={() => handleSort("gold")}
            >
              <div>GOLD</div>
            </th>
            <th
              onClick={() => handleSort("silver")}
            >
              <div>SILV</div>
            </th>
            <th
              onClick={() => handleSort("bronze")}
            >
              <div>BRON</div>
            </th>
            <th onClick={() => handleSort("total")}>
              <div>TOTAL</div>
            </th>
          </tr>
        </thead>
        <tbody className="medal-body">
          {sortedMedalData.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <span>{record.code}-Flag</span>&nbsp;&nbsp;&nbsp;
                <span>{record.code}</span>
              </td>
              <td></td>
              <td>{record.gold}</td>
              <td>{record.silver}</td>
              <td>{record.bronze}</td>
              <td>{record.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

  const flagPositionMappings = (orderIndex: number) => {
    return { backgroundPosition: `0 -${orderIndex * 17}px` };
  };

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
      <div className="medal-table-title">MEDAL COUNT</div>
      <table className="medal-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th
              className="medal-header-cell"
              onClick={() => handleSort("gold")}
            >
              <div
                className={`header-line ${
                  sortKey !== "gold" ? "hidden" : ""
                }`}
              ></div>
              <div className="circle gold-color col-head"></div>
            </th>
            <th
              className="medal-header-cell"
              onClick={() => handleSort("silver")}
            >
              <div
                className={`header-line ${
                  sortKey !== "silver" ? "hidden" : ""
                }`}
              ></div>
              <div className="circle silver-color col-head"></div>
            </th>
            <th
              className="medal-header-cell"
              onClick={() => handleSort("bronze")}
            >
              <div
                className={`header-line ${
                  sortKey !== "bronze" ? "hidden" : ""
                }`}
              ></div>
              <div className="circle bronze-color col-head"></div>
            </th>
            <th className="total-header" onClick={() => handleSort("total")}>
              <div
                className={`header-line ${
                  sortKey !== "total" ? "hidden" : ""
                }`}
              ></div>
              <div className="col-head">TOTAL</div>
            </th>
          </tr>
          <tr>
            <td colSpan={7} className="header-separator"></td>
          </tr>
        </thead>
        <tbody className="medal-body">
          {sortedMedalData.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="country-data">
                <span
                className="flag-icon"
                style={flagPositionMappings(record.orderIndex || 0)}
                ></span>
                <span>{record.code}</span>
              </td>
              <td></td>
              <td className="number-data">{record.gold}</td>
              <td className="number-data">{record.silver}</td>
              <td className="number-data">{record.bronze}</td>
              <td className="number-data number-total">{record.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

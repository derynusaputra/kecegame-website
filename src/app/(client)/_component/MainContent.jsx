"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import { games, liveApps, vouchers } from "../_data/game";

const tabs = [
  { id: "top_up", name: "Top Up Game" },
  { id: "live_app", name: "Aplikasi Live" },
  { id: "voucher", name: "Voucher" },
  { id: "pln", name: "Pulsa dan PLN" },
  { id: "pulsa", name: "Pulsa dan PLN" },
];

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("top_up");

  const renderContent = () => {
    let data;
    switch (activeTab) {
      case "top_up":
        data = games;
        break;
      case "live_app":
        data = liveApps;
        break;
      case "voucher":
        data = vouchers;
        break;
      case "pln":
        data = [];
        break;
      case "pulsa":
        data = []; // Misalnya, data kosong untuk tab ini
        break;
      default:
        data = [];
    }

    return (
      <div className="grid grid-cols-4 gap-0 p-1">
        {data.map((item) => (
          <GameCard
            key={item.id}
            name={item.name}
            iconUrl={item.iconUrl}
            slug={item.slug}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md items-center justify-center bg-white">
      {/* Tab Navigation */}

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pt-3">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 rounded-lg px-3 py-1 text-[12px] font-semibold transition-colors duration-300 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500"
            }${idx === 0 ? "ml-3" : ""}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Konten Berdasarkan Tab */}
      {renderContent()}
    </div>
  );
}

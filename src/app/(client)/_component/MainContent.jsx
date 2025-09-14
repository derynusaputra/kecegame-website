"use client";

import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { games, liveApps, vouchers } from "../_data/game";
import { useGetCategory } from "@/hooks/ReactQuery/useGetCategory";
import { useBrand } from "@/hooks/ReactQuery/useBrand";
import CustomLoading from "@/components/loading/CustomLoading";
// import bcrypt from "bcryptjs";
// import { secretKey } from "@/lib/utils";
// import CryptoJS from "crypto-js";

export default function MainContent() {
  const {
    data: dataBrand,
    isLoading: initLoadBrand,
    error: errBrand,
    refetch: getBrand,
    isFetching: loadBrand,
  } = useBrand.get();

  const uniqueBrands = dataBrand?.data.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.category === obj.category)
  );

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    getBrand();
  }, []);

  // Set activeTab ke category pertama saat data sudah loaded
  useEffect(() => {
    if (uniqueBrands && uniqueBrands.length > 0 && !activeTab) {
      setActiveTab(uniqueBrands[0].category);
    }
  }, [uniqueBrands, activeTab]);

  if (initLoadBrand) {
    return <CustomLoading />;
  }

  const renderContent = () => {
    // Filter data berdasarkan activeTab (category)
    const filteredData =
      dataBrand?.data.filter((item) => item.category === activeTab) || [];

    return (
      <div className="grid grid-cols-4 gap-0 p-1">
        {filteredData.map((item) => {
          return (
            <GameCard
              key={item.id}
              name={item.name}
              iconUrl={item.urlLogo}
              slug={"ciphertext"}
              item={item}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md items-center justify-center bg-white">
      {/* Tab Navigation */}

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pt-3">
        {uniqueBrands.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.category)}
            className={`flex-shrink-0 rounded-lg px-3 py-1 text-[12px] font-semibold text-white duration-300 ${idx === 0 ? "ml-3" : ""} ${
              activeTab === tab.category
                ? "bg-[#00c951] text-white"
                : "bg-gray-300 text-black"
            }${idx === 0 ? "ml-3" : ""}`}
          >
            {tab.category}
          </button>
        ))}
      </div>

      {/* Konten Berdasarkan Tab */}
      {renderContent()}
    </div>
  );
}

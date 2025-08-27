"use client";

import React, { memo, useState } from "react";
import { Card, CardBody, Badge, Image } from "@heroui/react";

const initialPackages = [
  {
    id: "d435",
    diamonds: 435,
    bonus: 115,
    official_price: 14000,
    sale_price: 10900,
    discount_percent: 22,
    you_save: 3100,
    badges: ["Promo"],
    isSelected: false,
  },
  {
    id: "d1310",
    diamonds: 1310,
    bonus: 200,
    official_price: 41927,
    sale_price: 32900,
    discount_percent: 21,
    you_save: 9027,
    badges: ["BEST DEAL"],
    isSelected: false,
  },
  {
    id: "d3210",
    diamonds: 3210,
    bonus: 500,
    official_price: 102375,
    sale_price: 80900,
    discount_percent: 21,
    you_save: 21475,
    badges: ["Rekomendasi"],
    isSelected: false,
  },
  {
    id: "d15380",
    diamonds: 15380,
    bonus: 2000,
    official_price: 490000,
    sale_price: 385000,
    discount_percent: 21,
    you_save: 105000,
    badges: ["Paling Laris"],
    isSelected: false,
  },
  {
    id: "d36920",
    diamonds: 36920,
    bonus: 5000,
    official_price: 1176000,
    sale_price: 925000,
    discount_percent: 21,
    you_save: 251000,
    badges: ["Hemat Besar"],
    isSelected: false,
  },
  {
    id: "d112300",
    diamonds: 112300,
    bonus: 15000,
    official_price: 3577000,
    sale_price: 2810000,
    discount_percent: 21,
    you_save: 767000,
    badges: ["Bundle Jumbo"],
    isSelected: false,
  },
];

function PackageCom({ setSelectedPackage }) {
  const [packages, setPackages] = useState(initialPackages);

  const selectPackage = (id) => {
    const updated = packages.map((pkg) => ({
      ...pkg,
      isSelected: pkg.id === id, // hanya item yang dipilih jadi true
    }));
    setPackages(updated);
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      {/* <div className="flex p-1 bg-white border border-gray-200 rounded-lg">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md">
          Berlian
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-md">
          Bintang
        </button>
      </div> */}

      {/* Selected Package Summary */}
      <div className="grid grid-cols-2 gap-4">
        {packages.map((p, idx) => (
          <CardPackage
            key={idx}
            {...p}
            onClick={() => {
              selectPackage(p.id);
              setSelectedPackage(p);
            }}
            isSelected={p.isSelected}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(PackageCom);

const CardPackage = ({
  id,
  diamonds,
  bonus,
  official_price,
  sale_price,
  discount_percent,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={`flex items-center rounded-xl border bg-white p-2 shadow-sm transition hover:shadow-md ${
        isSelected ? "border-purple-600" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      {/* Kiri: Icon & Title */}

      {/* Kanan: Harga */}
      <div className="">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border ${
              isSelected ? "border-purple-600" : "border-gray-200"
            }`}
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/5904/5904357.png"
              alt="Diamond"
              width={15}
              height={15}
            />
          </div>
          <div>
            <p
              className={`text-[12px] font-semibold ${
                isSelected ? "text-purple-600" : "text-gray-500"
              }`}
            >
              {diamonds + bonus} Diamond
            </p>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 line-through">
          Rp{official_price.toLocaleString("id-ID")}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-bold text-green-600">
            Rp{sale_price.toLocaleString("id-ID")}
          </p>
          {discount_percent > 0 && (
            <span className="rounded-md bg-red-100 px-1 py-0.5 text-[10px] font-semibold text-red-600">
              {discount_percent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

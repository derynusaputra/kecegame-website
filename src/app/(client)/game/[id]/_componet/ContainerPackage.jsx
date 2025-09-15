"use client";

import React, { memo, useState } from "react";
import { Card, CardBody, Badge, Image } from "@heroui/react";

function ContainerPackage({
  setSelectedPackage,
  initialPackages = [],
  setValue,
}) {
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
      <div className="grid grid-cols-2 gap-4">
        {packages.map((p, idx) => (
          <CardPackage
            key={idx}
            {...p}
            onClick={() => {
              selectPackage(p.id);
              setSelectedPackage(p);
              // console.log();
              // setValue("package", p?.buyer_sku_code);
              setValue.onChange(p?.buyer_sku_code);
            }}
            discount_percent={p.discountPercent}
            official_price={p.strikePrice}
            sale_price={p.sellPrice}
            isSelected={p.isSelected}
            diamonds={p.product_name}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ContainerPackage);

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
              {diamonds}
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

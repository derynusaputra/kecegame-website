import {
  LucideFileHeart,
  LucideGlobe,
  LucideHeadphones,
  LucideSearch,
} from "lucide-react";
import React from "react";
import CarouselBanner from "./_component/CarouselBanner";

export default function page() {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#F5F5F4]">
      <div className="flex h-full w-full max-w-md flex-col bg-blue-500">
        {/* Atas (Hijau) */}
        <div className="h-[60px] w-full bg-green-500">
          <div className="h-[60px] w-full bg-[#3F1FBA]">dery</div>
        </div>
        {/* Tengah (Kuning, scrollable jika overflow) */}
        <div className="w-full flex-1 overflow-y-auto bg-yellow-500">
          <div className="flex flex-col gap-2 px-0 py-2">
            <CarouselBanner />
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white"
                style={{ height: 100 }}
              >
                Kotak {i + 1}
              </div>
            ))}
          </div>
          {/*  bottom nav */}
        </div>
        <div className="flex h-[50px] w-full grid-cols-5 bg-green-500">
          <div className="h-[50px] w-full bg-[#3F1FBA]">dery</div>
          <div className="h-[50px] w-full bg-[#ba841f]">dery</div>
          <div className="h-[50px] w-full bg-[#1fba34]">dery</div>
          <div className="h-[50px] w-full bg-[#ba841f]">dery</div>
          <div className="h-[50px] w-full bg-[#8bba1f]">dery</div>
        </div>
        {/* Bawah (Hijau) */}
      </div>
    </div>
  );
}

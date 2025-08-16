import {
  LucideFileHeart,
  LucideGlobe,
  LucideHeadphones,
  LucideSearch,
  LucideUser,
} from "lucide-react";
import React from "react";
import CarouselBanner from "./_component/CarouselBanner";
import MainContent from "./_component/MainContent";

const bottomNav = [
  {
    name: "Home",
    icon: (
      <LucideGlobe className="flex h-[18px] w-[18px] shrink-0 text-white" />
    ),
  },
  {
    name: "Promo",
    icon: (
      <LucideFileHeart className="flex h-[18px] w-[18px] shrink-0 text-white" />
    ),
  },
  {
    name: "Event",
    icon: (
      <LucideHeadphones className="flex h-[18px] w-[18px] shrink-0 text-white" />
    ),
  },
  {
    name: "Profile",
    icon: <LucideUser className="flex h-[18px] w-[18px] shrink-0 text-white" />,
  },
];

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
            <MainContent />
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
          <div className="h-[60px]" />
          {/*  bottom nav */}
          <div className="fixed bottom-0 z-10 flex h-[60px] w-full max-w-md grid-cols-4 bg-green-500">
            {bottomNav.map((item, index) => (
              <div
                key={index}
                className="flex h-[60px] w-full items-center justify-center bg-[#1fba34]"
              >
                <div className="pt-2 text-center">
                  <div className="mb-[-5px] flex h-[18px] items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-white">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bawah (Hijau) */}
      </div>
    </div>
  );
}

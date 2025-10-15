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
import VideoPlayer from "./_component/PlayVideo";
import Image from "next/image";

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
      <div className="flex flex-col w-full h-full max-w-md">
        {/* Atas (Hijau) */}
        <div className="h-[60px] w-full bg-green-500">
          <div className="align-center mt-3 h-[30px] w-full justify-center text-center font-bold text-white">
            <Image
              className="w-full h-full"
              loading="eager"
              fetchPriority="high"
              width={20}
              height={20}
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </div>
        </div>
        {/* Tengah (Kuning, scrollable jika overflow) */}
        <div className="flex-1 w-full overflow-y-auto bg-gray-50">
          <div className="flex flex-col gap-2 px-0 py-2">
            <CarouselBanner />
            <MainContent />
            {/* <VideoPlayer /> */}
          </div>
          <div className="h-[60px]" />
          {/*  bottom nav */}
          {/* <div className="fixed bottom-0 z-10 flex h-[60px] w-full max-w-md grid-cols-4 bg-green-500">
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
          </div> */}
        </div>
        {/* Bawah (Hijau) */}
      </div>
    </div>
  );
}

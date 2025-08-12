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
          <div className="flex h-[50px] w-full grid-cols-5 bg-green-500">
            <div className="h-[50px] w-full bg-[#3F1FBA]">ahmad</div>
            <div className="h-[50px] w-full bg-[#ba841f]">dery</div>
            <div className="h-[50px] w-full bg-[#1fba34]">dery</div>
            <div className="h-[50px] w-full bg-[#ba841f]">dery</div>
            <div className="h-[50px] w-full bg-[#8bba1f]">dery</div>
          </div>
          <nav className="fixed bottom-0 z-10 w-full max-w-md px-5">
            <div className="grid h-fit grid-cols-4 justify-between rounded-[40px] bg-black px-5 py-4">
              <a
                href="index.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideGlobe className="flex h-8 w-8 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">
                  Discover
                </span>
              </a>
              <a
                href="check-booking.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideFileHeart className="flex h-8 w-8 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">Orders</span>
              </a>
              <a
                href="find-kos.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideSearch className="flex h-8 w-8 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">Find</span>
              </a>
              <a
                href="#"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideHeadphones className="flex h-8 w-8 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">Help</span>
              </a>
            </div>
          </nav>
        </div>
        {/* Bawah (Hijau) */}
      </div>
    </div>
  );
}

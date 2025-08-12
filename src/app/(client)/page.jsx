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
    <div className="flex flex-col items-center w-screen h-screen bg-[#F5F5F4]">
         <div className="h-[60px] w-full  bg-green-500">
          <div className="h-[60px] w-full bg-[#3F1FBA]">dery</div>
        </div>
      <div
        id="Content-Container"
        className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto overflow-x-hidden"
      >
        <CarouselBanner />
        <div
          id="BottomNav"
          className="relative flex w-full h-[138px] shrink-0 "
        >
          <nav className="fixed bottom-5 w-full max-w-[640px] px-5 z-10 ">
            <div className="grid grid-cols-4 h-fit rounded-[40px] justify-between py-4 px-5 bg-black">
              <a
                href="index.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideGlobe className="flex w-8 h-8 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">
                  Discover
                </span>
              </a>
              <a
                href="check-booking.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideFileHeart className="flex w-8 h-8 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">Orders</span>
              </a>
              <a
                href="find-kos.html"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideSearch className="flex w-8 h-8 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">Find</span>
              </a>
              <a
                href="#"
                className="flex flex-col items-center gap-2 text-center"
              >
                <LucideHeadphones className="flex w-8 h-8 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">Help</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

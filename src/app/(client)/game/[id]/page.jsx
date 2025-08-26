import React from "react";
import MainContentDetailGame from "./_componet/MainContentDetailGame";

export default function DetailGame() {
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
            {/* content */}
            <MainContentDetailGame />
          </div>
          <div className="h-[60px]" />
          {/*  bottom nav */}
          <div className="fixed bottom-0 z-10 flex h-[60px] w-full max-w-md grid-cols-4 bg-green-500"></div>
        </div>
        {/* Bawah (Hijau) */}
      </div>
    </div>
  );
}

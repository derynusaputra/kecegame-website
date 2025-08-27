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
        <MainContentDetailGame />
      </div>
    </div>
  );
}

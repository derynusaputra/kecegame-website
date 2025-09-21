"use client";
import React from "react";
import MainContentDetailGame from "./_componet/MainContentDetailGame";
import MainContentDetailLitmatch from "./_componet/MainContentDetailLitmatch";
import { useParams } from "next/navigation";
// Note: Crypto functions removed to avoid dependency issues

export default function DetailGame() {
  const { id } = useParams();
  // Use id directly as game identifier
  const gameId = id;
  const litmatch = gameId === "litmatch";
  const title = gameId;

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#F5F5F4]">
      <div className="flex h-full w-full max-w-md flex-col">
        {/* Atas (Hijau) */}
        <div className="h-[60px] w-full bg-gray-200">
          <div className="h-[60px] w-full bg-[#00c951]">Detail Game</div>
        </div>
        {litmatch ? (
          <MainContentDetailLitmatch />
        ) : (
          <MainContentDetailGame title={title} item={{ name: gameId }} />
        )}
      </div>
    </div>
  );
}

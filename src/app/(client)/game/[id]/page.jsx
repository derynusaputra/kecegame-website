"use client";
import React from "react";
import MainContentDetailGame from "./_componet/MainContentDetailGame";
import MainContentDetailLitmatch from "./_componet/MainContentDetailLitmatch";
import { useParams } from "next/navigation";
// Note: Crypto functions removed to avoid dependency issues

export default function DetailGame() {
  const { id } = useParams();
  // Use id directly as game identifier
  const gameId = decodeURIComponent(id);
  const litmatch = gameId === "litmatch";

  return (
    <div className="flex h-screen w-screen flex-col items-center bg-[#F5F5F4]">
      <div className="flex flex-col w-full h-full max-w-md">
        {/* Atas (Hijau) */}
        <div className="h-[60px] w-full bg-gray-200">
          <div className="h-[60px] w-full bg-[#00c951]">Detail Game</div>
        </div>
        {litmatch ? (
          <MainContentDetailLitmatch />
        ) : (
          <MainContentDetailGame title={gameId} item={{ name: gameId }} />
        )}
      </div>
    </div>
  );
}

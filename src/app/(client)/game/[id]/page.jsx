"use client";
import React from "react";
import MainContentDetailGame from "./_componet/MainContentDetailGame";
import MainContentDetailLitmatch from "./_componet/MainContentDetailLitmatch";
import { useParams } from "next/navigation";
import CryptoJS from "crypto-js";
import { decryptKu, secretKey } from "@/lib/utils";
import { log } from "@tensorflow/tfjs";

export default function DetailGame() {
  const { id } = useParams();
  const bytes = decryptKu(id);
  const litmatch = bytes.name === "litmatch";

  const title = bytes.name;

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
          <MainContentDetailGame title={title} item={bytes} />
        )}
      </div>
    </div>
  );
}

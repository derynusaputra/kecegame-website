// src/components/GameCard.jsx

// import { Image } from "@heroui/image";
import { API_URL, apiBase } from "@/services/apiBase";
import Image from "next/image";
import { Image as ImageHeroui } from "@heroui/image";
import Link from "next/link";
import { configEnv } from "@/services/config";
// Note: Crypto functions removed to avoid dependency issues

export default function GameCard({ name, iconUrl, link, slug, item }) {
  // Use slug or name as fallback for link
  const gameId = name?.toLowerCase().replace(/\s+/g, "-") || "game";

  return (
    <Link
      href={`/game/${name}?type=${item?.type}`}
      className="block cursor-pointer p-2.5"
    >
      <div className="relative m-auto h-[50px] w-[50px]">
        <div className="relative m-auto h-[50px] w-[50px] overflow-hidden rounded-lg">
          <ImageHeroui
            alt={`Top Up Game ${name} termurah`}
            fetchPriority="high"
            loading="eager"
            width={50}
            height={50}
            decoding="async"
            // Hapus kelas rounded dari sini, karena sudah dihandle oleh parent div
            className="aspect-square bg-gray-200 object-cover"
            src={
              iconUrl
                ? `${configEnv.baseUrl}${iconUrl}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png"
            }
            // src="./images/logo/auth-logo.svg"
          />

          {/* <img
            src="https://api.halalinmu.com/uploads/brands/1757878324769.webp"
            alt="gambar"
            className="w-full h-auto rounded-lg"
          /> */}
        </div>
        {/* <div className="absolute right-[-3px] bottom-[-3px] z-10">
          <Image
            className="w-full h-full"
            loading="eager"
            fetchPriority="high"
            width={20}
            height={20}
            src="./images/logo/icon-keranjang.svg"
            alt="Logo"
          />
        </div> */}
      </div>
      <h3 className="mt-1 -mb-1 line-clamp-2 text-center text-[9px] font-semibold text-gray-600">
        {name}
      </h3>
    </Link>
  );
}

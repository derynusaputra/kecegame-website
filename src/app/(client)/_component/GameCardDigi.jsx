// src/components/GameCard.jsx

// import { Image } from "@heroui/image";
import { API_URL, apiBase } from "@/services/apiBase";
import Image from "next/image";
import { Image as ImageHeroui } from "@heroui/image";
import Link from "next/link";

export default function GameCardDigi({ name, iconUrl, link, slug, item }) {
  return (
    <Link href={`/game/${slug}`} className="block cursor-pointer p-2.5">
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
                ? API_URL + iconUrl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png"
            }
            // src="./images/logo/auth-logo.svg"
          />
        </div>
        <div className="absolute right-[-3px] bottom-[-3px] z-10">
          <Image
            className="h-full w-full"
            loading="eager"
            fetchPriority="high"
            width={20}
            height={20}
            src="./images/logo/icon-keranjang.svg"
            alt="Logo"
          />
        </div>
      </div>
      <h3 className="mt-1 -mb-1 line-clamp-2 text-center text-[9px] font-semibold text-gray-600">
        {name}
      </h3>
    </Link>
  );
}

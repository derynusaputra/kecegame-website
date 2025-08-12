// src/components/GameCard.jsx

// import { Image } from "@heroui/image";
import { Image } from "@heroui/image";
import Link from "next/link";

export default function GameCard({ name, iconUrl, link, slug }) {
  return (
    <Link href={`/game/${slug}`} className="block cursor-pointer p-2.5">
      <div className="relative m-auto h-[50px] w-[50px]">
        <div className="relative m-auto h-[50px] w-[50px] overflow-hidden rounded-lg">
          <Image
            alt={`Top Up Game ${name} termurah`}
            fetchPriority="high"
            loading="eager"
            width={50}
            height={50}
            decoding="async"
            // Hapus kelas rounded dari sini, karena sudah dihandle oleh parent div
            className="aspect-square bg-red-400 object-cover"
            src={
              "https://cdn.vcgamers.com/brand/temp/ca759ee2-3dd6-4d06-a0a9-1fdd4c0e0b76.png"
            }
          />
        </div>
        <div className="absolute right-[-3px] bottom-[-3px]">
          <Image
            alt={`Top Up Game ${name} termurah`}
            fetchPriority="high"
            loading="eager"
            width={20}
            height={20}
            decoding="async"
            // Hapus kelas rounded dari sini, karena sudah dihandle oleh parent div
            className="h-full w-full"
            src={"https://www.vcgamers.com/svg/hexagon-gercep.svg"}
          />
        </div>
      </div>
      <h3 className="mt-1 -mb-1 line-clamp-2 text-center text-[9px] font-semibold text-gray-600">
        {name}
      </h3>
    </Link>
  );
}

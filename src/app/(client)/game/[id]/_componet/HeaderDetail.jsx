import { API_URL } from "@/services/apiBase";
import { Image } from "@heroui/image";

export const HeadDetail = ({ no, title, item }) => {
  return (
    <div className="mb-2 flex w-full items-center justify-between">
      {/* Left: Number and Title */}
      <div className="flex items-center gap-2">
        <div className="relative m-auto h-[50px] w-[50px] overflow-hidden rounded-lg">
          <Image
            alt={`Kecel Game ${title}`}
            fetchPriority="high"
            loading="eager"
            width={50}
            height={50}
            decoding="async"
            // Hapus kelas rounded dari sini, karena sudah dihandle oleh parent div
            className="aspect-square bg-white object-cover"
            src={
              item?.urlLogo
                ? API_URL + item?.urlLogo
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png"
            }
            // src="./images/logo/auth-logo.svg"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[15px] font-semibold">Top Up</span>
          <span className="text-[15px] font-semibold">{title}</span>
        </div>
      </div>
      {/* Right: Description */}
      <span className="text-[13px] font-medium text-[#BDBDBD]"></span>
    </div>
  );
};

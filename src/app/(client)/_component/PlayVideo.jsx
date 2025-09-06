"use client";
import { useState } from "react";

export default function VideoPlayer() {
  const [hoverTime, setHoverTime] = useState(null);

  const duration = 120; // durasi video (detik)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = Math.floor(percent * duration);
    setHoverTime(time);
  };

  return (
    <div className="relative w-full">
      <video src="video/example.mp4" controls className="w-full" />

      {/* Progress bar hover area */}
      <div
        className="absolute bottom-8 left-0 h-4 w-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverTime(null)}
      >
        {hoverTime !== null && (
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 rounded bg-black/70 p-2">
            {/* Thumbnail preview (bisa sprite atau video kecil) */}
            <img
              src={`/thumbs/frame_${Math.floor(hoverTime / 5)}.jpg`}
              alt="preview"
              className="h-20 w-32 object-cover"
            />
            <p className="text-center text-xs text-white">{hoverTime}s</p>
          </div>
        )}
      </div>
    </div>
  );
}

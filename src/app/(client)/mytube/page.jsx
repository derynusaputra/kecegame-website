"use client";
import React, { useState } from "react";
import VideoItem from "./_component/VideoItem";

export const videos = [
  {
    id: 1,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  },
  {
    id: 3,
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
];

export default function MyTube() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      className="h-screen snap-y snap-mandatory overflow-y-scroll"
      onScroll={(e) => {
        const scrollTop = e.currentTarget.scrollTop;
        const height = window.innerHeight;
        const index = Math.round(scrollTop / height);
        setActiveIndex(index);
      }}
    >
      {videos.map((vid, i) => (
        <div
          key={vid.id}
          className="grid h-screen snap-start grid-cols-12 text-white"
        >
          {/* Kiri: Menu */}
          <div className="col-span-2 flex flex-col items-center justify-center gap-4 p-2">
            <button>🏠</button>
            <button>🔍</button>
            <button>👤</button>
          </div>

          {/* Tengah: Video */}
          {console.log(activeIndex === i, i, activeIndex)}
          <div className="relative col-span-8 flex items-center justify-center">
            <div
              key={vid.id}
              className="flex h-screen snap-start items-center justify-center"
            >
              <VideoItem
                // keyku={activeIndex === i ? vid.id : null}
                src={vid.url}
              />
            </div>
            {/* Overlay text (opsional) */}
            <div className="absolute bottom-10 left-5">
              <p className="text-lg font-bold">@username</p>
              <p className="text-sm">Deskripsi video...</p>
            </div>
          </div>

          {/* Kanan: Action Buttons */}
          <div className="col-span-2 flex flex-col items-center justify-center gap-6 p-2">
            <button>👍</button>
            <button>💬</button>
            <button>🔗</button>
            <button>⬆️</button>
            <button>⬇️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef } from "react";
// import { Player } from "@mux/mux-player-react";

export default function VideoItem({ keyku, src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.7 } // main trigger kalau 70% video kelihatan
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div>
      {/* <video
        // key={keyku}
        ref={videoRef}
        src={src}
        className="object-cover w-full h-screen"
        // muted
        loop
        playsInline
        controls={true}
      /> */}

      <MuxPlayer
        streamType="on-demand"
        src="https://cdn.mysite.com/hls/playlist.m3u8"
        metadata={{
          video_id: "video-id-123456",
          video_title: "Bick Buck Bunny",
          viewer_user_id: "user-id-bc-789",
        }}
      />
      {/* <Player
        streamType="on-demand"
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" // bisa pakai HLS dari server kamu
        controls
        autoPlay
        playsInline
        style={{ width: "100%", maxHeight: "600px", borderRadius: "12px" }}
      /> */}
    </div>
  );
}

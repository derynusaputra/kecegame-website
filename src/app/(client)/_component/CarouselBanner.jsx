"use client";
import { useBanner } from "@/hooks/ReactQuery/useBanner";
import { API_URL } from "@/services/apiBase";
import React, { useEffect, useRef, useState } from "react";

const bannerImages = [
  {
    id: 1,
    url: "https://kecetopup.com/assets/images/banner/1753068116_42f7d936e5171fbe1cc3.png",
  },
  {
    id: 2,
    url: "https://kecetopup.com/assets/images/banner/1753067296_037c7035152700e85eaf.png",
  },
  {
    id: 3,
    url: "https://kecetopup.com/assets/images/banner/1753067887_546ec158e7ce8d25ea1b.png",
  },
];

export default function CarouselBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const goToSlide = (slideIndex) => setCurrentIndex(slideIndex);

  // get banner from api
  const {
    data: dataBanner,
    isLoading: initLoadBanner,
    error: errBanner,
    refetch: getBanner,
    isFetching: loadBanner,
  } = useBanner.get();

  console.log("dataBanner", dataBanner?.data);

  useEffect(() => {
    getBanner();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  const prevSlide = () =>
    setCurrentIndex(
      currentIndex === 0 ? bannerImages.length - 1 : currentIndex - 1
    );
  const nextSlide = () =>
    setCurrentIndex(
      currentIndex === bannerImages.length - 1 ? 0 : currentIndex + 1
    );

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );
    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="group relative mx-auto h-[160px] w-full max-w-md overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {dataBanner?.data?.map((banner) => (
          <img
            key={banner.id}
            src={`${API_URL}${banner.imageUrl}`}
            alt="Banner Image"
            className="h-full w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Tombol Panah Kiri (prevSlide) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-[#00c951] shadow-md transition-all hover:bg-gray-100"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      {/* Tombol Panah Kanan (nextSlide) */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-[#00c951] shadow-md transition-all hover:bg-gray-100"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {bannerImages.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2.5 w-2.5 rounded-full ${
              currentIndex === slideIndex ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

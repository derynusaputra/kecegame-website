"use client";
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
    <div className="group relative mx-auto  h-[160px] w-full max-w-md overflow-hidden ">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerImages.map((banner) => (
          <img
            key={banner.id}
            src={banner.url}
            alt="Banner Image"
            className="flex-shrink-0 object-cover w-full h-full"
          />
        ))}
      </div>

      {/* Tombol Panah Kiri (prevSlide) */}
      <button
        onClick={prevSlide}
        className="absolute p-2 text-purple-600 transition-all -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer left-2 top-1/2 hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5"
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
        className="absolute p-2 text-purple-600 transition-all -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer right-2 top-1/2 hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5"
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
      <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
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

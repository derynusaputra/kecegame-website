"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  UserIcon,
  TagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Get game from localStorage (from CMS)
function getGame(slug) {
  if (typeof window !== "undefined") {
    const savedGames = localStorage.getItem("kecegame-games");
    if (savedGames) {
      const games = JSON.parse(savedGames);
      const game = games.find((g) => g.slug === slug && g.published);
      if (game) return game;
    }
  }

  // Fallback sample data
  if (slug === "cyberpunk-2077") {
    return {
      title: "Cyberpunk 2077",
      slug: "cyberpunk-2077",
      description:
        "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and ceaseless body modification.",
      shortDescription:
        "Open-world action-adventure RPG set in a dystopian future",
      featuredImage: "/images/games/cyberpunk-2077-featured.jpg",
      gallery: [
        {
          image: "/images/games/cyberpunk-2077-1.jpg",
          alt: "Night City skyline",
        },
        {
          image: "/images/games/cyberpunk-2077-2.jpg",
          alt: "Character customization",
        },
        { image: "/images/games/cyberpunk-2077-3.jpg", alt: "Combat gameplay" },
      ],
      category: "rpg",
      platforms: ["pc", "ps5", "xbox-series"],
      releaseDate: "2020-12-10T00:00:00.000Z",
      developer: "CD Projekt RED",
      publisher: "CD Projekt",
      price: 59.99,
      discount: 20,
      ageRating: "M",
      systemRequirements: {
        minimum: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i5-3570K or AMD FX-8310",
          memory: "8 GB RAM",
          graphics: "NVIDIA GeForce GTX 780 3GB or AMD Radeon RX 470",
          directx: "Version 12",
          storage: "70 GB available space",
        },
        recommended: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i7-4790 or AMD Ryzen 3 3200G",
          memory: "12 GB RAM",
          graphics: "NVIDIA GeForce GTX 1060 6GB or AMD Radeon R9 Fury",
          directx: "Version 12",
          storage: "70 GB available space (SSD recommended)",
        },
      },
      features: [
        "Open-world exploration",
        "Character customization",
        "Multiple story paths",
        "Cyberpunk setting",
        "Action RPG combat",
      ],
      videos: [
        {
          title: "Official Trailer",
          url: "https://www.youtube.com/watch?v=8X2kIfS6fb8",
          thumbnail: "/images/games/cyberpunk-trailer-thumb.jpg",
        },
      ],
      screenshots: [
        {
          image: "/images/games/cyberpunk-screenshot-1.jpg",
          caption: "Night City at night",
        },
        {
          image: "/images/games/cyberpunk-screenshot-2.jpg",
          caption: "Character in action",
        },
      ],
      tags: ["cyberpunk", "rpg", "open-world", "futuristic", "action"],
      seoTitle: "Cyberpunk 2077 - Open World RPG Game",
      seoDescription:
        "Experience the ultimate cyberpunk adventure in Night City. Customize your character, explore the open world, and shape your destiny.",
      featured: true,
      published: true,
    };
  }
  return null;
}

export default function GameDetailPage({ params }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gameData = getGame(params.slug);
    setGame(gameData);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    notFound();
  }

  const finalPrice = game.discount
    ? game.price * (1 - game.discount / 100)
    : game.price;
  const releaseDate = new Date(game.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-purple-900 to-blue-900">
        <Image
          src={game.featuredImage}
          alt={game.title}
          fill
          className="object-cover opacity-50"
        />
        <div className="bg-opacity-40 absolute inset-0 bg-black"></div>
        <div className="relative z-10 container mx-auto flex h-full items-center px-4">
          <div className="text-white">
            <h1 className="mb-4 text-5xl font-bold">{game.title}</h1>
            <p className="mb-6 max-w-2xl text-xl">{game.shortDescription}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{releaseDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" />
                <span>{game.developer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TagIcon className="h-5 w-5" />
                <span className="capitalize">{game.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Game Description */}
            <section>
              <h2 className="mb-6 text-3xl font-bold">About This Game</h2>
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-gray-700">
                  {game.description}
                </p>
              </div>
            </section>

            {/* Game Features */}
            <section>
              <h2 className="mb-6 text-3xl font-bold">Key Features</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <StarIcon className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <section>
                <h2 className="mb-6 text-3xl font-bold">Screenshots</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {game.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={screenshot.image}
                        alt={screenshot.caption || `Screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                      />
                      {screenshot.caption && (
                        <p className="mt-2 text-center text-sm text-gray-600">
                          {screenshot.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {game.videos && game.videos.length > 0 && (
              <section>
                <h2 className="mb-6 text-3xl font-bold">Videos</h2>
                <div className="space-y-6">
                  {game.videos.map((video, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-video overflow-hidden rounded-lg bg-gray-900">
                        <iframe
                          src={video.url.replace("watch?v=", "embed/")}
                          title={video.title}
                          className="h-full w-full"
                          allowFullScreen
                        />
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">
                        {video.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* System Requirements */}
            {game.systemRequirements && (
              <section>
                <h2 className="mb-6 text-3xl font-bold">System Requirements</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-red-600">
                      Minimum Requirements
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <strong>OS:</strong>{" "}
                        {game.systemRequirements.minimum.os}
                      </div>
                      <div>
                        <strong>Processor:</strong>{" "}
                        {game.systemRequirements.minimum.processor}
                      </div>
                      <div>
                        <strong>Memory:</strong>{" "}
                        {game.systemRequirements.minimum.memory}
                      </div>
                      <div>
                        <strong>Graphics:</strong>{" "}
                        {game.systemRequirements.minimum.graphics}
                      </div>
                      <div>
                        <strong>DirectX:</strong>{" "}
                        {game.systemRequirements.minimum.directx}
                      </div>
                      <div>
                        <strong>Storage:</strong>{" "}
                        {game.systemRequirements.minimum.storage}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-green-600">
                      Recommended Requirements
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <strong>OS:</strong>{" "}
                        {game.systemRequirements.recommended.os}
                      </div>
                      <div>
                        <strong>Processor:</strong>{" "}
                        {game.systemRequirements.recommended.processor}
                      </div>
                      <div>
                        <strong>Memory:</strong>{" "}
                        {game.systemRequirements.recommended.memory}
                      </div>
                      <div>
                        <strong>Graphics:</strong>{" "}
                        {game.systemRequirements.recommended.graphics}
                      </div>
                      <div>
                        <strong>DirectX:</strong>{" "}
                        {game.systemRequirements.recommended.directx}
                      </div>
                      <div>
                        <strong>Storage:</strong>{" "}
                        {game.systemRequirements.recommended.storage}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Card */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-center">
                <div className="mb-4">
                  {game.discount > 0 && (
                    <div className="mb-2 flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${finalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${game.price.toFixed(2)}
                      </span>
                      <span className="rounded bg-red-500 px-2 py-1 text-sm text-white">
                        -{game.discount}%
                      </span>
                    </div>
                  )}
                  {!game.discount && (
                    <span className="text-3xl font-bold text-gray-900">
                      ${game.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="mt-3 w-full rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-800 transition-colors hover:bg-gray-300">
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Game Info */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">Game Information</h3>
              <div className="space-y-3">
                <div>
                  <strong>Developer:</strong> {game.developer}
                </div>
                <div>
                  <strong>Publisher:</strong> {game.publisher}
                </div>
                <div>
                  <strong>Release Date:</strong> {releaseDate}
                </div>
                <div>
                  <strong>Age Rating:</strong> {game.ageRating}
                </div>
                <div>
                  <strong>Category:</strong>{" "}
                  <span className="capitalize">{game.category}</span>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">Available Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {platform.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-bold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/games?tag=${tag}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Note: generateMetadata is not available in client components
// Metadata will be handled by the parent layout or through dynamic updates

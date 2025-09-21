"use client";

import Link from "next/link";
import Image from "next/image";
import { StarIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

// Get games from localStorage (from CMS)
function getGames() {
  if (typeof window !== "undefined") {
    const savedGames = localStorage.getItem("kecegame-games");
    if (savedGames) {
      return JSON.parse(savedGames).filter((game) => game.published);
    }
  }

  // Fallback sample data
  return [
    {
      title: "Cyberpunk 2077",
      slug: "cyberpunk-2077",
      shortDescription:
        "Open-world action-adventure RPG set in a dystopian future",
      featuredImage: "/images/games/cyberpunk-2077-featured.jpg",
      category: "rpg",
      price: 59.99,
      discount: 20,
      rating: 8.5,
      tags: ["cyberpunk", "rpg", "open-world", "futuristic", "action"],
      featured: true,
      published: true,
    },
    {
      title: "The Witcher 3: Wild Hunt",
      slug: "the-witcher-3",
      shortDescription:
        "Epic fantasy RPG with deep storytelling and vast open world",
      featuredImage: "/images/games/witcher-3-featured.jpg",
      category: "rpg",
      price: 29.99,
      discount: 0,
      rating: 9.5,
      tags: ["fantasy", "rpg", "open-world", "medieval", "story-driven"],
      featured: true,
      published: true,
    },
    {
      title: "Elden Ring",
      slug: "elden-ring",
      shortDescription: "Dark fantasy action RPG with challenging gameplay",
      featuredImage: "/images/games/elden-ring-featured.jpg",
      category: "rpg",
      price: 59.99,
      discount: 10,
      rating: 9.0,
      tags: ["dark-souls", "rpg", "open-world", "challenging", "fantasy"],
      featured: false,
      published: true,
    },
  ];
}

export default function GamesPage({ searchParams }) {
  const [games, setGames] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setGames(getGames());
    // Handle searchParams asynchronously
    const handleSearchParams = async () => {
      const params = await searchParams;
      setSelectedTag(params?.tag || null);
      setSelectedCategory(params?.category || null);
    };
    handleSearchParams();
  }, [searchParams]);

  // Filter games based on search params
  const filteredGames = games.filter((game) => {
    if (selectedTag && !game.tags.includes(selectedTag)) return false;
    if (selectedCategory && game.category !== selectedCategory) return false;
    return true;
  });

  const categories = [...new Set(games.map((game) => game.category))];
  const allTags = [...new Set(games.flatMap((game) => game.tags))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Games Library
          </h1>
          <p className="text-lg text-gray-600">
            Discover and explore our collection of amazing games
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
              {/* Categories */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="space-y-2">
                  <Link
                    href="/games"
                    className={`block rounded-lg px-3 py-2 transition-colors ${
                      !selectedCategory
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/games?category=${category}`}
                      className={`block rounded-lg px-3 py-2 capitalize transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/games?tag=${tag}`}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedTag === tag
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTag || selectedCategory) && (
                <div>
                  <Link
                    href="/games"
                    className="block w-full rounded-lg bg-gray-200 px-4 py-2 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300"
                  >
                    Clear Filters
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredGames.length} Game
                {filteredGames.length !== 1 ? "s" : ""} Found
              </h2>
              {(selectedTag || selectedCategory) && (
                <p className="mt-2 text-gray-600">
                  {selectedCategory && (
                    <span className="mr-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                      Tag: #{selectedTag}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredGames.map((game) => {
                const finalPrice = game.discount
                  ? game.price * (1 - game.discount / 100)
                  : game.price;

                return (
                  <div
                    key={game.slug}
                    className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
                  >
                    <Link href={`/games/${game.slug}`}>
                      <div className="relative">
                        <Image
                          src={game.featuredImage}
                          alt={game.title}
                          width={400}
                          height={225}
                          className="h-48 w-full object-cover"
                        />
                        {game.featured && (
                          <div className="absolute top-2 left-2 rounded bg-yellow-500 px-2 py-1 text-sm font-medium text-white">
                            Featured
                          </div>
                        )}
                        {game.discount > 0 && (
                          <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-sm font-medium text-white">
                            -{game.discount}%
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 capitalize">
                          {game.category}
                        </span>
                      </div>

                      <Link href={`/games/${game.slug}`}>
                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600">
                          {game.title}
                        </h3>
                      </Link>

                      <p className="mb-4 line-clamp-2 text-gray-600">
                        {game.shortDescription}
                      </p>

                      <div className="mb-4 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(game.rating / 2)
                                  ? "fill-current text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {game.rating}/10
                        </span>
                      </div>

                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          {game.discount > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-900">
                                ${finalPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${game.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-gray-900">
                              ${game.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                          Add to Cart
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {game.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/games?tag=${tag}`}
                            className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
                          >
                            #{tag}
                          </Link>
                        ))}
                        {game.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{game.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredGames.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-4 text-gray-400">
                  <TagIcon className="mx-auto h-16 w-16" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No games found
                </h3>
                <p className="mb-4 text-gray-600">
                  Try adjusting your filters or browse all games.
                </p>
                <Link
                  href="/games"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  View All Games
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Note: metadata export is not available in client components
// Metadata will be handled by the parent layout

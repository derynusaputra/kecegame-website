"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/editor/QuillEditor";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function QuillCMSPage() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    category: "action",
    platforms: [],
    releaseDate: "",
    developer: "",
    publisher: "",
    price: "",
    discount: "",
    ageRating: "E",
    featured: false,
    published: true,
    content: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGames = localStorage.getItem("kecegame-games");
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    }
  }, []);

  // Save data to localStorage whenever games change
  useEffect(() => {
    localStorage.setItem("kecegame-games", JSON.stringify(games));
  }, [games]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title" && !editingGame) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameData = {
      ...formData,
      id: editingGame ? editingGame.id : Date.now().toString(),
      createdAt: editingGame ? editingGame.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingGame) {
      setGames((prev) =>
        prev.map((game) => (game.id === editingGame.id ? gameData : game))
      );
    } else {
      setGames((prev) => [...prev, gameData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      category: "action",
      platforms: [],
      releaseDate: "",
      developer: "",
      publisher: "",
      price: "",
      discount: "",
      ageRating: "E",
      featured: false,
      published: true,
      content: "",
    });
    setEditingGame(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingGame(item);
    setFormData({
      ...item,
      platforms: item.platforms || [],
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus game ini?")) {
      setGames((prev) => prev.filter((game) => game.id !== id));
    }
  };

  const handleView = (item) => {
    router.push(`/games/${item.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Game Content Management
            </h1>
            <p className="mt-2 text-gray-600">
              Kelola konten game dengan mudah menggunakan Quill Editor
            </p>
          </div>

          <div className="p-6">
            {!showForm ? (
              <>
                {/* Action Bar */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Daftar Games ({games.length})
                  </h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Tambah Game</span>
                  </button>
                </div>

                {/* Games List */}
                {games.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-gray-400">
                      <PlusIcon className="mx-auto h-16 w-16" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      Belum ada games
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Mulai dengan menambahkan game pertama Anda
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                    >
                      Tambah Game
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                      <div
                        key={game.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                            {game.title}
                          </h3>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleView(game)}
                              className="p-1 text-gray-400 transition-colors hover:text-blue-600"
                              title="Lihat"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(game)}
                              className="p-1 text-gray-400 transition-colors hover:text-yellow-600"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(game.id)}
                              className="p-1 text-gray-400 transition-colors hover:text-red-600"
                              title="Hapus"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                          {game.shortDescription || game.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="capitalize">{game.category}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              game.published
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {game.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Form Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingGame ? "Edit" : "Tambah"} Game
                  </h2>
                  <button
                    onClick={resetForm}
                    className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    <span>Batal</span>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Judul *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Slug *
                        </label>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Deskripsi Singkat *
                        </label>
                        <textarea
                          name="shortDescription"
                          value={formData.shortDescription}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Deskripsi Lengkap *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Game Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Kategori *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="action">Action</option>
                          <option value="adventure">Adventure</option>
                          <option value="rpg">RPG</option>
                          <option value="strategy">Strategy</option>
                          <option value="simulation">Simulation</option>
                          <option value="sports">Sports</option>
                          <option value="racing">Racing</option>
                          <option value="puzzle">Puzzle</option>
                          <option value="horror">Horror</option>
                          <option value="fighting">Fighting</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Developer *
                        </label>
                        <input
                          type="text"
                          name="developer"
                          value={formData.developer}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Publisher *
                        </label>
                        <input
                          type="text"
                          name="publisher"
                          value={formData.publisher}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tanggal Rilis *
                        </label>
                        <input
                          type="date"
                          name="releaseDate"
                          value={formData.releaseDate}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Harga
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Diskon (%)
                        </label>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Rating Usia *
                        </label>
                        <select
                          name="ageRating"
                          value={formData.ageRating}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="E">E (Everyone)</option>
                          <option value="E10+">E10+ (Everyone 10+)</option>
                          <option value="T">T (Teen)</option>
                          <option value="M">M (Mature)</option>
                          <option value="AO">AO (Adults Only)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Platform
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {[
                        "pc",
                        "ps5",
                        "ps4",
                        "xbox-series",
                        "xbox-one",
                        "switch",
                        "mobile",
                        "web",
                      ].map((platform) => (
                        <label
                          key={platform}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.platforms.includes(platform)}
                            onChange={() => handlePlatformChange(platform)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {platform.replace("-", " ")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rich Text Content */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Konten Detail
                    </label>
                    <QuillEditor
                      value={formData.content}
                      onChange={handleContentChange}
                      placeholder="Tulis konten detail game di sini..."
                    />
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Published</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span>{editingGame ? "Update" : "Simpan"}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

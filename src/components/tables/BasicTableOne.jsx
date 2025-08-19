"use client";
import React, { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/context/SidebarContext";
import ProductTable from "./ProductTable";

// Sample data based on the provided JSON structure
const tableData = [
  {
    id: "cmed9p4fw0001qaxi1kiqakvr",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "MOBILELEGEND - 706 Diamond",
    category: "Games",
    brand: "MOBILE LEGENDS",
    type: "Umum",
    seller_name: "ATLANTIC PEDIA",
    price: 161113,
    buyer_sku_code: "1updatedery",
    buyer_product_status: true,
    seller_product_status: false,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "no pelanggan = gabungan antara user_id dan zone_id",
    createdAt: "2025-08-15T20:15:11.802Z",
    updateAt: "2025-08-16T06:19:06.357Z",
  },
  {
    id: "cmed9cfu9000hqab4sh0xt50a",
    userId: "1",
    desc_product: "Deskripsi custom yang diupdate lagi",
    foto_product: "https://example.com/image.jpg",
    product_name: "PLN 5.000",
    category: "PLN",
    brand: "PLN",
    type: "Umum",
    seller_name: "HARMA RELOAD H2H",
    price: 6540,
    buyer_sku_code: "PLN-5000",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "23:30",
    end_cut_off: "00:30",
    desc: "masukkan nomor meter/id pelanggan",
    createdAt: "2025-08-15T20:05:20.050Z",
    updateAt: "2025-08-16T06:19:06.406Z",
  },
  {
    id: "cmed9cfu8000fqab413qtwyd3",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "PLN 100.000",
    category: "PLN",
    brand: "PLN",
    type: "Umum",
    seller_name: "PT Dedayu Opus Maxima",
    price: 100578,
    buyer_sku_code: "pln-100k",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "23:30",
    end_cut_off: "00:30",
    desc: "masukkan nomor meter/id pelanggan",
    createdAt: "2025-08-15T20:05:20.049Z",
    updateAt: "2025-08-16T06:19:06.405Z",
  },
  {
    id: "cmed9cfu7000dqab4qmdxvvt3",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "MOBILELEGEND - 3 Diamond",
    category: "Games",
    brand: "MOBILE LEGENDS",
    type: "Umum",
    seller_name: "NEXT GAME 2",
    price: 999,
    buyer_sku_code: "ml3diamont",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "no pelanggan = gabungan antara user_id dan zone_id",
    createdAt: "2025-08-15T20:05:20.048Z",
    updateAt: "2025-08-16T06:19:06.403Z",
  },
  {
    id: "cmed9cfu50009qab40aqd09t3",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "Hago 5 Diamonds",
    category: "Games",
    brand: "HAGO",
    type: "Umum",
    seller_name: "NARATAMA RELOAD",
    price: 1545,
    buyer_sku_code: "hago5diamons",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "Masukkan Player ID Hago Anda",
    createdAt: "2025-08-15T20:05:20.046Z",
    updateAt: "2025-08-16T06:19:06.401Z",
  },
  {
    id: "cmed9cfu40007qab484bhegvh",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "DANA 150.000",
    category: "E-Money",
    brand: "DANA",
    type: "Umum",
    seller_name: "PT GALERI MULTI PAYMENT",
    price: 150120,
    buyer_sku_code: "3mVr71",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "23:30",
    end_cut_off: "00:15",
    desc: "-",
    createdAt: "2025-08-15T20:05:20.045Z",
    updateAt: "2025-08-16T06:19:06.399Z",
  },
  {
    id: "cmed9cfu30005qab4zhulv83q",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "SHOPEE PAY 10.000",
    category: "E-Money",
    brand: "SHOPEE PAY",
    type: "Umum",
    seller_name: "PT MMBC TOUR AND TRAVEL",
    price: 10500,
    buyer_sku_code: "3mVn67",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "23:15",
    end_cut_off: "01:15",
    desc: "SHOPEE PAY 10.000",
    createdAt: "2025-08-15T20:05:20.043Z",
    updateAt: "2025-08-16T06:19:06.397Z",
  },
  {
    id: "cmed9cfu20003qab4rtjgtr0l",
    userId: "1",
    desc_product: null,
    foto_product: null,
    product_name: "DANA 40.000",
    category: "E-Money",
    brand: "DANA",
    type: "Umum",
    seller_name: "PT GALERI MULTI PAYMENT",
    price: 40120,
    buyer_sku_code: "3mao78",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: true,
    start_cut_off: "23:30",
    end_cut_off: "00:15",
    desc: "-",
    createdAt: "2025-08-15T20:05:20.042Z",
    updateAt: "2025-08-16T06:19:06.395Z",
  },
];

// Add sample data for Data category with SHOPEE PAY
const additionalData = [
  {
    id: "data-001",
    product_name: "Indosat 50 MB 30 Hari",
    category: "Data",
    brand: "INDOSAT",
    type: "Umum",
    seller_name: "Invalid Seller !",
    price: 0,
    buyer_sku_code: "Kode Proc",
    buyer_product_status: false,
    seller_product_status: false,
    unlimited_stock: false,
    stock: 0,
    multi: false,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "",
    createdAt: "2025-08-15T20:05:20.042Z",
    updateAt: "2025-08-16T06:19:06.395Z",
  },
  {
    id: "data-002",
    product_name: "by.U 1GB 7 Hari",
    category: "Data",
    brand: "by.U",
    type: "Freedom Harian",
    seller_name: "VALID SELLER",
    price: 15000,
    buyer_sku_code: "byu-1gb",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 100,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "",
    createdAt: "2025-08-15T20:05:20.042Z",
    updateAt: "2025-08-16T06:19:06.395Z",
  },
  {
    id: "data-003",
    product_name: "SHOPEE PAY Data 5GB",
    category: "Data",
    brand: "SHOPEE PAY",
    type: "Umum",
    seller_name: "SHOPEE PAY SELLER",
    price: 25000,
    buyer_sku_code: "sp-data-5gb",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 50,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "Paket data Shopee Pay",
    createdAt: "2025-08-15T20:05:20.042Z",
    updateAt: "2025-08-16T06:19:06.395Z",
  },
  {
    id: "data-004",
    product_name: "SHOPEE PAY Data 10GB",
    category: "Data",
    brand: "SHOPEE PAY",
    type: "Umum",
    seller_name: "SHOPEE PAY SELLER",
    price: 45000,
    buyer_sku_code: "sp-data-10gb",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 30,
    multi: true,
    start_cut_off: "00:00",
    end_cut_off: "00:00",
    desc: "Paket data Shopee Pay 10GB",
    createdAt: "2025-08-15T20:05:20.042Z",
    updateAt: "2025-08-16T06:19:06.395Z",
  },
];

const allData = [...tableData, ...additionalData];

// Get unique categories from actual data
const getUniqueCategories = () => {
  const categories = [...new Set(allData.map((item) => item.category))];
  return categories.sort();
};

// Get unique brands from selected category
const getBrandsForCategory = (category) => {
  const brands = [
    ...new Set(
      allData
        .filter((item) => item.category === category)
        .map((item) => item.brand)
    ),
  ];
  return brands.sort();
};

// Get unique types from selected category and brand
const getTypesForCategoryAndBrand = (category, brand) => {
  let filteredData = allData.filter((item) => item.category === category);
  if (brand !== "All") {
    filteredData = filteredData.filter((item) => item.brand === brand);
  }
  const types = [...new Set(filteredData.map((item) => item.type))];
  return types.sort();
};

export default function BasicTableOne() {
  const { isExpanded } = useSidebar();
  const [selectedCategory, setSelectedCategory] = useState("Data");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [showDisturbanceProducts, setShowDisturbanceProducts] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const categories = getUniqueCategories();
  const brands = ["All", ...getBrandsForCategory(selectedCategory)];
  const types = [
    "All",
    ...getTypesForCategoryAndBrand(selectedCategory, selectedBrand),
  ];

  // Reset brand and type when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBrand("All");
    setSelectedType("All");
  };

  // Reset type when brand changes
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedType("All");
  };

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = allData.filter((item) => item.category === selectedCategory);

    if (selectedBrand !== "All") {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.buyer_sku_code
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.seller_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showDisturbanceProducts) {
      filtered = filtered.filter(
        (item) => !item.seller_product_status || !item.buyer_product_status
      );
    }

    return filtered;
  }, [
    selectedCategory,
    selectedBrand,
    selectedType,
    searchTerm,
    showDisturbanceProducts,
    showAllProducts,
  ]);

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllProductsSelection = () => {
    if (selectedProducts.length === filteredData.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredData.map((item) => item.id));
    }
  };

  const toggleRowExpansion = (productId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const deleteSelectedProducts = () => {
    if (selectedProducts.length > 0) {
      alert(`Menghapus ${selectedProducts.length} produk yang dipilih`);
      setSelectedProducts([]);
    } else {
      alert("Pilih produk terlebih dahulu");
    }
  };

  const addNewProduct = () => {
    alert("Membuka form tambah produk baru");
  };

  const searchAllProducts = () => {
    setSearchTerm("");
    setShowDisturbanceProducts(false);
    setShowAllProducts(false);
  };

  const toggleDisturbanceProducts = () => {
    setShowDisturbanceProducts(!showDisturbanceProducts);
    setShowAllProducts(false);
  };

  const toggleAllProducts = () => {
    setShowAllProducts(!showAllProducts);
    setShowDisturbanceProducts(false);
  };

  const updateSeller = (productId) => {
    alert(`Mengubah seller untuk produk ${productId}`);
  };

  const approveProduct = (productId) => {
    alert(`Menyetujui produk ${productId}`);
  };

  const deleteProduct = (productId) => {
    alert(`Menghapus produk ${productId}`);
  };

  const formatPrice = (price) => {
    if (price === 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`w-full space-y-4 transition-all duration-300 lg:space-y-6 ${isExpanded ? "lg:pr-4" : "lg:pr-0"}`}
    >
      {/* Category Tabs */}
      <div className="w-full border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex-shrink-0 border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="w-full space-y-3">
        {/* Brand Filters */}
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandChange(brand)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedBrand === brand
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? "bg-gray-500 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons and Search */}
      <div
        className={`flex w-full flex-col gap-4 transition-all duration-300 lg:flex-row lg:items-center lg:justify-between ${isExpanded ? "lg:gap-3" : "lg:gap-4"}`}
      >
        {/* Left side - Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={deleteSelectedProducts}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-red-600"
          >
            <span className="hidden sm:inline">Hapus Produk yang Dipilih</span>
            <span className="sm:hidden">Hapus ({selectedProducts.length})</span>
          </button>
          <button
            onClick={addNewProduct}
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-600"
          >
            + Tambah Produk
          </button>
        </div>

        {/* Right side - Search and filter buttons */}
        <div
          className={`flex w-full flex-col gap-3 transition-all duration-300 lg:w-auto ${isExpanded ? "lg:min-w-0" : "lg:min-w-0"}`}
        >
          {/* Search and filter buttons row */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={searchAllProducts}
              className="flex items-center justify-center space-x-1 rounded-md bg-blue-100 px-3 py-2 text-sm font-medium whitespace-nowrap text-blue-700 transition-colors hover:bg-blue-200"
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Q Cari Semua Produk</span>
              <span className="sm:hidden">Cari Semua</span>
            </button>
            <button
              onClick={toggleDisturbanceProducts}
              className={`flex items-center justify-center space-x-1 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                showDisturbanceProducts
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                Tampilkan Produk Gangguan
              </span>
              <span className="sm:hidden">Produk Gangguan</span>
            </button>
            <button
              onClick={toggleAllProducts}
              className={`flex items-center justify-center space-x-1 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                showAllProducts
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilkan Semua Produk</span>
              <span className="sm:hidden">Semua Produk</span>
            </button>
          </div>

          {/* Search input */}
          <div
            className={`relative w-full transition-all duration-300 sm:w-80 lg:w-64 ${isExpanded ? "lg:w-56" : "lg:w-64"}`}
          >
            <input
              type="text"
              placeholder={`Cari produk ${selectedCategory}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <MagnifyingGlassIcon className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="w-full text-sm text-gray-600 dark:text-gray-400">
        Menampilkan {filteredData.length} produk dari kategori{" "}
        {selectedCategory}
        {selectedBrand !== "All" && ` - Brand: ${selectedBrand}`}
        {selectedType !== "All" && ` - Type: ${selectedType}`}
      </div>

      <div className="w-full rounded-xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="w-full overflow-x-auto">
          <ProductTable
            filteredData={filteredData}
            selectedProducts={selectedProducts}
            expandedRows={expandedRows}
            toggleProductSelection={toggleProductSelection}
            toggleAllProductsSelection={toggleAllProductsSelection}
            toggleRowExpansion={toggleRowExpansion}
            updateSeller={updateSeller}
            approveProduct={approveProduct}
            deleteProduct={deleteProduct}
            formatPrice={formatPrice}
          />
        </div>
      </div>

      {/* Table */}
      {/* <ProductTable
                filteredData={filteredData}
                selectedProducts={selectedProducts}
                expandedRows={expandedRows}
                toggleProductSelection={toggleProductSelection}
                toggleAllProductsSelection={toggleAllProductsSelection}
                toggleRowExpansion={toggleRowExpansion}
                updateSeller={updateSeller}
                approveProduct={approveProduct}
                deleteProduct={deleteProduct}
                formatPrice={formatPrice}
            /> */}
    </div>
  );
}

"use client";
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";

// Sample data based on the provided JSON structure
const tableData = [
    {
        "id": "cmed9p4fw0001qaxi1kiqakvr",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "MOBILELEGEND - 706 Diamond",
        "category": "Games",
        "brand": "MOBILE LEGENDS",
        "type": "Umum",
        "seller_name": "ATLANTIC PEDIA",
        "price": 161113,
        "buyer_sku_code": "1updatedery",
        "buyer_product_status": true,
        "seller_product_status": false,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "no pelanggan = gabungan antara user_id dan zone_id",
        "createdAt": "2025-08-15T20:15:11.802Z",
        "updateAt": "2025-08-16T06:19:06.357Z"
    },
    {
        "id": "cmed9cfu9000hqab4sh0xt50a",
        "userId": "1",
        "desc_product": "Deskripsi custom yang diupdate lagi",
        "foto_product": "https://example.com/image.jpg",
        "product_name": "PLN 5.000",
        "category": "PLN",
        "brand": "PLN",
        "type": "Umum",
        "seller_name": "HARMA RELOAD H2H",
        "price": 6540,
        "buyer_sku_code": "PLN-5000",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "23:30",
        "end_cut_off": "00:30",
        "desc": "masukkan nomor meter/id pelanggan",
        "createdAt": "2025-08-15T20:05:20.050Z",
        "updateAt": "2025-08-16T06:19:06.406Z"
    },
    {
        "id": "cmed9cfu8000fqab413qtwyd3",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "PLN 100.000",
        "category": "PLN",
        "brand": "PLN",
        "type": "Umum",
        "seller_name": "PT Dedayu Opus Maxima",
        "price": 100578,
        "buyer_sku_code": "pln-100k",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "23:30",
        "end_cut_off": "00:30",
        "desc": "masukkan nomor meter/id pelanggan",
        "createdAt": "2025-08-15T20:05:20.049Z",
        "updateAt": "2025-08-16T06:19:06.405Z"
    },
    {
        "id": "cmed9cfu7000dqab4qmdxvvt3",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "MOBILELEGEND - 3 Diamond",
        "category": "Games",
        "brand": "MOBILE LEGENDS",
        "type": "Umum",
        "seller_name": "NEXT GAME 2",
        "price": 999,
        "buyer_sku_code": "ml3diamont",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "no pelanggan = gabungan antara user_id dan zone_id",
        "createdAt": "2025-08-15T20:05:20.048Z",
        "updateAt": "2025-08-16T06:19:06.403Z"
    },
    {
        "id": "cmed9cfu50009qab40aqd09t3",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "Hago 5 Diamonds",
        "category": "Games",
        "brand": "HAGO",
        "type": "Umum",
        "seller_name": "NARATAMA RELOAD",
        "price": 1545,
        "buyer_sku_code": "hago5diamons",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "Masukkan Player ID Hago Anda",
        "createdAt": "2025-08-15T20:05:20.046Z",
        "updateAt": "2025-08-16T06:19:06.401Z"
    },
    {
        "id": "cmed9cfu40007qab484bhegvh",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "DANA 150.000",
        "category": "E-Money",
        "brand": "DANA",
        "type": "Umum",
        "seller_name": "PT GALERI MULTI PAYMENT",
        "price": 150120,
        "buyer_sku_code": "3mVr71",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "23:30",
        "end_cut_off": "00:15",
        "desc": "-",
        "createdAt": "2025-08-15T20:05:20.045Z",
        "updateAt": "2025-08-16T06:19:06.399Z"
    },
    {
        "id": "cmed9cfu30005qab4zhulv83q",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "SHOPEE PAY 10.000",
        "category": "E-Money",
        "brand": "SHOPEE PAY",
        "type": "Umum",
        "seller_name": "PT MMBC TOUR AND TRAVEL",
        "price": 10500,
        "buyer_sku_code": "3mVn67",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "23:15",
        "end_cut_off": "01:15",
        "desc": "SHOPEE PAY 10.000",
        "createdAt": "2025-08-15T20:05:20.043Z",
        "updateAt": "2025-08-16T06:19:06.397Z"
    },
    {
        "id": "cmed9cfu20003qab4rtjgtr0l",
        "userId": "1",
        "desc_product": null,
        "foto_product": null,
        "product_name": "DANA 40.000",
        "category": "E-Money",
        "brand": "DANA",
        "type": "Umum",
        "seller_name": "PT GALERI MULTI PAYMENT",
        "price": 40120,
        "buyer_sku_code": "3mao78",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": true,
        "stock": 0,
        "multi": true,
        "start_cut_off": "23:30",
        "end_cut_off": "00:15",
        "desc": "-",
        "createdAt": "2025-08-15T20:05:20.042Z",
        "updateAt": "2025-08-16T06:19:06.395Z"
    }
];

// Add sample data for Data category with SHOPEE PAY
const additionalData = [
    {
        "id": "data-001",
        "product_name": "Indosat 50 MB 30 Hari",
        "category": "Data",
        "brand": "INDOSAT",
        "type": "Umum",
        "seller_name": "Invalid Seller !",
        "price": 0,
        "buyer_sku_code": "Kode Proc",
        "buyer_product_status": false,
        "seller_product_status": false,
        "unlimited_stock": false,
        "stock": 0,
        "multi": false,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "",
        "createdAt": "2025-08-15T20:05:20.042Z",
        "updateAt": "2025-08-16T06:19:06.395Z"
    },
    {
        "id": "data-002",
        "product_name": "by.U 1GB 7 Hari",
        "category": "Data",
        "brand": "by.U",
        "type": "Freedom Harian",
        "seller_name": "VALID SELLER",
        "price": 15000,
        "buyer_sku_code": "byu-1gb",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": false,
        "stock": 100,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "",
        "createdAt": "2025-08-15T20:05:20.042Z",
        "updateAt": "2025-08-16T06:19:06.395Z"
    },
    {
        "id": "data-003",
        "product_name": "SHOPEE PAY Data 5GB",
        "category": "Data",
        "brand": "SHOPEE PAY",
        "type": "Umum",
        "seller_name": "SHOPEE PAY SELLER",
        "price": 25000,
        "buyer_sku_code": "sp-data-5gb",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": false,
        "stock": 50,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "Paket data Shopee Pay",
        "createdAt": "2025-08-15T20:05:20.042Z",
        "updateAt": "2025-08-16T06:19:06.395Z"
    },
    {
        "id": "data-004",
        "product_name": "SHOPEE PAY Data 10GB",
        "category": "Data",
        "brand": "SHOPEE PAY",
        "type": "Umum",
        "seller_name": "SHOPEE PAY SELLER",
        "price": 45000,
        "buyer_sku_code": "sp-data-10gb",
        "buyer_product_status": true,
        "seller_product_status": true,
        "unlimited_stock": false,
        "stock": 30,
        "multi": true,
        "start_cut_off": "00:00",
        "end_cut_off": "00:00",
        "desc": "Paket data Shopee Pay 10GB",
        "createdAt": "2025-08-15T20:05:20.042Z",
        "updateAt": "2025-08-16T06:19:06.395Z"
    }
];

const allData = [...tableData, ...additionalData];

// Get unique categories from actual data
const getUniqueCategories = () => {
    const categories = [...new Set(allData.map(item => item.category))];
    return categories.sort();
};

// Get unique brands from selected category
const getBrandsForCategory = (category) => {
    const brands = [...new Set(allData.filter(item => item.category === category).map(item => item.brand))];
    return brands.sort();
};

// Get unique types from selected category and brand
const getTypesForCategoryAndBrand = (category, brand) => {
    let filteredData = allData.filter(item => item.category === category);
    if (brand !== "All") {
        filteredData = filteredData.filter(item => item.brand === brand);
    }
    const types = [...new Set(filteredData.map(item => item.type))];
    return types.sort();
};

export default function BasicTableOne() {
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
    const types = ["All", ...getTypesForCategoryAndBrand(selectedCategory, selectedBrand)];
    
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
        let filtered = allData.filter(item => item.category === selectedCategory);
        
        if (selectedBrand !== "All") {
            filtered = filtered.filter(item => item.brand === selectedBrand);
        }
        
        if (selectedType !== "All") {
            filtered = filtered.filter(item => item.type === selectedType);
        }
        
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.buyer_sku_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.seller_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (showDisturbanceProducts) {
            filtered = filtered.filter(item => !item.seller_product_status || !item.buyer_product_status);
        }
        
        return filtered;
    }, [selectedCategory, selectedBrand, selectedType, searchTerm, showDisturbanceProducts, showAllProducts]);
    
    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };
    
    const toggleAllProductsSelection = () => {
        if (selectedProducts.length === filteredData.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredData.map(item => item.id));
        }
    };
    
    const toggleRowExpansion = (productId) => {
        setExpandedRows(prev => ({
            ...prev,
            [productId]: !prev[productId]
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
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="space-y-4 lg:space-y-6">
            {/* Category Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex pb-2 space-x-1 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                selectedCategory === category
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-3">
                {/* Brand Filters */}
                <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                        <button
                            key={brand}
                            onClick={() => handleBrandChange(brand)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                selectedBrand === brand
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
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
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                selectedType === type
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons and Search */}
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={deleteSelectedProducts}
                        className="px-3 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Hapus Produk yang Dipilih ({selectedProducts.length})
                    </button>
                    <button 
                        onClick={addNewProduct}
                        className="px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        + Tambah Produk
                    </button>
                </div>

                <div className="flex flex-col items-start w-full gap-2 sm:flex-row sm:items-center lg:w-auto">
                    <button 
                        onClick={searchAllProducts}
                        className="flex items-center px-3 py-2 space-x-1 text-sm font-medium text-blue-700 transition-colors bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                        <MagnifyingGlassIcon className="w-4 h-4" />
                        <span>Q Cari Semua Produk</span>
                    </button>
                    <button 
                        onClick={toggleDisturbanceProducts}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                            showDisturbanceProducts 
                                ? 'bg-red-500 text-white' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                    >
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <span>Tampilkan Produk Gangguan</span>
                    </button>
                    <button 
                        onClick={toggleAllProducts}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 ${
                            showAllProducts 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                    >
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <span>Tampilkan Semua Produk</span>
                    </button>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder={`Q cari produk pada kategori ${selectedCategory}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                        <MagnifyingGlassIcon className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan {filteredData.length} produk dari kategori {selectedCategory}
                {selectedBrand !== "All" && ` - Brand: ${selectedBrand}`}
                {selectedType !== "All" && ` - Type: ${selectedType}`}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === filteredData.length && filteredData.length > 0}
                                        onChange={toggleAllProductsSelection}
                                        className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Kode Produk
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Harga Max (Rp)
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Nama Produk
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Pilih Seller
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Seller (sort status)
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Harga
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Stok
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Multi
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                        Tidak ada produk yang ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                        <TableCell className="px-3 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => toggleProductSelection(product.id)}
                                                className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => toggleRowExpansion(product.id)}
                                                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                                >
                                                    {expandedRows[product.id] ? (
                                                        <ChevronDownIcon className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronRightIcon className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <input
                                                    type="text"
                                                    defaultValue={product.buyer_sku_code}
                                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-w-[100px]"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <input
                                                type="number"
                                                defaultValue={product.price}
                                                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-w-[80px]"
                                            />
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="font-medium text-gray-800 dark:text-white min-w-[150px]">
                                                {product.product_name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <button 
                                                onClick={() => updateSeller(product.id)}
                                                className="px-3 py-1 text-xs font-medium text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                Ubah Seller
                                            </button>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="flex items-center space-x-2 min-w-[120px]">
                                                {product.seller_name.includes("Invalid") ? (
                                                    <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                                                ) : (
                                                    <CheckIcon className="w-4 h-4 text-green-500" />
                                                )}
                                                <span className={`text-sm ${
                                                    product.seller_name.includes("Invalid") 
                                                        ? 'text-red-600 dark:text-red-400' 
                                                        : 'text-green-600 dark:text-green-400'
                                                }`}>
                                                    {product.seller_name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                                {formatPrice(product.price)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                                {product.unlimited_stock ? "∞" : product.stock}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                                {product.multi ? "✓ Ya" : "✗ Tidak"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={product.buyer_product_status}
                                                        readOnly
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-10 h-6 rounded-full transition-colors ${
                                                        product.buyer_product_status 
                                                            ? 'bg-blue-500' 
                                                            : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}>
                                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${
                                                            product.buyer_product_status ? 'translate-x-5' : 'translate-x-1'
                                                        }`} />
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {product.buyer_product_status ? "ON" : "OFF"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-3 py-3">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => approveProduct(product.id)}
                                                    className="p-1 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                                >
                                                    <CheckIcon className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-1 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

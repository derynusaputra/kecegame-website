"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/context/SidebarContext";

const ProductTable = ({
  filteredData,
  selectedProducts,
  expandedRows,
  toggleProductSelection,
  toggleAllProductsSelection,
  toggleRowExpansion,
  updateSeller,
  approveProduct,
  deleteProduct,
  formatPrice,
}) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell
              isHeader
              className="min-w-[40px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              <input
                type="checkbox"
                checked={
                  selectedProducts.length === filteredData.length &&
                  filteredData.length > 0
                }
                onChange={toggleAllProductsSelection}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Kode Produk
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Harga Max
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Nama Produk
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Pilih Seller
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Seller Status
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Harga
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Stok
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Multi
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Status
            </TableCell>
            <TableCell
              isHeader
              className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={11}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                Tidak ada produk yang ditemukan
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="px-2 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleRowExpansion(product.id)}
                      className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {expandedRows[product.id] ? (
                        <ChevronDownIcon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      type="text"
                      defaultValue={product.buyer_sku_code}
                      className="min-w-[100px] rounded border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <input
                    type="number"
                    defaultValue={product.price}
                    className="min-w-[80px] rounded border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="min-w-[150px] font-medium text-gray-800 dark:text-white">
                    {product.product_name}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <button
                    onClick={() => updateSeller(product.id)}
                    className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    Ubah Seller
                  </button>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="flex min-w-[120px] items-center space-x-2">
                    {product.seller_name.includes("Invalid") ? (
                      <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    )}
                    <span
                      className={`text-sm ${
                        product.seller_name.includes("Invalid")
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {product.seller_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {formatPrice(product.price)}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {product.unlimited_stock ? "∞" : product.stock}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {product.multi ? "✓ Ya" : "✗ Tidak"}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={product.buyer_product_status}
                        readOnly
                        className="sr-only"
                      />
                      <div
                        className={`h-6 w-10 rounded-full transition-colors ${
                          product.buyer_product_status
                            ? "bg-blue-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.buyer_product_status
                              ? "translate-x-5"
                              : "translate-x-1"
                          }`}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {product.buyer_product_status ? "ON" : "OFF"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => approveProduct(product.id)}
                      className="rounded bg-blue-500 p-1 text-white transition-colors hover:bg-blue-600"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;

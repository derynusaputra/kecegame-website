"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSidebar } from "@/context/SidebarContext";
import { useDebounce } from "@/hooks/useDebounce";
import { getListBrand } from "@/services/api/brand";
import { configEnv } from "@/services/config";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useState } from "react";
import ModalUpdate from "./ModalUpdate";

export default function MainBrand() {
  const { isExpanded } = useSidebar();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = getListBrand();
  const [selected, setSelected] = useState(null);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const brands = data && data?.data?.data;

  const getStatusColor = (status = "") => {
    const statushed = status.toLowerCase();
    switch (statushed) {
      case "sukses":
        return "text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return " text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Memuat data koneksi...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Terjadi Kesalahan
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {errThirtParty.message || "Gagal memuat data koneksi"}
          </p>
          <button
            onClick={() => getThirtParty()}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`w-full space-y-4 transition-all duration-300 lg:space-y-6 ${
          isExpanded ? "lg:pr-4" : "lg:pr-0"
        }`}
      >
        {/* <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
          itemToDelete={itemToDelete}
          isMultiple={Array.isArray(itemToDelete)}
        />
        <SuccessNotificationModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title={successMessage.title}
          message={successMessage.message}
          autoClose={true}
          autoCloseDelay={3000}
        /> */}

        {/* <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Cari Transaction"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <MagnifyingGlassIcon className="absolute top-2.5 right-3 h-4 w-4 text-gray-400" />
          </div>
        </div> */}

        <div className="w-full rounded-xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div
            className="w-full overflow-x-auto"
            // style={{ width: "calc(100vw - 400px)" }}
          >
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="min-w-[30px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {brands?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="h-24 text-center text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data transaction yang ditemukan
                    </td>
                  </tr>
                ) : (
                  brands?.map((connection, idx) => (
                    <React.Fragment key={connection.id}>
                      <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <TableCell className="px-2 py-3">{idx + 1}</TableCell>
                        <TableCell className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            {connection.urlLogo && (
                              <img
                                src={`${configEnv.baseUrl}${connection.urlLogo}`}
                                className="h-20 w-20 object-contain"
                              />
                            )}
                            {connection?.name}
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-3">
                          {connection?.category}
                        </TableCell>
                        <TableCell className="px-2 py-3 md:table-cell">
                          {connection?.isActive ? "Aktif" : "Nonaktif"}
                        </TableCell>

                        <TableCell className="px-2 py-3 md:table-cell">
                          {moment(connection?.createdAt).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell className="px-2 py-3">
                          <div className="flex space-x-1">
                            {/* <button
                              onClick={() =>
                                alert(`Lihat detail ${connection.name}`)
                              }
                              className="rounded bg-blue-500 p-1 text-white transition-colors hover:bg-blue-600"
                              title="Lihat Detail"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button> */}
                            <button
                              onClick={() => {
                                setSelected(connection);
                                setIsOpenUpdate(true);
                              }}
                              className="rounded bg-yellow-500 p-1 text-white transition-colors hover:bg-yellow-600"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            {/* <button
                              onClick={() => handleSingleDelete(connection)}
                              className="rounded bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                              title="Hapus"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {isOpenUpdate && (
          <ModalUpdate
            isOpen={isOpenUpdate}
            onClose={() => {
              setSelected(null);
              setIsOpenUpdate(false);
            }}
            selected={selected}
          />
        )}
      </div>
    </>
  );
}

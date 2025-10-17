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
import {
  getListBrand,
  getSyncCategoryBrand,
  putBrand,
  putBrandById,
} from "@/services/api/brand";
import { configEnv } from "@/services/config";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import ModalUpdate from "./ModalUpdate";
import { Button } from "@/components/ui/button";
import { EyeIcon, Loader2, Plus, RefreshCw } from "lucide-react";
import ModalCreate from "./ModalCreate";
import { Switch } from "@heroui/react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function MainBrand() {
  const router = useRouter();
  const { isExpanded } = useSidebar();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = getListBrand();
  const [selected, setSelected] = useState(null);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [checked, setIsChecked] = useState(true);
  const qc = useQueryClient();

  const [isSync, setIsync] = useState(false);

  const {
    data: sync,
    isLoading: loadingSync,
    isSuccess,
  } = getSyncCategoryBrand(isSync);

  useEffect(() => {
    if (isSuccess) {
      setIsync(false);
    }
  }, [isSuccess]);

  const brands = data && data?.data?.data;
  const { mutate, isPending } = putBrandById();

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
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-end gap-3">
            <Button onClick={() => setIsync(true)} variant={"outline"}>
              {loadingSync ? (
                <Loader2 className="animate-spin" />
              ) : (
                <RefreshCw />
              )}{" "}
              Sync
            </Button>
            <Button onClick={() => setIsOpenCreate(true)}>
              <Plus /> Add Brand
            </Button>
          </div>
          <div className="mt-5 w-full rounded-xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="min-w-[30px] px-2 py-3 pl-5 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                    >
                      No
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
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
                      <React.Fragment key={idx + "brands"}>
                        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <TableCell className="px-2 py-3 pl-5">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="px-2 py-3">
                            <div className="flex min-w-0 items-center gap-2">
                              {connection.urlLogo && (
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                  <img
                                    src={`${configEnv.baseUrl}${connection.urlLogo}`}
                                    alt={connection?.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <span className="min-w-0 text-sm font-medium break-words">
                                {connection?.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-2 py-3">
                            {connection?.category}
                          </TableCell>
                          <TableCell className="px-2 py-3 md:table-cell">
                            <Switch
                              isSelected={connection?.isActive}
                              onChange={(e) => {
                                const body = {
                                  isActive: e.target.checked,
                                };
                                mutate(
                                  {
                                    id: connection?.id,
                                    isActive: e.target.checked,
                                  },
                                  {
                                    onSuccess: (res) => {
                                      if (res) {
                                        qc.invalidateQueries({
                                          queryKey: ["getListBrand"],
                                        });
                                        toast.success("Update Success");
                                      }
                                    },
                                    onError: (err) => {
                                      if (err) {
                                        toast.error("Internal err");
                                      }
                                    },
                                  }
                                );
                              }}
                            />
                          </TableCell>

                          <TableCell className="px-2 py-3 md:table-cell">
                            {moment(connection?.createdAt).format(
                              "DD MMM YYYY"
                            )}
                          </TableCell>
                          <TableCell className="px-2 py-3">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => {
                                  router.push(
                                    `/admin/brand/${connection.name}?type=${connection?.type}&category=${connection?.category}`
                                  );
                                }}
                                className="rounded bg-blue-500 p-1 text-white transition-colors hover:bg-blue-600"
                                title="Lihat Detail"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </button>
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

        {isOpenCreate && (
          <ModalCreate
            isOpen={isOpenCreate}
            onClose={() => {
              setIsOpenCreate(false);
            }}
          />
        )}
      </div>
    </>
  );
}

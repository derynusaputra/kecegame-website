"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSidebar } from "@/context/SidebarContext";
import { formatRupiah } from "@/helpers/formatRupiah";
import { postProductByBrand } from "@/services/api/brand";
import { getAllProductOther } from "@/services/api/product";
import { configEnv } from "@/services/config";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import moment from "moment";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalCreate from "./_components/ModalCreate";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function BrandDetail() {
  const params = useParams();
  const queryParams = useSearchParams();
  const type = queryParams.get("type");
  const category = queryParams.get("category");
  const [isModalCreate, setIsModalCreate] = useState(false);

  const brand = decodeURIComponent(params?.slug);

  const { isExpanded } = useSidebar();
  const [datas, setDatas] = useState();
  const { mutate, isPending } = postProductByBrand();

  const { data } = getAllProductOther(brand);

  useEffect(() => {
    if (brand && type !== "OTHER") {
      mutate(
        {
          brand: brand,
        },
        {
          onSuccess: (res) => {
            setDatas(res?.data);
          },
        }
      );
    } else {
      setDatas(data?.data?.data);
    }
  }, [brand, type, data]);

  if (isPending) {
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

  return (
    <>
      <div
        className={`w-full space-y-4 transition-all duration-300 lg:space-y-6 ${
          isExpanded ? "lg:pr-4" : "lg:pr-0"
        }`}
      >
        <PageBreadcrumb pageTitle="Product Detail" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between gap-3">
            <div>{brand}</div>

            {type === "OTHER" && (
              <Button onClick={() => setIsModalCreate(true)}>
                <Plus /> Add Product
              </Button>
            )}
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
                      Brand
                    </TableCell>
                    <TableCell
                      isHeader
                      className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                    >
                      Price
                    </TableCell>
                    <TableCell
                      isHeader
                      className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                    >
                      Created At
                    </TableCell>
                    {/* <TableCell
                      isHeader
                      className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                    >
                      Action
                    </TableCell> */}
                  </TableRow>
                </TableHeader>

                {/* body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {datas?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="h-24 text-center text-gray-500 dark:text-gray-400"
                      >
                        Tidak ada data transaction yang ditemukan
                      </td>
                    </tr>
                  ) : (
                    datas?.map((connection, idx) => (
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
                                {connection?.product_name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-2 py-3">
                            {connection?.category}
                          </TableCell>
                          <TableCell className="px-2 py-3 md:table-cell">
                            {connection.brand}
                          </TableCell>
                          <TableCell className="px-2 py-3 md:table-cell">
                            {formatRupiah(connection.price)}
                          </TableCell>
                          <TableCell className="px-2 py-3 md:table-cell">
                            {moment(connection?.createdAt).format(
                              "DD MMM YYYY"
                            )}
                          </TableCell>
                          <TableCell className="hidden px-2 py-3">
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

        {isModalCreate && (
          <ModalCreate
            isOpen={isModalCreate}
            brand={brand}
            category={category}
            onClose={() => setIsModalCreate(false)}
          />
        )}
      </div>
    </>
  );
}

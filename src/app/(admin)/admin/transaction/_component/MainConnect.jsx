"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSidebar } from "@/context/SidebarContext";
import { useThirParty } from "@/hooks/ReactQuery/useThirParty";
import { useModal } from "@/hooks/useModal";
import { getListTransaction } from "@/services/api/transaction";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, Modal, Pagination, useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";
import ApiKeyPreviewModal from "./ApiKeyPreviewModal";
import ConnectionConfigModalHero from "./ConnectionConfigModalHero";
import CreateApiKeyModal from "./CreateApiKeyModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ModalContentLoginLitmatch from "./ModalContentLoginLitmatch";
import SuccessNotificationModal from "./SuccessNotificationModal";
import { moments } from "@tensorflow/tfjs";
import moment from "moment";
import { formatRupiah } from "@/helpers/formatRupiah";
import { useDebounce } from "@/hooks/useDebounce";

export default function MainConnect() {
  const { isExpanded } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);

  const [page, setPage] = useState(1);
  const { data } = getListTransaction({
    page: page,
    limit: 10,
    search: debouncedSearch,
  });
  const transactions = data && data?.data?.data;

  // Modal states
  const { isOpen, openModal, closeModal } = useModal();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [selectedApiKey, setSelectedApiKey] = useState({
    apiKey: "",
    name: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    message: "",
  });

  // Login modal hook - moved to top level to follow Rules of Hooks
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  // Fetch data using React Query
  //   const updateUser = useThirParty.update();
  //   const deleteUser = useThirParty.delete();

  const {
    data: dataThirParty = [],
    isLoading: initLoadThirtParty,
    error: errThirtParty,
    refetch: getThirtParty,
    isFetching: loadThirtParty,
  } = useThirParty.get();

  useEffect(() => {
    getThirtParty();
  }, []);

  // Handle successful creation
  const handleCreateSuccess = () => {
    getThirtParty(); // Refresh the data
    setSuccessMessage({
      title: "API Key Berhasil Ditambahkan!",
      message: "API Key baru telah berhasil ditambahkan ke sistem.",
    });
    setShowSuccessModal(true);
  };

  // Handle successful deletion
  const handleDeleteSuccess = () => {
    getThirtParty(); // Refresh the data
    setSelectedConnections([]); // Clear selection
    setSuccessMessage({
      title: "API Key Berhasil Dihapus!",
      message: "API Key telah berhasil dihapus dari sistem.",
    });
    setShowSuccessModal(true);
  };

  // Handle single item delete
  const handleSingleDelete = (connection) => {
    setItemToDelete(connection);
    setShowDeleteModal(true);
  };

  // Handle multiple items delete
  const handleMultipleDelete = () => {
    if (selectedConnections.length === 0) {
      alert("Pilih API Key terlebih dahulu");
      return;
    }
    setItemToDelete(selectedConnections);
    setShowDeleteModal(true);
  };

  // Handle connection configuration
  const handleConfigureConnection = (connection) => {
    if (connection?.name === "LITEMATCH") {
      onOpenLogin();
      return;
    }

    setSelectedConnection(connection);
    setShowConfigModal(true);
  };

  // Handle save configuration
  const handleSaveConfiguration = (configData) => {
    // Here you would typically call an API to update the connectio
    // For now, just show success message
    setSuccessMessage({
      title: "Koneksi Berhasil Dikonfigurasi!",
      message: `Koneksi ${configData.name} telah berhasil diaktifkan dan dikonfigurasi.`,
    });
    setShowSuccessModal(true);

    // Refresh data
    getThirtParty();
  };

  // Transform API data to match our component structure
  const transformedData =
    dataThirParty?.data?.map((item) => {
      const apiKey = item.apiKey || "kosong";
      const apiKeyPreview =
        apiKey === "kosong"
          ? "No API Key"
          : `API Key: ${apiKey.substring(0, 20)}...`;

      return {
        id: item.id.toString(),
        name: item.name,
        type: item.provider,
        status: item.apiKey ? "active" : "inactive",
        endpoint: apiKeyPreview,
        lastSync: item.updatedAt,
        syncStatus: item.isActive ? "success" : "failed",
        responseTime: "N/A",
        requests: 0,
        errors: 0,
        apiKey: apiKey,
        provider: item.provider,
        isActive: item.isActive,
      };
    }) || [];

  // Filter data based on search and status
  const filteredData = transformedData.filter((connection) => {
    const matchesSearch =
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.endpoint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = showOnlyActive ? connection.isActive : true;

    return matchesSearch && matchesStatus;
  });

  const toggleConnectionSelection = (connectionId) => {
    setSelectedConnections((prev) =>
      prev.includes(connectionId)
        ? prev.filter((id) => id !== connectionId)
        : [...prev, connectionId]
    );
  };

  const toggleAllConnectionsSelection = () => {
    if (selectedConnections.length === filteredData.length) {
      setSelectedConnections([]);
    } else {
      setSelectedConnections(filteredData.map((item) => item.id));
    }
  };

  const toggleRowExpansion = (connectionId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [connectionId]: !prev[connectionId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getSyncStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Loading state
  if (initLoadThirtParty) {
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
  if (errThirtParty) {
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

  const onPressShadow = () => {
    // addToast({
    //   title: "Toast title",
    //   description: "Toast displayed successfully",
    //   color: "success",
    //   timeout: 1500,
    // });

    onOpenLogin();
  };

  return (
    <>
      <div
        className={`w-full space-y-4 transition-all duration-300 lg:space-y-6 ${
          isExpanded ? "lg:pr-4" : "lg:pr-0"
        }`}
      >
        {/* Create API Key Modal */}
        <CreateApiKeyModal
          isOpen={isOpen}
          onClose={closeModal}
          onSuccess={handleCreateSuccess}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
          itemToDelete={itemToDelete}
          isMultiple={Array.isArray(itemToDelete)}
        />

        {/* Success Notification Modal */}
        <SuccessNotificationModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title={successMessage.title}
          message={successMessage.message}
          autoClose={true}
          autoCloseDelay={3000}
        />

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowOnlyActive(!showOnlyActive)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                showOnlyActive
                  ? "bg-green-500 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Hanya Aktif
            </button>
            <Button color="primary" variant="shadow" onPress={onPressShadow}>
              Shadow
            </Button>
          </div>

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
        </div>

        {/* Results Count */}

        {/* Table */}
        <div className="w-full rounded-xl border border-gray-200 bg-white transition-all duration-300 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div
            className="w-full overflow-x-auto"
            style={{ width: "calc(100vw - 400px)" }}
          >
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
                        selectedConnections.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      onChange={toggleAllConnectionsSelection}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    No Hp Customer
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Payment Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden min-w-[100px] px-2 py-3 text-start text-xs font-medium text-gray-500 md:table-cell dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="min-w-[80px] px-2 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {transactions?.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="h-24 text-center text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data transaction yang ditemukan
                    </td>
                  </tr>
                ) : (
                  transactions?.data?.map((connection) => (
                    <React.Fragment key={connection.id}>
                      <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <TableCell className="px-2 py-3">
                          <input
                            type="checkbox"
                            checked={selectedConnections.includes(
                              connection.id
                            )}
                            onChange={() =>
                              toggleConnectionSelection(connection.id)
                            }
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell className="px-2 py-3">
                          {connection?.customerPhone}
                        </TableCell>
                        <TableCell className="px-2 py-3">
                          {connection?.productName}
                        </TableCell>
                        <TableCell className="hidden px-2 py-3 md:table-cell">
                          {connection?.brand}
                        </TableCell>
                        <TableCell className="hidden px-2 py-3 md:table-cell">
                          {connection?.category}
                        </TableCell>
                        <TableCell className="hidden px-2 py-3 md:table-cell">
                          {formatRupiah(connection?.price || 0)}
                        </TableCell>
                        <TableCell className="hidden px-2 py-3 md:table-cell">
                          {connection?.status}
                        </TableCell>
                        <TableCell className="hidden px-2 py-3 md:table-cell">
                          {moment(connection?.createdAt).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell className="px-2 py-3">
                          <div className="flex space-x-1">
                            <button
                              onClick={() =>
                                alert(`Lihat detail ${connection.name}`)
                              }
                              className="rounded bg-blue-500 p-1 text-white transition-colors hover:bg-blue-600"
                              title="Lihat Detail"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => alert(`Edit ${connection.name}`)}
                              className="rounded bg-yellow-500 p-1 text-white transition-colors hover:bg-yellow-600"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleSingleDelete(connection)}
                              className="rounded bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                              title="Hapus"
                            >
                              <TrashIcon className="h-4 w-4" />
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

          <div className="my-5 flex items-center justify-between px-5">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Menampilkan {transactions?.data?.length} dari{" "}
              {transactions?.meta?.totalData} Transaction
            </div>
            <Pagination
              isCompact
              showControls
              initialPage={1}
              total={transactions?.meta?.totalPages || 0}
              onChange={(e) => setPage(e)}
            />
          </div>
        </div>

        {/* API Key Preview Modal */}
        <ApiKeyPreviewModal
          isOpen={showApiKeyModal}
          onClose={() => setShowApiKeyModal(false)}
          apiKey={selectedApiKey.apiKey}
          providerName={selectedApiKey.name}
        />

        {/* Connection Configuration Modal */}
        <ConnectionConfigModalHero
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          connection={selectedConnection}
          onSave={handleSaveConfiguration}
        />
      </div>

      <Modal
        isOpen={isOpenLogin}
        placement="center"
        onOpenChange={onOpenChangeLogin}
      >
        <ModalContentLoginLitmatch onCloseLogin={onCloseLogin} />
      </Modal>
    </>
  );
}

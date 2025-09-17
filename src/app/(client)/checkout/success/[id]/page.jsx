"use client";

import CustomLoading from "@/components/loading/CustomLoading";
import { usePayment } from "@/hooks/ReactQuery/usePayment";
import { Button } from "@heroui/react";
import {
  CheckCircle,
  Download,
  Mail,
  Home,
  BookOpen,
  Phone,
  Clock,
  Gamepad2,
  X,
  Loader2,
  AlertCircle,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const {
    data: dataPay,
    isLoading: initLoadPay,
    error: errPayy,
    refetch: getPayy,
    isFetching: loadPayy,
  } = usePayment.get(id);

  useEffect(() => {
    getPayy();
  }, []);
  // Mock API function to check purchase status
  const checkPurchaseStatus = async () => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response data
    const mockStatusData = {
      orderId: "#KG-2024-001",
      status: "Berhasil Dikirim",
      statusCode: "SUCCESS",
      timestamp: new Date().toLocaleString("id-ID"),
      details: {
        product: "50.000 Diamond",
        game: "Mobile Legends",
        playerId: "123456789",
        server: "Indonesia",
        amount: "Rp25.000",
      },
      message:
        "Game credit berhasil dikirim ke akun Anda. Silakan cek di dalam game.",
    };

    setStatusData(mockStatusData);
    setIsLoading(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setStatusData(null);
  };

  console.log("dataPay", dataPay);

  if (initLoadPay) {
    return <CustomLoading />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Pembelian Berhasil! 🎮
          </h1>
          <p className="text-gray-600">
            Selamat! Pembelian {dataPay?.category} Anda telah berhasil diproses.
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
          {/* Success Status */}
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">
                Status: Pembelian Berhasil
              </span>
            </div>
            <p className="mt-2 text-sm text-green-700">
              Pembelian Anda sedang diproses dan akan dikirim segera.
            </p>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Detail Pesanan:
            </h3>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Produk:</span>
                <span className="font-medium">{dataPay?.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah:</span>
                <span className="font-medium">{dataPay?.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600">
                  {" "}
                  Rp{dataPay?.sellPrice?.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm">{dataPay?.invoiceId}</span>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Langkah Selanjutnya:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center rounded-lg bg-purple-50 p-3">
                <Clock className="mr-3 h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-800">
                  Game credit/pulsa akan dikirim dalam 1-5 menit
                </span>
              </div>
              <div className="flex items-center rounded-lg bg-green-50 p-3">
                <Gamepad2 className="mr-3 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Siap bermain! Cek status pengiriman secara real-time
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={checkPurchaseStatus}
            color="primary"
            className="w-full"
            disabled={isLoading}
            startContent={
              isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )
            }
          >
            {isLoading ? "Memeriksa Status..." : "Cek Status Pengiriman"}
          </Button>

          <Button
            as={Link}
            href="/"
            variant="light"
            className="w-full"
            startContent={<Home className="h-4 w-4" />}
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Footer Contact Support */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4 text-center">
          <p className="mb-4 text-sm font-medium text-gray-700">
            Butuh Bantuan? Tim Customer Service Kami Siap Membantu 24/7
          </p>

          <div className="space-y-3">
            {/* Pengaduan Button */}
            <Button
              as={Link}
              href="https://wa.me/6285724663330?text=Halo%20admin%20Kece%20Game,%20saya%20ingin%20melaporkan%20kendala%20dengan%20pesanan%20saya.%20Order%20ID:%20%23KG-2024-001"
              target="_blank"
              rel="noopener noreferrer"
              color="danger"
              variant="bordered"
              className="w-full"
              startContent={<AlertTriangle className="h-4 w-4" />}
            >
              Laporkan Kendala / Pengaduan
            </Button>

            {/* Support Button */}
            <Button
              as={Link}
              href="https://wa.me/6285724663330?text=Halo%20admin%20Kece%20Game,%20saya%20butuh%20bantuan%20tentang%20layanan%20Anda."
              target="_blank"
              rel="noopener noreferrer"
              color="success"
              variant="bordered"
              className="w-full"
              startContent={<MessageCircle className="h-4 w-4" />}
            >
              Chat Customer Service
            </Button>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Klik tombol di atas untuk langsung terhubung ke WhatsApp kami
          </p>
        </div>

        {/* Welcome Message */}
        <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center text-white">
          <h4 className="mb-2 font-semibold">
            Selamat Datang di Kece Game! 🎮
          </h4>
          <p className="text-sm opacity-90">
            Anda sekarang bagian dari komunitas gamer Indonesia yang paling
            terpercaya
          </p>
        </div>
      </div>

      {/* Status Check Modal */}
      {showModal && statusData && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Status Pengiriman
              </h3>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Status Content */}
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <div
                  className={`flex items-center rounded-full px-4 py-2 ${
                    statusData.statusCode === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {statusData.statusCode === "SUCCESS" ? (
                    <CheckCircle className="mr-2 h-5 w-5" />
                  ) : (
                    <AlertCircle className="mr-2 h-5 w-5" />
                  )}
                  <span className="font-semibold">{statusData.status}</span>
                </div>
              </div>

              {/* Order Details */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 font-medium text-gray-900">
                  Detail Pesanan
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-medium">
                      {statusData.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produk:</span>
                    <span className="font-medium">
                      {statusData.details.product}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Game:</span>
                    <span className="font-medium">
                      {statusData.details.game}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Player ID:</span>
                    <span className="font-medium">
                      {statusData.details.playerId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server:</span>
                    <span className="font-medium">
                      {statusData.details.server}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu:</span>
                    <span className="font-medium">{statusData.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div
                className={`rounded-lg p-4 ${
                  statusData.statusCode === "SUCCESS"
                    ? "border border-green-200 bg-green-50"
                    : "border border-red-200 bg-red-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    statusData.statusCode === "SUCCESS"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {statusData.message}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex space-x-3">
              <Button
                onClick={closeModal}
                variant="bordered"
                className="flex-1"
              >
                Tutup
              </Button>
              {statusData.statusCode === "SUCCESS" && (
                <Button
                  as={Link}
                  href="/games"
                  color="primary"
                  className="flex-1"
                  startContent={<Gamepad2 className="h-4 w-4" />}
                >
                  Beli Lagi
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

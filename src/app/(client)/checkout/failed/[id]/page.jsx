"use client";

import { Button } from "@heroui/react";
import {
  XCircle,
  RefreshCw,
  MessageCircle,
  Home,
  CreditCard,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Pembelian Gagal 😔
          </h1>
          <p className="text-gray-600">
            Maaf, pembelian game credit/pulsa Anda tidak dapat diproses. Silakan
            coba lagi.
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
          {/* Status Card */}
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-800">
                Status: Pembelian Gagal
              </span>
            </div>
            <p className="mt-2 text-sm text-red-700">
              Pembelian game credit/pulsa Anda tidak berhasil diproses. Silakan
              coba lagi.
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
                <span className="font-medium">Game Credit/Pulsa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah:</span>
                <span className="font-medium">50.000 Diamond</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-red-600">Rp25.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm">#KG-2024-001</span>
              </div>
            </div>
          </div>

          {/* What to do next */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Yang Bisa Anda Lakukan:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center rounded-lg bg-blue-50 p-3">
                <RefreshCw className="mr-3 h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Coba lagi dengan metode pembayaran yang sama
                </span>
              </div>
              <div className="flex items-center rounded-lg bg-green-50 p-3">
                <CreditCard className="mr-3 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Gunakan kartu atau metode pembayaran lain
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            as={Link}
            href="/"
            variant="bordered"
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
              href="https://wa.me/6285724663330?text=Halo%20admin%20Kece%20Game,%20saya%20mengalami%20kendala%20pembayaran.%20Order%20ID:%20%23KG-2024-001%20-%20Pembelian%20gagal%20dan%20saya%20butuh%20bantuan."
              target="_blank"
              rel="noopener noreferrer"
              color="danger"
              variant="bordered"
              className="w-full"
              startContent={<AlertTriangle className="h-4 w-4" />}
            >
              Laporkan Kendala Pembayaran
            </Button>

            {/* Support Button */}
            <Button
              as={Link}
              href="https://wa.me/6285724663330?text=Halo%20admin%20Kece%20Game,%20saya%20butuh%20bantuan%20tentang%20pembayaran%20yang%20gagal."
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
        <div className="mt-6 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 p-4 text-center text-white">
          <h4 className="mb-2 font-semibold">Jangan Khawatir! 🎮</h4>
          <p className="text-sm opacity-90">
            Tim support Kece Game siap membantu mengatasi kendala pembayaran
            Anda
          </p>
        </div>
      </div>
    </div>
  );
}

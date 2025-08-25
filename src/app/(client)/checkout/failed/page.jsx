"use client";

import { Button } from "@heroui/react";
import {
  XCircle,
  RefreshCw,
  MessageCircle,
  Home,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutFailedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Pembayaran Gagal
          </h1>
          <p className="text-gray-600">
            Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
          {/* Status Card */}
          <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 mr-2 text-red-600" />
              <span className="font-semibold text-red-800">
                Status: Pembayaran Ditolak
              </span>
            </div>
            <p className="mt-2 text-sm text-red-700">
              Transaksi Anda tidak berhasil diproses oleh sistem pembayaran.
            </p>
          </div>

          {/* Possible Reasons */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Kemungkinan Penyebab:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
                Saldo kartu kredit/debit tidak mencukupi
              </li>
              <li className="flex items-start">
                <span className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
                Kartu telah kedaluwarsa atau data tidak valid
              </li>
              <li className="flex items-start">
                <span className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
                Masalah koneksi internet yang tidak stabil
              </li>
              <li className="flex items-start">
                <span className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></span>
                Pembatasan transaksi dari bank atau provider
              </li>
            </ul>
          </div>

          {/* What to do next */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Yang Bisa Anda Lakukan:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 rounded-lg bg-blue-50">
                <RefreshCw className="w-4 h-4 mr-3 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Coba lagi dengan metode pembayaran yang sama
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-green-50">
                <CreditCard className="w-4 h-4 mr-3 text-green-600" />
                <span className="text-sm text-green-800">
                  Gunakan kartu atau metode pembayaran lain
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-purple-50">
                <MessageCircle className="w-4 h-4 mr-3 text-purple-600" />
                <span className="text-sm text-purple-800">
                  Hubungi tim support kami untuk bantuan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            as={Link}
            href="/checkout"
            color="primary"
            className="w-full"
            startContent={<RefreshCw className="w-4 h-4" />}
          >
            Coba Lagi
          </Button>

          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full"
            startContent={<Home className="w-4 h-4" />}
          >
            Kembali ke Beranda
          </Button>

          <Button
            as={Link}
            href="/contact"
            variant="light"
            className="w-full"
            startContent={<MessageCircle className="w-4 h-4" />}
          >
            Hubungi Support
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="mb-2 text-xs text-gray-500">
            Butuh bantuan? Tim kami siap membantu Anda
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>📧 support@itmerdeka.com</span>
            <span>📱 +62 812-3456-7890</span>
          </div>
        </div>
      </div>
    </div>
  );
}

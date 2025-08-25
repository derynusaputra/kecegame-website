"use client";

import { Button } from "@heroui/react";
import { CheckCircle, Download, Mail, Home, BookOpen } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Pembayaran Berhasil! 🎉
          </h1>
          <p className="text-gray-600">
            Selamat! Anda telah berhasil mendaftar ke program React Native kami.
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
          {/* Success Status */}
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">
                Status: Pembayaran Berhasil
              </span>
            </div>
            <p className="mt-2 text-sm text-green-700">
              Transaksi Anda telah berhasil diproses dan dikonfirmasi.
            </p>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Detail Pesanan:
            </h3>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Program:</span>
                <span className="font-medium">React Native Bootcamp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paket:</span>
                <span className="font-medium">Private Garansi 100% Bisa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600">Rp195.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm">#RNB-2024-001</span>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-900">
              Langkah Selanjutnya:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center rounded-lg bg-blue-50 p-3">
                <Mail className="mr-3 h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Email konfirmasi akan dikirim dalam 5 menit
                </span>
              </div>
              <div className="flex items-center rounded-lg bg-purple-50 p-3">
                <BookOpen className="mr-3 h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-800">
                  Akses materi pembelajaran akan aktif dalam 1 jam
                </span>
              </div>
              <div className="flex items-center rounded-lg bg-green-50 p-3">
                <Download className="mr-3 h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Download source code dan UI Figma tersedia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            as={Link}
            href="/dashboard"
            color="primary"
            className="w-full"
            startContent={<BookOpen className="h-4 w-4" />}
          >
            Mulai Belajar
          </Button>

          <Button
            as={Link}
            href="/downloads"
            variant="bordered"
            className="w-full"
            startContent={<Download className="h-4 w-4" />}
          >
            Download Materi
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

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="mb-2 text-xs text-gray-500">
            Ada pertanyaan? Tim mentor kami siap membantu
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>📧 mentor@itmerdeka.com</span>
            <span>📱 +62 812-3456-7890</span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center text-white">
          <h4 className="mb-2 font-semibold">
            Selamat Datang di IT Merdeka! 🚀
          </h4>
          <p className="text-sm opacity-90">
            Anda sekarang bagian dari komunitas developer React Native Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}

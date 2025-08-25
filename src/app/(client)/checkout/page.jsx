"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import { CreditCard, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    email: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Random success/failure for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate

      if (isSuccess) {
        router.push("/checkout/success");
      } else {
        router.push("/checkout/failed");
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Checkout Pembayaran
          </h1>
          <p className="text-gray-600">
            Lengkapi informasi pembayaran untuk menyelesaikan pendaftaran
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">
                    Informasi Pembayaran
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nomor Kartu"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "cardNumber",
                        formatCardNumber(e.target.value)
                      )
                    }
                    maxLength={19}
                    required
                    startContent={
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    }
                  />

                  <Input
                    label="Nama Pemilik Kartu"
                    placeholder="Nama Lengkap"
                    value={formData.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Masa Berlaku"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) =>
                        handleInputChange(
                          "expiry",
                          formatExpiry(e.target.value)
                        )
                      }
                      maxLength={5}
                      required
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) =>
                        handleInputChange(
                          "cvv",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      maxLength={4}
                      required
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={isProcessing}
                    disabled={isProcessing}
                    startContent={!isProcessing && <Lock className="h-4 w-4" />}
                  >
                    {isProcessing
                      ? "Memproses Pembayaran..."
                      : "Bayar Sekarang"}
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Security Info */}
            <Card className="border-blue-200 bg-blue-50">
              <CardBody className="py-4">
                <div className="flex items-center text-blue-800">
                  <Lock className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">
                    Pembayaran Aman dengan SSL Encryption
                  </span>
                </div>
                <p className="mt-1 text-xs text-blue-600">
                  Data kartu Anda dienkripsi dan aman. Kami tidak menyimpan
                  informasi kartu Anda.
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        React Native Bootcamp
                      </h4>
                      <p className="text-sm text-gray-600">
                        Private Garansi 100% Bisa
                      </p>
                    </div>
                    <span className="font-bold text-green-600">Rp195.000</span>
                  </div>

                  <Divider />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Harga Asli:</span>
                      <span className="text-gray-500 line-through">
                        Rp1.500.000
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Diskon:</span>
                      <span className="font-semibold text-green-600">
                        -Rp1.305.000
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">PPN:</span>
                      <span className="text-gray-600">Rp0</span>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total Pembayaran
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      Rp195.000
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* What's Included */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-green-800">
                  Yang Anda Dapatkan:
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Akses semua video & materi batch (selamanya)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Project: Aplikasi Tiket Pesawat
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Diskusi Live tiap minggu TANPA BATAS
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Support 1-on-1 sampai project selesai
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      GARANSI SAMPAI BISA atau 100% UANG KEMBALI
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

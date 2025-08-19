"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useThirParty } from "@/hooks/ReactQuery/useThirParty";

export default function CreateApiKeyModal({ isOpen, onClose, onSuccess }) {
  const [createForm, setCreateForm] = useState({
    provider: "OTHER",
    name: "",
    key: "",
  });

  const createUser = useThirParty.create();

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle create form submission
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!createForm.name || !createForm.key) {
      alert("Nama dan API Key harus diisi!");
      return;
    }

    try {
      console.log(createForm);
      await createUser.mutateAsync(createForm);
      setCreateForm({ provider: "OTHER", name: "", key: "" });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error creating API key:", error);
      alert("Gagal menambahkan API Key. Silakan coba lagi.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <form onSubmit={handleCreateSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          Tambah API Key Baru
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Provider</Label>
            <select
              value={createForm.provider}
              onChange={(e) => handleFormChange("provider", e.target.value)}
              className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              required
            >
              <option value="OTHER">OTHER</option>
              <option value="MIDTRANS">MIDTRANS</option>
              <option value="XENDIT">XENDIT</option>
              <option value="DOKU">DOKU</option>
              <option value="IPAYMU">IPAYMU</option>
            </select>
          </div>

          <div className="col-span-1">
            <Label>Nama Provider</Label>
            <Input
              type="text"
              placeholder="Contoh: IPAYMU, XENALIVE"
              value={createForm.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>API Key</Label>
            <Input
              type="text"
              placeholder="Masukkan API Key"
              value={createForm.key}
              onChange={(e) => handleFormChange("key", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={createUser.isPending}
            className="flex items-center space-x-2"
          >
            {createUser.isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan</span>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

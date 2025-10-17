"use client";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { postProductOther } from "@/services/api/product";
import { Input } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModalCreate({
  isOpen,
  onClose,
  isDisabled,
  category,
  brand,
}) {
  const { mutate, isPending, isSuccess } = postProductOther();
  const [form, setForm] = useState({
    product_name: "",
    price: "",
  });
  const qc = useQueryClient();

  const formatRupiah = (value) => {
    if (!value) return "";

    const numberString = value.replace(/[^,\d]/g, "");
    const parts = numberString.split(",");
    let integer = parts[0];
    const remainder = integer.length % 3;
    let rupiah = integer.substr(0, remainder);
    const thousands = integer.substr(remainder).match(/\d{3}/g);

    if (thousands) {
      const separator = remainder ? "." : "";
      rupiah += separator + thousands.join(".");
    }

    rupiah = parts[1] !== undefined ? `${rupiah},${parts[1]}` : rupiah;
    return `Rp ${rupiah}`;
  };

  const parseRupiahToNumber = (value) => {
    if (!value) return 0;
    const numberString = value.replace(/[^0-9,-]/g, "");
    return parseInt(numberString, 10);
  };
  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatRupiah(rawValue);
    setForm((prev) => ({ ...prev, price: formatted }));
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[300px] p-5 lg:p-10"
    >
      <div className="font-semibold text-gray-800 dark:text-white/90">
        Create Brand
      </div>

      <div className="mt-10">
        <div>
          <Label>Product Name</Label>
          <Input
            value={form.product_name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, product_name: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Price</Label>
          <Input value={form.price} onChange={handleChange} />
        </div>

        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (form.name === "" || form.category === "") {
                return toast.error("Field not empty");
              }

              const body = {
                ...form,
                category: category,
                brand: brand,
                price: parseRupiahToNumber(form.price),
              };

              mutate(body, {
                onSuccess: (ress) => {
                  toast.success("Create Product Succesfully");
                  qc.invalidateQueries({ queryKey: ["getAllProductOther"] });
                  onClose();
                  setForm({
                    price: "",
                    product_name: "",
                  });
                },
              });
            }}
            disabled={isDisabled}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            Add {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

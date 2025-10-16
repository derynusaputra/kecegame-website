"use client";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { postBrand, putBrand } from "@/services/api/brand";
import { getListCategory } from "@/services/api/category";
import { Input, Select, SelectItem } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { be } from "zod/v4/locales";

export default function ModalCreate({
  isOpen,
  onClose,
  onOK,
  isDisabled,
  selected,
}) {
  const { mutate, isPending } = postBrand();
  const [form, setForm] = useState({
    name: "",
    category: "",
  });

  const { data, isLoading } = getListCategory();
  const options =
    data &&
    data?.map((val) => ({
      key: val?.name,
      label: val?.name,
    }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <div className="font-semibold text-gray-800 dark:text-white/90">
        Create Brand
      </div>

      <div className="mt-10">
        <div>
          <Label>Name</Label>
          <Input
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            isLoading={isLoading}
            className="w-full"
            label="Select an category"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {options?.map((val) => (
              <SelectItem key={val.key}>{val.label}</SelectItem>
            ))}
          </Select>
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
                type: "OTHER",
              };

              mutate(body, {
                onSuccess: (ress) => {
                  if (ress) {
                    qc.invalidateQueries({ queryKey: ["getListBrand"] });
                    onClose();
                    toast.success("Create Brand Succesfully");
                  }
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

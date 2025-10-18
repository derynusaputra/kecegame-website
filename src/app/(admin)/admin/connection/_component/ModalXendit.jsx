"use client";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { updateKey } from "@/services/api/xendit";
import { Input } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ModalUpdateXendit({ isOpen, onClose }) {
  const { mutate, isPending } = updateKey();

  const [form, setForm] = useState({
    key: "",
  });

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: (res) => {
        toast.success("Update Key Succesfully");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      className="max-w-[400px] p-5 lg:p-10"
    >
      <div className="font-semibold text-gray-800 dark:text-white/90">
        Update API KEY
      </div>

      <div className="mt-10">
        <div>
          <Label>API KEY</Label>
          <Input
            value={form.key}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, key: e.target.value }))
            }
          />
        </div>

        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            size="sm"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isPending}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            Update
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

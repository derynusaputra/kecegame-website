"use client";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { putBrand } from "@/services/api/brand";
import { configEnv } from "@/services/config";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ModalUpdate({
  isOpen,
  onClose,
  onOK,
  isDisabled,
  selected,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const imagePreview = preview || selected.urlLogo;

  const qc = useQueryClient();
  const { mutate, isPending } = putBrand(selected?.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setPreview(null);
        setFile(null);
      }}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <div className="font-semibold text-gray-800 dark:text-white/90">
        Update Image
      </div>

      <div className="mt-10 flex h-60 w-full items-center justify-center border border-dashed">
        {imagePreview ? (
          <img
            src={preview || `${configEnv.baseUrl}${selected?.urlLogo}`}
            className="h-full w-full object-contain"
          />
        ) : (
          <ImagePlus
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
            className="h-12 w-12 cursor-pointer"
          />
        )}

        <input
          onChange={handleFileChange}
          className="hidden"
          ref={inputRef}
          type="file"
          accept="image/*"
        />
      </div>

      <div className="text-center">
        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Batal
          </Button>
          {(preview || selected?.urlLogo) && (
            <Button
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              Change
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => {
              const fd = new FormData();
              fd.append("urlLogo", file);
              mutate(fd, {
                onSuccess: (ress) => {
                  if (ress) {
                    qc.invalidateQueries({ queryKey: ["getListBrand"] });
                    onClose();
                    setFile(null);
                    setPreview(null);
                    toast.success("Update Image Succesfully");
                  }
                },
              });
            }}
            disabled={isDisabled}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            Update {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

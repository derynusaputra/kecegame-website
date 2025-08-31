"use client";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ToastProvider,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import React, { Children, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";
import ButtonPurhcase from "./ButtonPurhcase";
import { apiBase } from "@/services/apiBase";
import { useCheckID } from "@/hooks/ReactQuery/useCheckID";
import { useCheckout } from "@/hooks/ReactQuery/useCheckout";
import { useRouter } from "next/navigation";

export default function MainContentDetailLitmatch({ children }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userData, setUserData] = useState(null);

  const postCheckID = useCheckID.create();

  const postCheckout = useCheckout.create();

  // modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      userId: "",
      phoneNumber: "",
      package: "",
    },
    mode: "all",
  });

  const values = watch();

  const onCheckUserID = async () => {
    const userId = values.userId;
    await postCheckID.mutateAsync(userId);

    setUserData(userId);
  };

  const onSubmit = (dataku) => {
    onOpen();
  };
  const [dataSubmit, setDataSubmit] = useState(null);

  const onSubmits = async (dataku) => {
    try {
      onClose();

      const payload = {
        ...dataku,
        // pastikan selectedPackage ada:
        package:
          (selectedPackage?.bonus ?? 0) + (selectedPackage?.diamonds ?? 0),
        price: selectedPackage?.sale_price ?? 0,
      };

      // gunakan return dari mutateAsync, bukan isSuccess/isError
      const res = await postCheckout.mutateAsync(payload);

      // simpan URL invoice dari response
      const invoiceUrl = res?.data?.data?.invoice_url;
      setDataSubmit(invoiceUrl ?? null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider placement={"top-center"} toastOffset={60} />
      </div>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Whatsapp Admin
              </ModalHeader>
              <ModalBody>
                <p>
                  Kami akan mengirimkan link pembayaran ke whatsapp anda. jika
                  ada kendala silahkan hubungi admin kami{" "}
                  <span
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=%2B6285724663330&text=Halo"
                      )
                    }
                    className="font-bold cursor-pointer"
                  >
                    085724663330
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button color="primary" onPress={handleSubmit(onSubmits)}>
                  Lanjutkan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {postCheckout?.data?.data?.invoice_url ? (
        <WebView url={postCheckout?.data?.data?.invoice_url} />
      ) : (
        <>
          <div className="flex-1 w-full overflow-y-auto bg-yellow-500">
            <div className="flex flex-col gap-2 px-0 py-2">
              {/* content */}
              <div className="flex flex-col">
                {/* head */}
                <div className="flex flex-col p-4 mt-3 bg-white">
                  <Head no={1} title="Pembayaran" />
                  <Controller
                    name="userId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="User ID"
                        placeholder="Masukan User ID"
                        classNames={{
                          input: "placeholder:text-gray-300",
                        }}
                        variant="bordered"
                        autoComplete="tel"
                        isInvalid={!!errors.userId}
                        errorMessage={errors.userId?.message}
                        onChange={(e) => {
                          let value = e.target.value;
                          field.onChange(value);
                        }}
                        type="text"
                      />
                    )}
                    rules={{
                      required: "User ID is required",
                      pattern: {
                        //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Masukan User ID",
                      },
                    }}
                  />

                  {userData === values.userId ? (
                    postCheckID?.data?.data?.data?.nickname ? (
                      <div className="text-sm text-green-500">
                        User ID : {postCheckID?.data?.data?.data?.nickname}
                      </div>
                    ) : (
                      <div className="text-sm text-red-500">
                        User ID tidak ditemukan
                      </div>
                    )
                  ) : !values.userId ? null : (
                    <div className="h-4" />
                  )}
                  <Button
                    className={`w-full bg-blue-600 text-white`}
                    onPress={onCheckUserID}
                    isLoading={postCheckID.isPending}
                    isDisabled={!values.userId}
                  >
                    Check User ID
                  </Button>
                </div>
                <div className="flex flex-col p-4 mt-3 bg-white">
                  <Head no={2} title="Pembayaran" />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Whatsapp"
                        placeholder="1234567890"
                        classNames={{
                          input: "placeholder:text-gray-300",
                        }}
                        variant="bordered"
                        autoComplete="tel"
                        isInvalid={!!errors.phoneNumber}
                        errorMessage={errors.phoneNumber?.message}
                        type="tel"
                        // classNames={{
                        //   input: "text-sm pl-12",
                        //   inputWrapper: "h-12 relative",
                        // }}
                        startContent={
                          <div className="flex items-center pointer-events-none">
                            <span className="text-sm text-default-400">
                              +62
                            </span>
                          </div>
                        }
                        onChange={(e) => {
                          let value = e.target.value;

                          // Remove any non-digit characters
                          value = value.replace(/\D/g, "");

                          // Handle different input formats
                          if (value.startsWith("0")) {
                            // If starts with 0, remove it and keep the rest
                            value = value.substring(1);
                          } else if (value.startsWith("62")) {
                            // If starts with 62, remove it and keep the rest
                            value = value.substring(2);
                          }

                          // Limit to 9 digits (Indonesian mobile number without country code)
                          // value = value.substring(0, 16);

                          field.onChange(value);
                        }}
                      />
                    )}
                    rules={{
                      required: "Whatsapp is required",
                      pattern: {
                        // value: /^\d{8,9}$/,
                        message: "Enter a valid whatsapp number (8-9 digits)",
                      },
                      maxLength: {
                        value: 16,
                        message: "Whatsapp number must be 16 digits",
                      },
                    }}
                  />
                </div>

                <div className="flex flex-col p-4 mt-3 bg-white">
                  <Head no={3} title="Pilih Paket" />
                  <PackageCom setSelectedPackage={setSelectedPackage} />
                </div>
              </div>
            </div>
            <div className="h-[60px]" />
            {/*  bottom nav */}
            <ButtonPurhcase
              totalPrice={selectedPackage?.sale_price}
              onPress={onSubmit}
              isSubmitting={isSubmitting}
              isValid={isValid && postCheckID?.data?.data?.data?.nickname}
            />
          </div>
        </>
      )}
    </>
  );
}

const WebView = ({ url }) => {
  return (
    <div className="flex-1 w-full overflow-y-auto bg-yellow-500">
      <iframe
        src={url}
        title="Xendit Checkout"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          background: "#fff",
        }}
      />
    </div>
  );
};

const Head = ({ no, title }) => {
  return (
    <div className="flex items-center justify-between w-full mb-2">
      {/* Left: Number and Title */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7B61FF]">
          <span className="text-[15px] font-semibold text-white">{no}</span>
        </div>
        <span className="text-[15px] font-semibold text-[#7B61FF]">
          {title}
        </span>
      </div>
      {/* Right: Description */}
      <span className="text-[13px] font-medium text-[#BDBDBD]"></span>
    </div>
  );
};

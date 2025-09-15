"use client";
import { Button, Image, Input } from "@heroui/react";
import React, { Children, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";
import ButtonPurhcase from "./ButtonPurhcase";
import { useProduct } from "@/hooks/ReactQuery/useProduct";
import CustomLoading from "@/components/loading/CustomLoading";
import ContainerPackage from "./ContainerPackage";
import { API_URL } from "@/services/apiBase";
import { HeadDetail } from "./HeaderDetail";
import axios from "axios";

export default function MainContentDetailGame({ children, title, item }) {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const postProduct = useProduct.create();

  const getProduct = async () => {
    await postProduct.mutateAsync(title);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      userID: "",
      phoneNumber: "",
      package: "",
    },
    mode: "all",
  });

  const [dataSubmit, setDataSubmit] = useState(null);

  // const values = watch();
  const postSubmit = async (dataku) => {
    try {
      const { data } = await axios.post(`${API_URL}/v1/game-payment`, {
        ...dataku,
      });
      setDataSubmit(data?.data?.invoice_url);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    postSubmit(data);
  };
  if (postProduct?.isPending) {
    return <CustomLoading />;
  }

  return (
    <>
      {dataSubmit ? (
        <WebView url={dataSubmit} />
      ) : (
        <div className="w-full flex-1 overflow-y-auto bg-gray-200">
          <div className="flex flex-col gap-2 px-0 py-2">
            {/* content */}
            <div className="flex flex-col">
              <div className="flex flex-col bg-white p-4">
                <HeadDetail no={1} title={title} item={item} />
              </div>
              {/* head */}
              <div className="mt-3 flex flex-col bg-white p-4">
                <Head no={1} title="Pembayaran" />
                <Controller
                  name="userID"
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
                      isInvalid={!!errors.userID}
                      errorMessage={errors.userID?.message}
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
              </div>
              <div className="mt-3 flex flex-col bg-white p-4">
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
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-sm">+62</span>
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

              <div className="mt-3 flex flex-col bg-white p-4">
                <Head no={3} title="Pilih Paket" />

                <Controller
                  name="package"
                  control={control}
                  render={({ field }) => (
                    <ContainerPackage
                      setSelectedPackage={setSelectedPackage}
                      setValue={field}
                      initialPackages={postProduct?.data?.data}
                    />
                  )}
                  rules={{
                    required: "Package is required",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="h-[60px]" />
          {/*  bottom nav */}
          <ButtonPurhcase
            totalPrice={selectedPackage?.sellPrice}
            onPress={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </div>
      )}
    </>
  );
}

const WebView = ({ url }) => {
  return (
    <div className="w-full flex-1 overflow-y-auto bg-yellow-500">
      <iframe
        src={url}
        title="Xendit Checkout"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          background: "#fff",
        }}
        allow="payment"
      />
    </div>
  );
};
const Head = ({ no, title }) => {
  return (
    <div className="mb-2 flex w-full items-center justify-between">
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

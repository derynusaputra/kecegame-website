"use client";
import { addToast, Button, Input } from "@heroui/react";
import React, { Children, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";
import ButtonPurhcase from "./ButtonPurhcase";
import { apiBase } from "@/services/apiBase";
import { useCheckID } from "@/hooks/ReactQuery/useCheckID";
import { useCheckout } from "@/hooks/ReactQuery/useCheckout";

export default function MainContentDetailLitmatch({ children }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userData, setUserData] = useState(null);

  const postCheckID = useCheckID.create();

  const postCheckout = useCheckout.create();

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

  const values = watch();

  const onCheckUserID = async () => {
    const userID = values.userID;
    await postCheckID.mutateAsync(userID);

    setUserData(userID);
  };

  console.log("test", postCheckID.data);

  const onSubmit = async (dataku) => {
    console.log("Form submitted:", {
      ...dataku,
      package: selectedPackage?.bonus + selectedPackage?.diamonds,
      price: selectedPackage?.sale_price,
    });

    const dataSubmit = {
      ...dataku,
      package: selectedPackage?.bonus + selectedPackage?.diamonds,
      price: selectedPackage?.sale_price,
    };

    await postCheckout.mutateAsync(dataSubmit);

    if (postCheckout.isSuccess) {
      console.log("postCheckout.isSuccess", postCheckout.data);
      addToast({
        title: "Success title",
        description: "Success displayed successfully",
        color: color.toLowerCase(),
      });
    }

    if (postCheckout.isError) {
      addToast({
        title: "Error title",
        description: "Error displayed successfully",
        color: color.toLowerCase(),
      });
    }
  };
  return (
    <div className="w-full flex-1 overflow-y-auto bg-yellow-500">
      <div className="flex flex-col gap-2 px-0 py-2">
        {/* content */}
        <div className="flex flex-col">
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

            {userData === values.userID ? (
              postCheckID?.data?.data?.data?.nickname ? (
                <div className="text-sm text-green-500">
                  User ID : {postCheckID?.data?.data?.data?.nickname}
                </div>
              ) : (
                <div className="text-sm text-red-500">
                  User ID tidak ditemukan
                </div>
              )
            ) : !values.userID ? null : (
              <div className="h-4" />
            )}
            <Button
              className={`w-full bg-blue-600 text-white`}
              onPress={onCheckUserID}
              isLoading={postCheckID.isPending}
              isDisabled={!values.userID}
            >
              Check User ID
            </Button>
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
                  // classNames={{
                  //   input: "text-sm pl-12",
                  //   inputWrapper: "h-12 relative",
                  // }}
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

          <div className="mt-3 flex flex-col bg-white p-4">
            <Head no={3} title="Pilih Paket" />
            <PackageCom setSelectedPackage={setSelectedPackage} />
          </div>
        </div>
      </div>
      <div className="h-[60px]" />
      {/*  bottom nav */}
      <ButtonPurhcase
        totalPrice={selectedPackage?.sale_price}
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        isValid={isValid && postCheckID?.data?.data?.data?.nickname}
      />
    </div>
  );
}

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

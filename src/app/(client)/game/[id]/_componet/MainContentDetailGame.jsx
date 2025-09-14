"use client";
import { Button, Input } from "@heroui/react";
import React, { Children, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";
import ButtonPurhcase from "./ButtonPurhcase";
import { useProduct } from "@/hooks/ReactQuery/useProduct";
import CustomLoading from "@/components/loading/CustomLoading";
import ContainerPackage from "./ContainerPackage";

export default function MainContentDetailGame({ children, title }) {
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

  const values = watch();

  console.log(postProduct?.data?.data);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
  };
  if (postProduct?.isPending) {
    return <CustomLoading />;
  }
  return (
    <div className="w-full flex-1 overflow-y-auto bg-gray-200">
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
          </div>
          <div className="mt-3 flex flex-col bg-white p-4">
            <Head no={2} title="Pembayaran" />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="example@gmail.com"
                  classNames={{
                    input: "placeholder:text-gray-300",
                  }}
                  variant="bordered"
                  autoComplete="tel"
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                  onChange={(e) => {
                    let value = e.target.value;

                    field.onChange(value);
                  }}
                  type="email"
                />
              )}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
            />
          </div>

          <div className="mt-3 flex flex-col bg-white p-4">
            <Head no={3} title="Pilih Paket" />
            <ContainerPackage
              setSelectedPackage={setSelectedPackage}
              initialPackages={postProduct?.data?.data}
            />
          </div>
        </div>
      </div>
      <div className="h-[60px]" />
      {/*  bottom nav */}
      <ButtonPurhcase
        totalPrice={selectedPackage?.sale_price}
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        isValid={isValid}
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

"use client";
import { Button, Input } from "@heroui/react";
import React, { Children, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";
import ButtonPurhcase from "./ButtonPurhcase";
import { apiBase } from "@/services/apiBase";

export default function MainContentDetailLitmatch({ children }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userData, setUserData] = useState(null);
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
    console.log("check user id");
    const userID = values.userID;
    const { data } = await apiBase().post("/v1/game/check-profile-litmatch", {
      target_uid: userID,
    });
    setUserData(data?.data);
  };

  console.log("test", userData?.data?.nickname);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
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

            {values.userID ? (
              userData?.data?.nickname ? (
                <div className="text-sm text-green-500">
                  User ID : {userData?.data?.nickname}
                </div>
              ) : (
                <p className="text-sm text-gray-500">User ID tidak ditemukan</p>
              )
            ) : null}
            <Button
              className="w-full bg-blue-500 text-white"
              onPress={onCheckUserID}
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
        isValid={isValid && userData?.data?.nickname}
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

"use client";
import { Button, Input } from "@heroui/react";
import React, { Children } from "react";
import { Controller, useForm } from "react-hook-form";
import PackageCom from "./PackageCom";

export default function MainContentDetailGame({ children }) {
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
  });

  const values = watch();
  console.log(isValid);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
  };
  return (
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
        <PackageCom />
      </div>

      <Button
        color="primary"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
        isDisabled={!isValid}
        className="flex-1 sm:flex-none"
      >
        {isSubmitting ? "Verifying..." : "Verify & Login"}
      </Button>
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

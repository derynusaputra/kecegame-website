"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Link,
} from "@heroui/react";

// Validation schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export default function ModalContentLoginLitmatch({ onCloseLogin }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically make an API call to authenticate
      // const response = await loginAPI(data);

      console.log("Login successful:", data);

      // Close modal on success
      onCloseLogin();

      // You can add success notification here
      // toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      // You can add error notification here
      // toast.error("Login failed. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Implement forgot password functionality
  };

  return (
    <ModalContent>
      {(onClose) => (
        <div>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Log in to Litmatch
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </ModalHeader>

          <ModalBody className="space-y-4">
            {/* Email Input */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  type="email"
                  autoComplete="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-12",
                  }}
                />
              )}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              }}
            />

            {/* Password Input */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  autoComplete="current-password"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-12",
                  }}
                />
              )}
              rules={{
                required: "Password is required",
                pattern: {
                  message: "Enter a valid password",
                },
              }}
            />
          </ModalBody>

          <ModalFooter className="gap-2">
            <Button
              color="danger"
              variant="flat"
              onPress={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </ModalFooter>
        </div>
      )}
    </ModalContent>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputOtp,
} from "@heroui/react";

export default function ModalContentLoginLitmatch({ onCloseLogin }) {
  const [step, setStep] = useState(1); // 1: Phone, 2: Code
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      code: "",
    },
  });

  const phoneNumber = watch("phoneNumber");
  const code = watch("code");

  // Countdown timer for resend code
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) return;

    setIsSendingCode(true);
    try {
      // Simulate API call to send code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCodeSent(true);
      setStep(2);
      setCountdown(30); // 30 seconds countdown
      console.log("Code sent to:", phoneNumber);
    } catch (error) {
      console.error("Failed to send code:", error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsSendingCode(true);
    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCountdown(30); // Reset countdown
      console.log("Code resent to:", phoneNumber);
    } catch (error) {
      console.error("Failed to resend code:", error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleBackToPhone = () => {
    // Clear all states when going back to step 1
    setStep(1);
    setCodeSent(false);
    setCountdown(0);
    setIsSendingCode(false);

    // Reset form values
    setValue("code", "");

    console.log("Back to phone number step - states cleared");
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login successful!");
      onCloseLogin();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <div>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {step === 1 ? "Enter Phone Number" : "Enter Verification Code"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step === 1
                ? "We'll send you a verification code"
                : `Code sent to +62${phoneNumber}`}
            </p>
          </ModalHeader>

          <ModalBody className="space-y-4">
            {step === 1 ? (
              // Step 1: Phone Number Input
              <div className="space-y-4">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Phone Number"
                      placeholder="08123456789"
                      variant="bordered"
                      type="tel"
                      autoComplete="tel"
                      isInvalid={!!errors.phoneNumber}
                      errorMessage={errors.phoneNumber?.message}
                      classNames={{
                        input: "text-sm pl-12",
                        inputWrapper: "h-12 relative",
                      }}
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
                        value = value.substring(0, 12);

                        field.onChange(value);
                      }}
                    />
                  )}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{8,9}$/,
                      message:
                        "Enter a valid Indonesian phone number (8-9 digits)",
                    },
                  }}
                />

                <Button
                  color="primary"
                  onPress={handleSendCode}
                  isLoading={isSendingCode}
                  isDisabled={!phoneNumber.trim()}
                  className="w-full"
                >
                  {isSendingCode ? "Sending Code..." : "Send Code"}
                </Button>
              </div>
            ) : (
              // Step 2: Code Input
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                      // <Input
                      //   {...field}
                      //   label="Verification Code"
                      //   placeholder="Enter 6-digit code"
                      //   variant="bordered"
                      //   type="text"
                      //   maxLength={6}
                      //   isInvalid={!!errors.code}
                      //   errorMessage={errors.code?.message}
                      //   classNames={{
                      //     input: "text-sm text-center text-lg font-mono",
                      //     inputWrapper: "h-12",
                      //   }}
                      // />
                      <InputOtp
                        {...field}
                        isRequired
                        aria-label="OTP input field"
                        length={6}
                        name="otp"
                        placeholder="Enter code"
                        classNames={{
                          input: "text-sm text-center text-lg font-mono",
                          inputWrapper: "h-12",
                        }}
                      />
                    )}
                    rules={{
                      required: "Verification code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Enter a 6-digit code",
                      },
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    color="default"
                    variant="light"
                    onPress={handleBackToPhone}
                    className="text-sm"
                  >
                    ← Back to Phone
                  </Button>

                  <Button
                    color="primary"
                    variant="light"
                    onPress={handleResendCode}
                    isLoading={isSendingCode}
                    isDisabled={countdown > 0}
                    className="text-sm"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                  </Button>
                </div>
              </div>
            )}
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
            {step === 2 && (
              <Button
                color="primary"
                onPress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={!code.trim() || code.length !== 6}
                className="flex-1 sm:flex-none"
              >
                {isSubmitting ? "Verifying..." : "Verify & Login"}
              </Button>
            )}
          </ModalFooter>
        </div>
      )}
    </ModalContent>
  );
}

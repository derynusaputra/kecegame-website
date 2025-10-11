"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { apiBase } from "@/services/apiBase";

export default function ConnectionConfigModal({
  isOpen,
  onClose,
  connection,
  onSave,
}) {
  const [step, setStep] = useState(1); // 1: Email/Password, 2: OTP, 3: Success
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGetOTP = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Please fill in email and password first");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP

      const response = await apiBase().post(`/v1/game/send-otp-litmatch`, {
        zone: "62",
        phone: "82111589680",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(3);

      // Call onSave with connection data
      onSave({
        ...connection,
        email: formData.email,
        status: "active",
        verified: true,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ email: "", password: "", otp: "" });
    setOtpSent(false);
    setCountdown(0);
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {connection?.name} - Login Configuration
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your credentials to configure this connection
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <Input
              type="email"
              placeholder="Please input your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <Input
              type="password"
              placeholder="Please input your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            App Verification Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="App Verification code"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value)}
                className="pl-10"
                disabled={!otpSent}
              />
            </div>
            <Button
              color="primary"
              variant="solid"
              onPress={handleGetOTP}
              isLoading={isLoading}
              disabled={
                !formData.email.trim() ||
                !formData.password.trim() ||
                countdown > 0
              }
              className="px-6"
            >
              {countdown > 0 ? `${countdown}s` : "GET"}
            </Button>
          </div>
          {otpSent && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              OTP sent to your email
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Verify OTP
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the verification code sent to {formData.email}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Verification Code
          </label>
          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={formData.otp}
            onChange={(e) => handleInputChange("otp", e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code?{" "}
            <button
              onClick={handleGetOTP}
              disabled={countdown > 0}
              className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Connection Successful!
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {connection?.name} has been successfully configured and activated.
        </p>
      </div>

      <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
        <h4 className="mb-2 text-sm font-medium text-green-900 dark:text-green-100">
          Connection Details
        </h4>
        <div className="space-y-1 text-sm text-green-800 dark:text-green-200">
          <div>
            <strong>Provider:</strong> {connection?.provider}
          </div>
          <div>
            <strong>Name:</strong> {connection?.name}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Status:</strong> Active
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => {
    if (step === 1) {
      return (
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={() => setStep(2)}
            disabled={
              !formData.email.trim() ||
              !formData.password.trim() ||
              !formData.otp.trim()
            }
          >
            Verify OTP
          </Button>
        </ModalFooter>
      );
    } else if (step === 2) {
      return (
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => setStep(1)}>
            Back
          </Button>
          <Button
            color="primary"
            onPress={handleVerifyOTP}
            isLoading={isLoading}
            disabled={!formData.otp.trim()}
          >
            Verify & Connect
          </Button>
        </ModalFooter>
      );
    } else {
      return (
        <ModalFooter>
          <Button color="primary" onPress={handleClose}>
            Done
          </Button>
        </ModalFooter>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {step === 1 && "Login Configuration"}
          {step === 2 && "OTP Verification"}
          {step === 3 && "Connection Success"}
        </ModalHeader>
        <ModalBody>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </ModalBody>
        {renderFooter()}
      </ModalContent>
    </Modal>
  );
}

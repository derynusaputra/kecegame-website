import { Button } from "@heroui/button";
import React from "react";

export default function ButtonPurhcase({
  totalPrice = 0,
  onPress,
  isSubmitting,
  isValid,
}) {
  const price = totalPrice.toLocaleString("id-ID");
  return (
    <div className="fixed bottom-0 z-10 flex h-[60px] w-full max-w-md items-center justify-between border-t-1 bg-white px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <div className="text-[13px] font-medium text-[#BDBDBD]">
            Total Harga
          </div>
          <div className="text-[15px] font-semibold text-[#7B61FF]">
            Rp {price}
          </div>
        </div>
        <Button
          color="primary"
          onPress={onPress}
          isLoading={isSubmitting}
          isDisabled={!isValid}
          className="max-w-[150px] flex-1"
        >
          {isSubmitting ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
}

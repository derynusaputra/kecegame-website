"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

const ModalHero = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "2xl",
  showCloseButton = true,
  closeOnOverlayClick = true,
  scrollBehavior = "inside",
  classNames = {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior={scrollBehavior}
      closeOnOverlayClick={closeOnOverlayClick}
      classNames={{
        base: "border-0 bg-white dark:bg-gray-900",
        header: "border-b border-gray-200 dark:border-gray-700",
        body: "py-6",
        footer: "border-t border-gray-200 dark:border-gray-700",
        closeButton: "hover:bg-gray-100 dark:hover:bg-gray-800",
        ...classNames,
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalHero;

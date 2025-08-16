"use client";
import { useEffect, useRef } from "react";
export const Dropdown = ({ isOpen, onClose, children, className = "" }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  if (!isOpen) return null;
  return (
    <div
      ref={dropdownRef}
      className={`shadow-theme-lg dark:bg-gray-dark absolute right-0 z-40 mt-2 rounded-xl border border-gray-200 bg-white dark:border-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};

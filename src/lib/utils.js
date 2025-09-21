import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Note: Crypto functions removed to avoid Buffer dependency issues
// These functions can be re-implemented using browser-compatible crypto APIs if needed

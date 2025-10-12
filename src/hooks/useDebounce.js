import { useEffect, useState } from "react";

/**
 * useDebounce
 * @param {any} value - Nilai yang ingin di-debounce
 * @param {number} delay - Waktu tunda dalam milidetik (ms)
 * @returns {any} Nilai yang sudah di-debounce
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // bersihkan timer setiap kali value berubah
  }, [value, delay]);

  return debouncedValue;
}

export function getCookie(name) {
  // 🧩 Cegah error jika dijalankan di server
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  return null;
}

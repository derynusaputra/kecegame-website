export function capitalizeFirstLetter(text) {
  if (!text) return "";
  const value = text?.toLowerCase();
  return value.charAt(0).toUpperCase() + text.slice(1);
}

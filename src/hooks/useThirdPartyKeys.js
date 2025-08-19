import { useQuery } from "@tanstack/react-query";

// Fetch function for third party keys
const fetchThirdPartyKeys = async () => {
  try {
    const response = await fetch(
      "https://api.halalinmu.com/v1/thirdparty/keys",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Handle the API response structure: { ok: boolean, data: array }
    if (result.ok && Array.isArray(result.data)) {
      return result.data;
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Error fetching third party keys:", error);
    throw new Error(
      error.message ||
        "Gagal mengambil data dari API. Periksa koneksi internet Anda."
    );
  }
};

// Custom hook for third party keys
export const useThirdPartyKeys = () => {
  return useQuery({
    queryKey: ["thirdPartyKeys"],
    queryFn: fetchThirdPartyKeys,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

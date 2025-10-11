import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const outfit = Outfit({
  subsets: ["latin"],
});
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} dark:bg-gray-900`}
        cz-shortcut-listen="true"
      >
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import crypto from "crypto";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const secretKey = "secretsayaakasd";

export const encryptKus = (ciphertext) => {
  const dataString = JSON.stringify(ciphertext);

  const bytes = CryptoJS.AES.encrypt(dataString, secretKey).toString();
  return bytes;
};

export const decryptKus = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// helper base64url
const b64u = {
  encode: (buf) =>
    Buffer.from(buf)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_"),
  decode: (str) =>
    Buffer.from(
      str.replace(/-/g, "+").replace(/_/g, "/") +
        "===".slice((str.length + 3) % 4),
      "base64"
    ),
};

// buat external_id dari userId & totalItem
export const encryptKu = (babi) => {
  const payload = b64u.encode(JSON.stringify(babi));
  const sig = b64u.encode(
    crypto.createHmac("sha256", secretKey).update(payload).digest()
  );
  return `${payload}.${sig}`;
};

// buka & verifikasi external_id
export const decryptKu = (externalId) => {
  const [payload, sig] = externalId.split(".");
  if (!payload || !sig) throw new Error("Malformed external_id");

  const expected = b64u.encode(
    crypto.createHmac("sha256", secretKey).update(payload).digest()
  );
  if (sig !== expected) throw new Error("Invalid signature");

  const data = JSON.parse(b64u.decode(payload).toString("utf8"));
  return data;
};

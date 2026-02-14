// lib/idObfuscator.ts

const PREFIX = "ENC_"; // opsional: untuk identifikasi
const SALT = "NGOPIDONGANDNONGKRONGDONG"; // ganti dengan string rahasia mu

// Encode ID numerik → string
export const obfuscateId = (id: number | string): string => {
  // Konversi ke string jika number
  const idStr = typeof id === "number" ? id.toString() : id;

  const str = idStr + SALT;
  const base64 = Buffer.from(str).toString("base64");

  return (
    PREFIX + base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "") // URL-safe
  );
};

// Decode string → ID numerik (atau string asli)
export const deobfuscateId = (
  obfuscated: string,
): { success: boolean; id?: string; error?: string } => {
  try {
    // Validasi prefix
    if (!obfuscated.startsWith(PREFIX)) {
      return {
        success: false,
        error: "Invalid prefix",
      };
    }

    // Hapus prefix dan restore karakter base64
    const base64 = obfuscated
      .slice(PREFIX.length)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // Tambahkan padding '=' jika perlu
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    // Decode base64
    const decoded = Buffer.from(padded, "base64").toString("utf8");

    // Validasi salt
    if (!decoded.endsWith(SALT)) {
      return {
        success: false,
        error: "Invalid salt",
      };
    }

    // Ekstrak ID asli
    const idStr = decoded.slice(0, -SALT.length);

    // Validasi ID tidak kosong
    if (!idStr || idStr.trim() === "") {
      return {
        success: false,
        error: "Empty ID",
      };
    }

    return {
      success: true,
      id: idStr,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

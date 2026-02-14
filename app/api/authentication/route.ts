import { deobfuscateId, obfuscateId } from "@/lib/helper/idObfuscator";
import { Success, Unauthorized } from "@/lib/helper/responses";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const deobfuscated = {
    username: deobfuscateId(body.username).id,
    password: deobfuscateId(body.password).id,
  };
  const { username, password } = deobfuscated;

  if (username !== "gadjahcakti") {
    return Unauthorized("Username tidak ditemukan");
  } else if (password !== "dings123") {
    return Unauthorized("Password salah");
  } else if (!username && !password) {
    return Unauthorized("Username dan password tidak boleh kosong!");
  }

  return Success({
    token: obfuscateId("berhasil-coyyy!!!"),
  });
};

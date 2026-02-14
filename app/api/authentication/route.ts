import { Login } from "@/lib/DataAccess/user";
import { deobfuscateId, obfuscateId } from "@/lib/helper/idObfuscator";
import {
  BadRequest,
  Conflict,
  Forbidden,
  Success,
  Unauthorized,
} from "@/lib/helper/responses";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const deobfuscated = {
    username: deobfuscateId(body.username),
    password: deobfuscateId(body.password),
  };
  const { username, password } = deobfuscated;

  if (username.id && password.id) {
    const isLogin = await Login({
      username: username.id,
      password: password.id,
    });

    if (isLogin) {
      return Success({
        token: obfuscateId("berhasil-coyyy!!!"),
      });
    }

    return Unauthorized("Username atau password masih salah!");
  }
};

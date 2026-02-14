import { RegisterUser } from "@/lib/DataAccess/user";
import { Conflict, InternalServerError, Success } from "@/lib/helper/responses";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const newUser = await RegisterUser(body);
    if (newUser === 402) {
      return Conflict("Pengguna sudah terdaftar!");
    }
    return Success(newUser);
  } catch (error) {
    return InternalServerError("Gagal mendaftarkan akun");
  }
};

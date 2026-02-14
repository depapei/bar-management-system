import AddNewMenu, { GetAllMenu } from "@/lib/DataAccess/menu";
import { Conflict, InternalServerError, Success } from "@/lib/helper/responses";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const newMenu = await AddNewMenu(body);
    return Success(newMenu);
  } catch (error) {
    return InternalServerError("Gagal menambahkan menu");
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const allMenu = await GetAllMenu();
    return Success(allMenu);
  } catch (error) {
    return InternalServerError("Gagal mengambil menu");
  }
};

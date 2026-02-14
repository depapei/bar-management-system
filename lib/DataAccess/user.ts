import { ILoginForm } from "@/components/Form/LoginForm";
import bcrypt from "bcrypt";
import { deobfuscateId } from "../helper/idObfuscator";
import { IRegister } from "../httpCall/Authentication";
import prismaInstance from "./prismaClient";

const saltRounds = 10;

export const RegisterUser = async (data: IRegister) => {
  const fnDecrypting = (val: string) => {
    const value = deobfuscateId(val).id;
    return value ? value : "DEOBFUSCATE GAGAL";
  };

  try {
    const decryptData = {
      FullName: data.fullName,
      PasswordHash: await bcrypt.hash(fnDecrypting(data.password), 0),
      PasswordSalt: await bcrypt.hash(fnDecrypting(data.password), saltRounds),
      Email: data.email,
      Username: data.username,
      Role: data.role,
    };

    const registeredUsername = await prismaInstance.user.findUnique({
      where: { Username: decryptData.Username },
    });
    const registeredEmail = await prismaInstance.user.findUnique({
      where: { Email: decryptData.Email },
    });

    if (registeredEmail || registeredUsername) {
      throw 402;
    }

    const newUser = await prismaInstance.user.create({
      data: decryptData,
      select: {
        Username: true,
        Email: true,
      },
    });

    const response = {
      username: newUser.Username,
      email: newUser.Email,
    };

    return response;
  } catch (error) {
    return error;
  }
};

export const Login = async (data: ILoginForm) => {
  try {
    const user = await prismaInstance.user.findUnique({
      where: {
        Username: data.username,
      },
      select: {
        UserID: true,
        PasswordHash: true,
      },
    });

    if (
      user?.PasswordHash &&
      (await bcrypt.compare(data.password, user?.PasswordHash))
    ) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

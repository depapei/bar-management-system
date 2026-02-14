import { useMutation } from "@tanstack/react-query";
import API from "./Instance";
import { URL } from "./url";
import { obfuscateId } from "../helper/idObfuscator";
import { AxiosResponse } from "axios";

interface ILogin {
  username: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: (payload: ILogin) => {
      const encPayload = {
        username: obfuscateId(payload.username),
        password: obfuscateId(payload.password),
      };
      return API.post(URL.LOGIN, encPayload);
    },
    onError: (res: AxiosResponse) => {
      if (res.status === 401) {
        return "Username atau password salah!";
      }
    },
  });
};

export interface IRegister {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  role: string;
}
export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: IRegister) => {
      const encPayload = {
        username: payload.username,
        password: obfuscateId(payload.password),
        email: payload.email,
        fullName: payload.fullName,
        role: payload.role,
      };
      return API.post(URL.REGISTER, encPayload);
    },
  });
};

export default useLogin;

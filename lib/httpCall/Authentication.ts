import { useMutation } from "@tanstack/react-query";
import API from "./Instance";
import { URL } from "./url";
interface ILogin {
  username: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: (payload: ILogin) => {
      return API.post(URL.LOGIN, payload);
    },
  });
};

export default useLogin;

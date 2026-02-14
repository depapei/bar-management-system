import * as yup from "yup";

export const LoginValidate = yup.object({
  username: yup
    .string()
    .required("Username tidak boleh kosong!")
    .min(3, "Minimal 3 Huruf!")
    .max(25, "Maximal 25 Huruf!"),
  password: yup
    .string()
    .required("Password tidak boleh kosong!")
    .min(5, "Password minimal 5 huruf!"),
});

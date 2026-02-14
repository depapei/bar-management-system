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

export const RegisterValidate = yup.object({
  username: yup
    .string()
    .required("Username tidak boleh kosong!")
    .min(3, "Minimal 3 Huruf!")
    .max(25, "Maximal 25 Huruf!")
    .matches(/^[^\s]+$/, "Username tidak boleh mengandung spasi!"),
  password: yup
    .string()
    .required("Password tidak boleh kosong!")
    .min(5, "Password minimal 5 huruf!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password harus sama!")
    .required("Confirm password tidak boleh kosong!"),
  fullName: yup
    .string()
    .required("Username tidak boleh kosong!")
    .min(3, "Minimal 3 Huruf!")
    .max(25, "Maximal 25 Huruf!"),
  email: yup.string().email("Format email tidak valid").notRequired(),
  role: yup.string().required("Role harus diisi!"),
});

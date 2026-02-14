import * as yup from "yup";

export const ProductValidate = yup.object({
  ProductName: yup
    .string()
    .required("Nama produk tidak boleh kosong!")
    .min(3, "Minimal 3 Huruf!")
    .max(100, "Maximal 100 Huruf!"),
  ProductType: yup
    .string()
    .required("Tipe produk tidak boleh kosong!")
    .min(3, "Minimal 3 Huruf!")
    .max(50, "Maximal 50 Huruf!"),
  Price: yup
    .number()
    .min(1, "Harga tidak boleh kurang dari 1 perak")
    .required("Harga tidak boleh kosong"),
  Stock: yup.number().optional(),
  Unit: yup.string().optional(),
  Description: yup.string().optional(),
});

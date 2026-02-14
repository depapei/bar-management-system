"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LoginValidate } from "@/lib/FormValidator/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Alert,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import useLogin from "@/lib/httpCall/Authentication";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProductValidate } from "@/lib/FormValidator/Product";
import useAddProduct from "@/lib/httpCall/Master";

export const ProductForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ProductValidate),
    defaultValues: {
      ProductName: "",
      ProductType: "",
      Price: 0,
      Stock: 0,
      Unit: "",
      Description: "",
    },
  });
  const { isPending, mutate, isSuccess, isError, error } = useAddProduct();
  const router = useRouter();
  const onSubmit: SubmitHandler<any> = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (isSuccess === true) {
      router.push("/menu");
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={isSuccess}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Berhasil menambahkan produk!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar
          open={isError}
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {/* {error.status === 401
              ? "Username atau password salah!"
              : error.statusText}
            {error.status === 404
              ? "Username tidak ditermukan!"
              : error.statusText} */}
          </Alert>
        </Snackbar>
      )}
      <div className="mb-5">
        <Controller
          name="ProductName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="ProductName"
              label="Nama Produk"
              type="text"
              size="medium"
              error={errors.ProductName && true}
              helperText={errors.ProductName?.message}
              variant="filled"
              fullWidth
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="ProductType"
          control={control}
          render={({ field }) => {
            const options = [
              "Cemilan",
              "Coffee",
              "Non-Coffee",
              "Food",
              "Beverages",
            ];

            return (
              <FormControl
                {...field}
                variant="filled"
                fullWidth
                error={errors.ProductType && true}
              >
                <InputLabel id="product-type" {...field}>
                  Tipe Produk
                </InputLabel>
                <Select
                  label="Tipe Produk"
                  {...field}
                  labelId="product-type"
                  id="product-type-select"
                >
                  {options.map((opt, key: React.Key) => (
                    <MenuItem key={key} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                {errors.ProductType && (
                  <FormHelperText>{errors.ProductType?.message}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="Price"
          control={control}
          render={({ field }) => (
            <FormControl {...field} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Harga</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">Rp.</InputAdornment>
                }
                type="number"
                size="medium"
                error={errors.Price && true}
              />
              {errors.Price && (
                <FormHelperText>{errors.Price?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="Stock"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="Stock"
              label="Stock"
              type="number"
              size="medium"
              error={errors.Stock && true}
              helperText={errors.Stock?.message}
              variant="filled"
              fullWidth
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="Unit"
          control={control}
          render={({ field }) => {
            const options = ["pcs", "gr", "ml", "kg", "lt"].sort();

            return (
              <FormControl
                {...field}
                variant="filled"
                fullWidth
                error={errors.Unit && true}
              >
                <InputLabel id="product-type" {...field}>
                  Satuan Unit
                </InputLabel>
                <Select
                  label="Satuan Unit"
                  {...field}
                  labelId="product-type"
                  id="product-type-select"
                >
                  {options.map((opt, key: React.Key) => (
                    <MenuItem key={key} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
                {errors.Unit && (
                  <FormHelperText>{errors.Unit?.message}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </div>
      <Button
        size="medium"
        variant="outlined"
        type="submit"
        loading={isPending}
        loadingPosition="center"
        color="primary"
        className="w-full md:w-fit"
      >
        Tambahkan
      </Button>
    </form>
  );
};

export default ProductForm;

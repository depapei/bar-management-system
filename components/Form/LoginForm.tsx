"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LoginValidate } from "@/lib/FormValidator/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import useLogin from "@/lib/httpCall/Authentication";

export type ILoginForm = yup.InferType<typeof LoginValidate>;

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginValidate),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { isPending, mutate, isSuccess, isError, error } = useLogin();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log("error");
    }
  };

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
          Login Berhasil!
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
            {error.status === 401
              ? "Username atau password salah!"
              : error.statusText}
            {error.status === 404
              ? "Username tidak ditermukan!"
              : error.statusText}
          </Alert>
        </Snackbar>
      )}
      <div className="mb-5">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="username"
              label="Username"
              type="text"
              size="medium"
              error={errors.username && true}
              helperText={errors.username?.message}
              variant="filled"
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="password"
              label="Password"
              type="password"
              size="medium"
              error={errors.password && true}
              helperText={errors.password?.message}
              variant="filled"
            />
          )}
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
        Login
      </Button>
    </form>
  );
};

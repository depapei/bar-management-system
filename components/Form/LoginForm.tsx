"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LoginValidate } from "@/lib/FormValidator/Login";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import useLogin from "@/lib/httpCall/Authentication";

type ILoginForm = yup.InferType<typeof LoginValidate>;

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
  const { isPending, mutate } = useLogin();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
              size="small"
              error={errors.username && true}
              helperText={errors.username?.message}
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
              label="Required"
              type="password"
              size="small"
              error={errors.password && true}
              helperText={errors.password?.message}
            />
          )}
        />
      </div>
      <Button
        size="small"
        variant="contained"
        type="submit"
        loading={isPending}
        loadingPosition="end"
      >
        Login
      </Button>
    </form>
  );
};

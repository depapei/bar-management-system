"use client";
import { RegisterValidate } from "@/lib/FormValidator/Auth";
import { useRegister } from "@/lib/httpCall/Authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(RegisterValidate),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
      role: "",
    },
  });
  const { isPending, mutate, isSuccess, isError, error } = useRegister();

  const onSubmit: SubmitHandler<any> = (data) => {
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
          Register Berhasil!
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
            {error.message}
          </Alert>
        </Snackbar>
      )}
      <div className="mb-5">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="fullName"
              label="Nama Lengkap"
              type="fullName"
              size="medium"
              fullWidth
              error={errors.fullName && true}
              helperText={errors.fullName?.message}
              variant="filled"
            />
          )}
        />
      </div>
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
              fullWidth
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
              fullWidth
              error={errors.password && true}
              helperText={errors.password?.message}
              variant="filled"
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="confirmPassword"
              label="Konfirmasi Password"
              type="password"
              size="medium"
              fullWidth
              error={errors.confirmPassword && true}
              helperText={errors.confirmPassword?.message}
              variant="filled"
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              label="Email"
              type="email"
              size="medium"
              fullWidth
              error={errors.email && true}
              helperText={errors.email?.message}
              variant="filled"
            />
          )}
        />
      </div>
      <div className="mb-5">
        <Controller
          name="role"
          control={control}
          render={({ field }) => {
            const options = [
              "Barista",
              "Headbar",
              "Owner",
              "Staff",
              "System Admin",
            ];

            return (
              <FormControl
                variant="filled"
                fullWidth
                {...field}
                error={errors.role && true}
              >
                <InputLabel id="demo-simple-select-label" {...field}>
                  Role
                </InputLabel>
                <Select
                  label="Role"
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  {options.map((opt) => (
                    <MenuItem value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <FormHelperText>{errors.role?.message}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </div>
      <Button
        variant="outlined"
        type="submit"
        // loading={isPending}
        loadingPosition="center"
        color="primary"
        className="w-full md:w-fit"
      >
        Daftar
      </Button>
    </form>
  );
};

export default RegisterForm;

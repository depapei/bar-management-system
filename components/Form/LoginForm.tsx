"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LoginValidate } from "@/lib/FormValidator/Login";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Username
        </label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="ex: akidna1997"
            />
          )}
        />
        <p className="text-red-600 animate-pulse text-sm">
          {errors.username?.message}
        </p>
      </div>
      <div className="mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Your password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="password"
              onChange={(e: any) => {
                field.onChange(e.target.value);
              }}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="***"
            />
          )}
        />
        <p className="text-red-600 animate-pulse text-sm">
          {errors.password?.message}
        </p>
      </div>
      <input
        type="submit"
        title="Login"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer"
      />
    </form>
  );
};

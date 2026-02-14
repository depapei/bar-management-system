import { LoginForm } from "@/components/Form/LoginForm";

export const Login = () => {
  return (
    <div className="bg-opacity-100 bg-gray-50 shadow-2xl p-8 rounded-xl flex flex-col md:flex-row gap-8 justify-center items-center">
      <h1 className="text-xl text-gray-500">Selamat datang, silahkan login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;

import RegisterForm from "@/components/Form/RegisterForm";

export const Register = () => {
  return (
    <div className="bg-opacity-100 bg-gray-50 shadow-2xl p-8 rounded-xl flex flex-col gap-8 justify-center items-center">
      <h1 className="text-xl text-gray-500">Selamat datang, silahkan Daftar</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;

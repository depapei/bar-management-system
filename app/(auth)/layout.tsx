export const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 to-indigo-900">
      {children}
    </div>
  );
};

export default AuthLayout;

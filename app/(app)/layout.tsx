"use client";

import Navbar from "@/components/Nav";

export const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      {children}
      <Navbar />
    </div>
  );
};

export default AppLayout;

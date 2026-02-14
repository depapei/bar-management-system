"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Provider = (props: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default Provider;

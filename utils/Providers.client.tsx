"use client";

import { ReactNode, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider>
        <ReactQueryDevtools />
        <Toaster position="top-center" />
        {children}
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
};

export default Providers;

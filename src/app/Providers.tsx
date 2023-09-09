"use client";

import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/redux/providers";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default Providers;

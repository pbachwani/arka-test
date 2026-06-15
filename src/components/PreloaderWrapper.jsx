"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import { LoadingProvider } from "@/app/contexts/LoadingContext";

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingProvider isLoading={isLoading}>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
      {children}
    </LoadingProvider>
  );
}

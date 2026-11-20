"use client";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import { LoadingProvider } from "@/app/contexts/LoadingContext";

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      // Disable scroll
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      // Enable scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      // Cleanup
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <LoadingProvider isLoading={isLoading}>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
      {children}
    </LoadingProvider>
  );
}

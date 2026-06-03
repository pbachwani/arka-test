"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import React from "react";
import HeroReveal from "./HeroReveal";
import About from "@/components/About";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <main className="w-full h-full mx-auto min-h-screen">
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />

      {!isLoading && (
        <>
          <HeroReveal isLoading={isLoading} />
          <About />
          <div className="h-screen w-full flex justify-center items-center bg-blue-300">
            Section 3
          </div>
          <div className="h-screen w-full flex justify-center items-center bg-green-300">
            Section 4
          </div>
        </>
      )}
    </main>
  );
};

export default Home;

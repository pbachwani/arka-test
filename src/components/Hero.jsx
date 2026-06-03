"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = isMobile ? "top 80%" : "top top";

      const maskTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          end: "bottom center",
          scrub: 1.5,
          pin: true,
        },
      });

      maskTimeline
        .to(".will-fade", {
          opacity: 0,
          stagger: 0.2,
          ease: "power1.inOut",
        })
        .to(".masked-img", {
          scale: 1.5,
          maskPosition: "center",
          maskSize: "1000%",
          duration: 2,
          ease: "power1.inOut",
          opacity: 0,
        })
        .to(".hero-content", {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        });

      return () => {
        maskTimeline.scrollTrigger?.kill();
      };
    }, 3500); // 500ms delay

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={containerRef}
        className="relative w-full h-svh flex justify-center items-center overflow-hidden"
      >
        {/* Background Image (with mask animation) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 w-full h-full z-20"
        >
          <img
            src="/background.png"
            alt="Hero Background"
            className="w-full h-full object-cover masked-img"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 w-full h-full -z-10"
        >
          <img
            src="/background.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="hero-content absolute inset-0 flex items-center justify-center opacity-0 z-30">
          <div className="text-center text-white">
            <h1 className="will-fade text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our World
            </h1>
            <p className="will-fade text-lg md:text-2xl">
              Crafted with passion, poured with perfection
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Hero;

"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const HeroReveal = ({ isLoading }) => {
  const topLayerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;
    requestAnimationFrame(() => {
      console.log(sectionRef.current?.clientHeight);
      console.log(window.innerHeight);
      ScrollTrigger.refresh();
    });
  }, [isLoading]);

  useEffect(() => {
    window.innerHeight = sectionRef.current?.clientHeight;
    const t1 = gsap.timeline();

    t1.to(topLayerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      scale: 40,
    }).to(".hero-text", {
      scrollTrigger: {
        trigger: topLayerRef.current,
        start: "bottom 80%",
        end: "+=300",
        scrub: 1,
      },
      opacity: 1,
    });
    // console.log(window.innerHeight);

    ScrollTrigger.refresh();

    return () => {
      t1.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <motion.section
      id="hero-section"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="relative h-[200vh]"
    >
      {/* Sticky Background */}
      <div className="sticky top-0 inset-0 w-full h-screen z-0 max-h-[200vh] overflow-hidden">
        <img
          src="/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top image mask Layer */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        <img
          ref={topLayerRef}
          src="/top-layer.png"
          alt="Top Layer"
          className="w-full h-full object-cover sticky top-0"
          // onLoad={() => {
          //   // Ensure the image is fully loaded before starting the animation
          //   ScrollTrigger.refresh();
          // }}
        />
      </div>

      {/* Hero Section */}
      <div className="absolute inset-0 w-full min-h-screen z-10 flex items-center justify-center">
        {/* Text Reveal */}
        <div className="sticky top-1/2 -translate-y-1/2 hero-text text-center text-white z-20 opacity-0">
          <h1 className="text-5xl md:text-7xl font-bold font-sinister">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
            non?
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            earum, dolores natus atque aperiam totam ullam, eligendi cupiditate
            nisi quos consequatur placeat autem facere repellat.
          </p>
        </div>
      </div>

      {/* Extra space to allow scrolling */}
      <div className="h-svh" />
    </motion.section>
  );
};

export default HeroReveal;

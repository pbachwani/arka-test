// "use client";
// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLoading } from "@/app/contexts/LoadingContext";
// import { motion } from "motion/react";
// import TextReveal from "@/components/ui/TextReveal";

// gsap.registerPlugin(ScrollTrigger);

// const HeroReveal = () => {
//   const { isLoading } = useLoading();
//   const topLayerRef = useRef(null);
//   const sectionRef = useRef(null);
//   const heroTextRef = useRef(null);

//   useEffect(() => {
//     if (isLoading) return; // Don't animate while loading

//     const timeoutId = setTimeout(() => {
//       const timeline = gsap.timeline();

//       timeline.to(topLayerRef.current, {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "center top",
//           scrub: 1,
//         },
//         scale: 40,
//         ease: "power1.inOut",
//       });

//       timeline.to(
//         heroTextRef.current,
//         {
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "top center",
//             scrub: 1,
//           },
//           opacity: 1,
//           ease: "power2.inOut",
//         },
//         0,
//       );

//       ScrollTrigger.refresh();

//       return () => {
//         timeline.kill();
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       };
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [isLoading]);

//   return (
//     <motion.section
//       id="hero-section"
//       ref={sectionRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: isLoading ? 0 : 1 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="relative w-full"
//     >
//       <div className="relative h-[150vh]">
//         <div className="sticky top-0 w-full h-screen overflow-hidden">
//           <img
//             src="/background.png"
//             alt="Background"
//             className="w-full h-full object-cover"
//           />

//           <div className="absolute inset-0 overflow-hidden">
//             <img
//               ref={topLayerRef}
//               src="/top-layer.png"
//               alt="Top Layer"
//               className="w-full h-full object-cover origin-center"
//             />
//           </div>
//         </div>

//         <div
//           ref={heroTextRef}
//           className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0"
//         >
//           <div className="text-center text-white max-w-3xl px-6">
//             <h1 className="text-4xl font-sinister">
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
//               non?
//             </h1>
//             <p className="text-xl md:text-2xl mt-4 font-poppins">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
//               earum, dolores natus atque aperiam totam ullam, eligendi
//               cupiditate nisi quos consequatur placeat autem facere repellat.
//             </p>

//             <TextReveal
//               scrollTrigger={{
//                 trigger: sectionRef.current,
//                 start: "top 60%",
//                 end: "center top",
//                 scrub: 1,
//               }}
//               className="text-4xl font-sinister block mb-4"
//             >
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
//               non?
//             </TextReveal>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default HeroReveal;

"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/app/contexts/LoadingContext";
import { motion } from "motion/react";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const HeroReveal = () => {
  const { isLoading } = useLoading();
  const topLayerRef = useRef(null);
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const timeoutId = setTimeout(() => {
      const timeline = gsap.timeline();

      timeline.to(topLayerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
        scale: 40,
        ease: "power1.inOut",
      });

      timeline.to(
        heroTextRef.current,
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "center top",
            scrub: 1,
          },
          opacity: 1,
          ease: "power2.inOut",
        },
        0,
      );

      ScrollTrigger.refresh();

      return () => {
        timeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  return (
    <motion.section
      id="hero-section"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full"
    >
      <div className="relative h-[200vh] bg-black">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <img
            src="/background.png"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={topLayerRef}
              src="/top-layer.png"
              alt="Top Layer"
              className="w-full h-full object-cover origin-center"
            />
          </div>
        </div>

        <div
          ref={heroTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0"
        >
          <div className="sticky top-1/2 -translate-y-1/2 text-center text-white max-w-3xl px-6">
            <TextReveal
              scrollTrigger={{
                trigger: sectionRef.current,
                start: "top top",
                end: "center top",
                scrub: 1,
              }}
              className="text-4xl font-sinister block mb-4"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem,
              non?
            </TextReveal>
            <TextReveal
              scrollTrigger={{
                trigger: sectionRef.current,
                start: "top top",
                end: "center top",
                scrub: 1,
              }}
              className="text-xl md:text-2xl font-poppins"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              earum, dolores natus atque aperiam totam ullam, eligendi
              cupiditate nisi quos consequatur placeat autem facere repellat.
            </TextReveal>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroReveal;

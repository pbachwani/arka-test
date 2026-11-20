"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PetalImage from "./PetalImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ anticipatePin: 1 }); // avoids gaps between back-to-back pinned sections
}

export default function CategoryPinScroll({ category }) {
  const { title, sanskrit, items } = category;
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const panelsRef = useRef([]);
  const activeIndexRef = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current;
      gsap.set(panels, { opacity: 0, pointerEvents: "none" });
      gsap.set(panels[0], { opacity: 1, pointerEvents: "auto" });

      const goTo = (nextIndex) => {
        const current = activeIndexRef.current;
        if (nextIndex === current) return;

        gsap.to(panels[current], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          pointerEvents: "none",
        });
        gsap.fromTo(
          panels[nextIndex],
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.12,
            ease: "power2.inOut",
            pointerEvents: "auto",
          },
        );
        activeIndexRef.current = nextIndex;
      };

      if (items.length > 1) {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${(items.length - 1) * window.innerHeight}`,
          pin: stickyRef.current,
          scrub: 1,
          snap: {
            snapTo: 1 / (items.length - 1),
            duration: 0.4,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const raw = self.progress * (items.length - 1);
            goTo(Math.round(raw));
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [items.length]);

  const heightVh = items.length > 1 ? items.length * 100 : 100;

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${heightVh}vh` }}
    >
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden bg-[#f2ead9]"
      >
        {/* persistent header — stays fixed while sub-items crossfade beneath it */}
        <div className="absolute left-1/2 top-10 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            {title}
          </p>
          {sanskrit && (
            <p className="mt-1 text-sm text-neutral-500">{sanskrit}</p>
          )}
        </div>

        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (panelsRef.current[i] = el)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 lg:pt-40"
          >
            <div className="hidden lg:grid w-full max-w-5xl lg:grid-cols-[1fr_auto_1fr] max-lg:grid-rows-[1fr_auto_1fr] items-center gap-8">
              <span className="justify-self-end mr-20 text-lg font-medium uppercase tracking-[0.3em] text-neutral-800 font-sinister ">
                {item.title}
              </span>
              <PetalImage src={item.image} alt={item.title} size={400} />

              <span className="justify-self-start ml-20 text-xl font-bold text-neutral-800 ">
                {item.sanskrit}
              </span>
            </div>
            <div className="lg:hidden w-full flex flex-col justify-center items-center gap-8">
              <span className="justify-self-start text-lg font-medium uppercase tracking-[0.3em] text-neutral-800 font-sinister">
                {item.title}
              </span>
              <PetalImage src={item.image} alt={item.title} size={300} />

              <span className="justify-self-end text-xl font-bold text-neutral-800">
                {item.sanskrit}
              </span>
            </div>

            <p className="max-w-md text-justify text-sm leading-relaxed text-neutral-700 mt-10">
              {item.description}
            </p>

            <button className="rounded-full border border-neutral-800 px-6 py-3 text-xs uppercase tracking-widest text-neutral-800 transition hover:bg-neutral-800 hover:text-[#f2ead9]">
              Explore Details
            </button>

            {items.length > 1 && (
              <div className="absolute bottom-10 flex gap-2">
                {items.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      dotIndex === i ? "bg-neutral-800" : "bg-neutral-800/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

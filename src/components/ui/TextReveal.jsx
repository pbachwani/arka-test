"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  children,
  scrollTrigger,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!scrollTrigger || !containerRef.current) return;

    // Access ref.current safely here
    const trigger = scrollTrigger.trigger?.current || scrollTrigger.trigger;

    const words = containerRef.current.querySelectorAll(".word");
    if (words.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: scrollTrigger.start,
        end: scrollTrigger.end,
        scrub: scrollTrigger.scrub,
      },
    });

    words.forEach((word, index) => {
      timeline.to(
        word,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
        },
        index * 0.05,
      );
    });

    return () => {
      timeline.kill();
    };
  }, [scrollTrigger]);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="word inline-block mr-2"
          style={{
            opacity: 0,
            transform: "translateY(10px)",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

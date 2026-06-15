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
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!scrollTrigger || !containerRef.current) return;

    // Get all word spans
    const words = containerRef.current.querySelectorAll(".word");
    if (words.length === 0) return;

    // Create a timeline for word reveals
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrigger.trigger,
        start: scrollTrigger.start,
        end: scrollTrigger.end,
        scrub: scrollTrigger.scrub,
      },
    });

    // Animate each word in sequence based on scroll
    words.forEach((word, index) => {
      timeline.to(
        word,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
        },
        index * 0.05, // Stagger between words
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
            transform: "translateY(4px)",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { wrap } from "@motionone/utils";

export default function ImageMarqueeScroll({
  images = [],
  baseVelocity = 10,
  height = 120,
}) {
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v)}%`);

  return (
    <div className="overflow-hidden w-full">
      <motion.div className="flex gap-0" style={{ x }}>
        {[...images, ...images].map((src, i) => (
          <motion.img
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.04, // 👈 stagger delay
              ease: "easeOut",
            }}
            key={i}
            src={src}
            alt=""
            style={{ height }}
            className="shrink-0 object-contain border p-2.5"
          />
        ))}
      </motion.div>
    </div>
  );
}

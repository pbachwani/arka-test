"use client";

import { useEffect, useRef } from "react";
import Renderer from "@/lib/liquify/Renderer";

export default function GlobalLiquify() {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer(containerRef.current);

    return () => renderer.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        z-9999
        pointer-events-none
        overflow-hidden
      "
    />
  );
}

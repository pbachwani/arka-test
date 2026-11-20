// "use client";

// import { useEffect, useId, useRef } from "react";

// const DEFAULTS = {
//   resolution: 128, // ripple sim grid density along the longer container edge
//   diffusion: 0.5, // how fast a splat spreads/softens into its neighbors each frame
//   decay: 0.94, // how fast the blob fades; closer to 1 = lingers longer
//   rippleRadius: 3, // splat radius in grid cells
//   rippleStrength: 7, // how hard a pointer move disturbs the surface
//   scale: 16, // pixel displacement strength at full intensity
//   attack: 0.1, // how fast the effect eases in when disturbed (higher = snappier)
//   release: 0.05, // how fast the effect eases out at rest (lower = longer fade-out)
// };

// /**
//  * Wraps children in a live, always-interactive DOM warp effect using an
//  * SVG feDisplacementMap filter, driven by a small canvas-based ripple
//  * simulation. Distortion only appears where the pointer has actually
//  * disturbed the surface -- at rest, content renders completely undistorted.
//  * Works anywhere SVG filters on CSS `filter` are supported (all modern
//  * evergreen browsers) -- no experimental APIs or flags required.
//  */
// export function WaterWarp({
//   children,
//   className,
//   style,
//   resolution = DEFAULTS.resolution,
//   diffusion = DEFAULTS.diffusion,
//   decay = DEFAULTS.decay,
//   rippleRadius = DEFAULTS.rippleRadius,
//   rippleStrength = DEFAULTS.rippleStrength,
//   scale = DEFAULTS.scale,
//   attack = DEFAULTS.attack,
//   release = DEFAULTS.release,
// }) {
//   const rawId = useId();
//   const filterId = `water-warp-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
//   const wrapperRef = useRef(null);
//   const feImageRef = useRef(null);
//   const displaceRef = useRef(null);
//   const rafRef = useRef(0);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const feImage = feImageRef.current;
//     if (!wrapper || !feImage) return;

//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d", { willReadFrequently: true });

//     // grid dimensions match the wrapper's aspect ratio so a splat stays
//     // round and localized instead of stretching to fill the container
//     let cols = resolution;
//     let rows = resolution;
//     let heightA = new Float32Array(cols * rows);
//     let heightB = new Float32Array(cols * rows);
//     let imageData = ctx.createImageData(cols, rows);

//     function resize() {
//       const rect = wrapper.getBoundingClientRect();
//       const aspect = rect.width / Math.max(rect.height, 1) || 1;
//       const nextCols =
//         aspect >= 1 ? resolution : Math.max(8, Math.round(resolution * aspect));
//       const nextRows =
//         aspect >= 1 ? Math.max(8, Math.round(resolution / aspect)) : resolution;
//       if (nextCols === cols && nextRows === rows) return;
//       cols = nextCols;
//       rows = nextRows;
//       canvas.width = cols;
//       canvas.height = rows;
//       heightA = new Float32Array(cols * rows);
//       heightB = new Float32Array(cols * rows);
//       imageData = ctx.createImageData(cols, rows);
//     }
//     resize();

//     const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
//     let reducedMotion = motionQuery.matches;
//     const onMotionChange = () => {
//       reducedMotion = motionQuery.matches;
//     };
//     motionQuery.addEventListener("change", onMotionChange);

//     let visible = true;
//     const intersection = new IntersectionObserver((entries) => {
//       visible = entries[entries.length - 1]?.isIntersecting ?? true;
//     });
//     intersection.observe(wrapper);

//     const resizeObserver = new ResizeObserver(resize);
//     resizeObserver.observe(wrapper);

//     function splat(px, py, strength) {
//       const cx = Math.round(px * cols);
//       const cy = Math.round(py * rows);
//       const r = rippleRadius;
//       for (let y = -r; y <= r; y++) {
//         for (let x = -r; x <= r; x++) {
//           const gx = cx + x;
//           const gy = cy + y;
//           if (gx < 1 || gy < 1 || gx >= cols - 1 || gy >= rows - 1) continue;
//           const d = Math.sqrt(x * x + y * y);
//           if (d > r) continue;
//           heightA[gy * cols + gx] += strength * (1 - d / r);
//         }
//       }
//     }

//     function onPointerMove(event) {
//       if (reducedMotion) return;
//       const rect = wrapper.getBoundingClientRect();
//       const px = (event.clientX - rect.left) / rect.width;
//       const py = (event.clientY - rect.top) / rect.height;
//       if (px < 0 || px > 1 || py < 0 || py > 1) return;
//       splat(px, py, rippleStrength);
//     }
//     wrapper.addEventListener("pointermove", onPointerMove);

//     let idle = true; // true once fully faded out AND physically flat
//     let intensity = 0; // eased 0..1 envelope, decoupled from the raw physics

//     function step() {
//       rafRef.current = requestAnimationFrame(step);
//       if (!visible || idle) return;

//       let energy = 0;
//       for (let y = 1; y < rows - 1; y++) {
//         for (let x = 1; x < cols - 1; x++) {
//           const i = y * cols + x;
//           const avg =
//             (heightA[i - 1] +
//               heightA[i + 1] +
//               heightA[i - cols] +
//               heightA[i + cols]) /
//             4;
//           heightB[i] = (heightA[i] + (avg - heightA[i]) * diffusion) * decay;
//           energy += Math.abs(heightB[i]);
//         }
//       }
//       const tmp = heightA;
//       heightA = heightB;
//       heightB = tmp;

//       // ease the visual strength toward 1 while there's real energy, and
//       // back toward 0 as it dies out -- this is what smooths the start/end
//       // instead of the raw physics popping on and off
//       const target = energy > 0.02 ? 1 : 0;
//       intensity +=
//         (target - intensity) * (target > intensity ? attack : release);
//       if (intensity < 0.001) intensity = 0;
//       displaceRef.current?.setAttribute("scale", String(scale * intensity));

//       const data = imageData.data;
//       for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//           const i = y * cols + x;
//           const xL = x > 0 ? heightA[i - 1] : heightA[i];
//           const xR = x < cols - 1 ? heightA[i + 1] : heightA[i];
//           const yU = y > 0 ? heightA[i - cols] : heightA[i];
//           const yD = y < rows - 1 ? heightA[i + cols] : heightA[i];
//           const dx = (xR - xL) * 0.5;
//           const dy = (yD - yU) * 0.5;
//           const o = i * 4;
//           data[o] = Math.max(0, Math.min(255, 128 + dx * 40));
//           data[o + 1] = Math.max(0, Math.min(255, 128 + dy * 40));
//           data[o + 2] = 128;
//           data[o + 3] = 255;
//         }
//       }
//       ctx.putImageData(imageData, 0, 0);
//       feImage.setAttribute("href", canvas.toDataURL());

//       // only stop the per-frame work once both the physics and the eased
//       // envelope have fully settled, so there's never a visible pop
//       if (energy < 0.02 && intensity === 0) {
//         idle = true;
//         heightA.fill(0);
//         heightB.fill(0);
//       }
//     }

//     const wake = () => {
//       idle = false;
//     };
//     wrapper.addEventListener("pointermove", wake);
//     rafRef.current = requestAnimationFrame(step);

//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       wrapper.removeEventListener("pointermove", onPointerMove);
//       wrapper.removeEventListener("pointermove", wake);
//       motionQuery.removeEventListener("change", onMotionChange);
//       intersection.disconnect();
//       resizeObserver.disconnect();
//     };
//   }, [
//     resolution,
//     diffusion,
//     decay,
//     rippleRadius,
//     rippleStrength,
//     scale,
//     attack,
//     release,
//   ]);

//   return (
//     <div
//       ref={wrapperRef}
//       className={className}
//       style={{ position: "relative", filter: `url(#${filterId})`, ...style }}
//     >
//       <svg
//         width="0"
//         height="0"
//         style={{ position: "absolute" }}
//         aria-hidden="true"
//       >
//         <defs>
//           <filter
//             id={filterId}
//             x="-10%"
//             y="-10%"
//             width="120%"
//             height="120%"
//             colorInterpolationFilters="sRGB"
//           >
//             <feImage
//               ref={feImageRef}
//               result="rippleMap"
//               preserveAspectRatio="none"
//               x="0"
//               y="0"
//               width="100%"
//               height="100%"
//             />
//             <feDisplacementMap
//               ref={displaceRef}
//               in="SourceGraphic"
//               in2="rippleMap"
//               scale="0"
//               xChannelSelector="R"
//               yChannelSelector="G"
//             />
//           </filter>
//         </defs>
//       </svg>
//       {children}
//     </div>
//   );
// }

// export default WaterWarp;

"use client";

import { useEffect, useId, useRef } from "react";

// Prop names/defaults mirror the reference WebGL component 1:1 where the
// concept carries over (pressure, curl, radius, force, dissipation). `scale`,
// `attack`, and `release` are additions needed for the SVG-displacement
// approach and the smooth start/stop easing.
const DEFAULTS = {
  resolution: 96, // sim grid density along the longer container edge
  densityDissipation: 0.96, // how much the trail persists each frame
  velocityDissipation: 1, // how much motion persists each frame
  pressure: 0.8, // how much pressure carries over between frames
  pressureIterations: 4, // Jacobi pressure-solve iterations
  curl: 1.9, // vorticity confinement strength (adds swirl/eddies)
  radius: 0.3, // splat radius (same units as the reference: radius/100)
  force: 1.1, // force multiplier applied on pointer movement
  scale: 18, // pixel displacement strength at full intensity
  attack: 0.1, // how fast the effect eases in when disturbed
  release: 0.05, // how fast the effect eases out at rest
};

const DT = 1 / 60;

/**
 * Wraps children in a live, always-interactive DOM warp effect using an
 * SVG feDisplacementMap filter. The simulation is a CPU port of the
 * reference's real fluid pipeline -- curl, vorticity confinement,
 * divergence, a Jacobi pressure solve, and semi-Lagrangian advection --
 * run on a small grid instead of WebGL, so it still warps real DOM
 * content directly with no experimental browser APIs required.
 */
export function WaterWarp({
  children,
  className,
  style,
  resolution = DEFAULTS.resolution,
  densityDissipation = DEFAULTS.densityDissipation,
  velocityDissipation = DEFAULTS.velocityDissipation,
  pressure = DEFAULTS.pressure,
  pressureIterations = DEFAULTS.pressureIterations,
  curl = DEFAULTS.curl,
  radius = DEFAULTS.radius,
  force = DEFAULTS.force,
  scale = DEFAULTS.scale,
  attack = DEFAULTS.attack,
  release = DEFAULTS.release,
}) {
  const rawId = useId();
  const filterId = `water-warp-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const wrapperRef = useRef(null);
  const feImageRef = useRef(null);
  const displaceRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const feImage = feImageRef.current;
    if (!wrapper || !feImage) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    // grid dimensions match the wrapper's aspect ratio so a splat stays
    // round and localized instead of stretching to fill the container
    let cols = resolution;
    let rows = resolution;
    let vx, vy, vxNext, vyNext;
    let dyeX, dyeY, dyeXNext, dyeYNext;
    let curlField, divField, pressureA, pressureB;
    let imageData;

    function alloc() {
      const n = cols * rows;
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      vxNext = new Float32Array(n);
      vyNext = new Float32Array(n);
      dyeX = new Float32Array(n);
      dyeY = new Float32Array(n);
      dyeXNext = new Float32Array(n);
      dyeYNext = new Float32Array(n);
      curlField = new Float32Array(n);
      divField = new Float32Array(n);
      pressureA = new Float32Array(n);
      pressureB = new Float32Array(n);
      imageData = ctx.createImageData(cols, rows);
    }

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      const aspect = rect.width / Math.max(rect.height, 1) || 1;
      const nextCols =
        aspect >= 1 ? resolution : Math.max(8, Math.round(resolution * aspect));
      const nextRows =
        aspect >= 1 ? Math.max(8, Math.round(resolution / aspect)) : resolution;
      if (nextCols === cols && nextRows === rows && vx) return;
      cols = nextCols;
      rows = nextRows;
      canvas.width = cols;
      canvas.height = rows;
      alloc();
    }
    resize();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const onMotionChange = () => {
      reducedMotion = motionQuery.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    let visible = true;
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
    });
    intersection.observe(wrapper);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    function sample(field, x, y) {
      const cx = Math.max(0, Math.min(cols - 1.001, x));
      const cy = Math.max(0, Math.min(rows - 1.001, y));
      const x0 = Math.floor(cx);
      const y0 = Math.floor(cy);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      const tx = cx - x0;
      const ty = cy - y0;
      const i00 = y0 * cols + x0;
      const i10 = y0 * cols + x1;
      const i01 = y1 * cols + x0;
      const i11 = y1 * cols + x1;
      const a = field[i00] * (1 - tx) + field[i10] * tx;
      const b = field[i01] * (1 - tx) + field[i11] * tx;
      return a * (1 - ty) + b * ty;
    }

    let idle = true;
    let intensity = 0;

    function splat(px, py, dx, dy) {
      const cx = px * cols;
      const cy = py * rows;
      // matches the reference's exp(-dot(p,p)/uRadius) falloff, where
      // uRadius = radius/100 and p is measured in normalized UV space
      const uRadius = radius / 100;
      const cutoff = Math.sqrt(-Math.log(0.001) * uRadius);
      const marginX = Math.ceil(cutoff * cols) + 1;
      const marginY = Math.ceil(cutoff * rows) + 1;
      const minX = Math.max(1, Math.floor(cx - marginX));
      const maxX = Math.min(cols - 2, Math.ceil(cx + marginX));
      const minY = Math.max(1, Math.floor(cy - marginY));
      const maxY = Math.min(rows - 2, Math.ceil(cy + marginY));
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const ddxUV = (x - cx) / cols;
          const ddyUV = (y - cy) / rows;
          const falloff = Math.exp(-(ddxUV * ddxUV + ddyUV * ddyUV) / uRadius);
          const i = y * cols + x;
          vx[i] += dx * falloff;
          vy[i] += dy * falloff;
          dyeX[i] += dx * falloff;
          dyeY[i] += dy * falloff;
        }
      }
      idle = false;
    }

    const pointers = new Map();
    function onPointerMove(event) {
      if (reducedMotion) return;
      const rect = wrapper.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const previous = pointers.get(event.pointerId);
      pointers.set(event.pointerId, { x: px, y: py });
      if (px < 0 || px > 1 || py < 0 || py > 1 || !previous) return;
      const dx = (px - previous.x) * cols * force;
      const dy = (py - previous.y) * rows * force;
      splat(px, py, dx, dy);
    }
    function onPointerLeave(event) {
      pointers.delete(event.pointerId);
    }
    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);
    wrapper.addEventListener("pointercancel", onPointerLeave);

    let lastTime = performance.now();

    function step(now) {
      rafRef.current = requestAnimationFrame(step);
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      if (!visible || idle) return;

      // curl
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          curlField[i] =
            (vy[i + 1] - vy[i - 1]) * 0.5 - (vx[i + cols] - vx[i - cols]) * 0.5;
        }
      }

      // vorticity confinement -- re-injects spin so eddies don't just die out
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const l = Math.abs(curlField[i - 1]);
          const r = Math.abs(curlField[i + 1]);
          const t = Math.abs(curlField[i + cols]);
          const b = Math.abs(curlField[i - cols]);
          let fx = (t - b) * 0.5;
          let fy = (r - l) * 0.5;
          const len = Math.sqrt(fx * fx + fy * fy) + 1.0;
          const c = curlField[i];
          fx = (fx / len) * curl * c;
          fy = -((fy / len) * curl * c);
          vx[i] += fx * DT;
          vy[i] += fy * DT;
        }
      }

      // divergence
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          divField[i] =
            0.5 * (vx[i + 1] - vx[i - 1] + vy[i + cols] - vy[i - cols]);
        }
      }

      // pressure: carry over from last frame (dt-scaled decay), then solve
      const pressureRetain = Math.pow(pressure, dt * 60);
      for (let i = 0; i < cols * rows; i++) pressureA[i] *= pressureRetain;
      for (let iter = 0; iter < pressureIterations; iter++) {
        for (let y = 1; y < rows - 1; y++) {
          for (let x = 1; x < cols - 1; x++) {
            const i = y * cols + x;
            pressureB[i] =
              (pressureA[i - 1] +
                pressureA[i + 1] +
                pressureA[i - cols] +
                pressureA[i + cols] -
                divField[i]) *
              0.25;
          }
        }
        const tmp = pressureA;
        pressureA = pressureB;
        pressureB = tmp;
      }

      // subtract the pressure gradient to make the flow divergence-free
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          vx[i] -= pressureA[i + 1] - pressureA[i - 1];
          vy[i] -= pressureA[i + cols] - pressureA[i - cols];
        }
      }

      // self-advect velocity (semi-Lagrangian)
      const velRetain = Math.pow(velocityDissipation, dt * 60);
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const bx = x - vx[i] * DT;
          const by = y - vy[i] * DT;
          vxNext[i] = sample(vx, bx, by) * velRetain;
          vyNext[i] = sample(vy, bx, by) * velRetain;
        }
      }
      let tmp = vx;
      vx = vxNext;
      vxNext = tmp;
      tmp = vy;
      vy = vyNext;
      vyNext = tmp;

      // advect the dye/trail field by the (now-updated) velocity
      let energy = 0;
      const dyeRetain = Math.pow(densityDissipation, dt * 60);
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const bx = x - vx[i] * DT;
          const by = y - vy[i] * DT;
          const ndx = sample(dyeX, bx, by) * dyeRetain;
          const ndy = sample(dyeY, bx, by) * dyeRetain;
          dyeXNext[i] = ndx;
          dyeYNext[i] = ndy;
          energy += Math.abs(ndx) + Math.abs(ndy);
        }
      }
      tmp = dyeX;
      dyeX = dyeXNext;
      dyeXNext = tmp;
      tmp = dyeY;
      dyeY = dyeYNext;
      dyeYNext = tmp;

      // ease the visual strength toward 1 while there's real energy, and
      // back toward 0 as it dies out -- smooths the start/end instead of
      // popping the displacement on and off
      const target = energy > 0.05 ? 1 : 0;
      intensity +=
        (target - intensity) * (target > intensity ? attack : release);
      if (intensity < 0.001) intensity = 0;
      displaceRef.current?.setAttribute("scale", String(scale * intensity));

      const data = imageData.data;
      for (let i = 0; i < cols * rows; i++) {
        const o = i * 4;
        data[o] = Math.max(0, Math.min(255, 128 + dyeX[i] * 4));
        data[o + 1] = Math.max(0, Math.min(255, 128 + dyeY[i] * 4));
        data[o + 2] = 128;
        data[o + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      feImage.setAttribute("href", canvas.toDataURL());

      if (energy < 0.05 && intensity === 0) {
        idle = true;
        vx.fill(0);
        vy.fill(0);
        dyeX.fill(0);
        dyeY.fill(0);
        pressureA.fill(0);
        pressureB.fill(0);
      }
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      wrapper.removeEventListener("pointercancel", onPointerLeave);
      motionQuery.removeEventListener("change", onMotionChange);
      intersection.disconnect();
      resizeObserver.disconnect();
    };
  }, [
    resolution,
    densityDissipation,
    velocityDissipation,
    pressure,
    pressureIterations,
    curl,
    radius,
    force,
    scale,
    attack,
    release,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", filter: `url(#${filterId})`, ...style }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              ref={feImageRef}
              result="rippleMap"
              preserveAspectRatio="none"
              x="0"
              y="0"
              width="100%"
              height="100%"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="rippleMap"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}

export default WaterWarp;

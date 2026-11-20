// components/PetalImage.jsx
"use client";

import { useId } from "react";

// Outer contour ONLY (first subpath of logo_outline.svg) — this is the
// solid closed shape. The original file has a second inset subpath too,
// which turns it into a hollow ring when both are used together — that's
// what was causing the empty "inner box". Don't add that second subpath back
// unless you specifically want the double-line ring look.
const OUTER_PATH =
  "M240.347 547.375C218.831 518.829 193.752 490.582 177.288 476.366C170.738 470.708 161.866 463.771 151.548 456.241C137.935 446.3 128.749 438.104 121.423 429.357C115.533 422.331 112.614 417.664 106.227 405.069C87.0742 367.336 68.5557 341.113 42.9 315.409C29.763 302.252 16.5265 291.073 2.90754 281.629C1.09446 280.376 -0.199843 279.191 0.0254812 278.992C0.250805 278.792 3.61495 276.323 7.50833 273.496C20.9177 263.769 30.329 255.689 42.9052 243.11C68.1155 217.877 87.5354 190.427 105.598 154.466C112.174 141.378 115.151 136.554 120.794 129.821C128.911 120.141 138.354 111.762 153.906 100.452C171.487 87.6625 181.354 79.3094 193.045 67.312C200.926 59.2263 233.54 20.1509 243.177 7.25159C250.172 -2.11876 250.047 -2.09778 255.601 5.52644C263.901 16.9313 285.936 43.9149 297.674 57.0659C310.014 70.8881 324.687 84.3328 339.034 94.9668C357.621 108.742 362.903 112.989 370.291 120.094C380.714 130.11 385.063 136.271 394.003 153.674C409.802 184.428 421.985 203.132 440.797 225.517C447.839 233.902 465.923 252.003 474.443 259.202C480.035 263.927 495.556 275.898 499.444 278.478C500.602 279.249 500.481 279.369 493.79 284.204C463.827 305.839 438.171 332.655 417.63 363.812C408.764 377.257 402.947 387.435 391.021 410.355C388.197 415.787 384.466 422.016 382.239 425.036C374.761 435.151 361.897 446.787 343.106 460.42C327.71 471.595 314.227 483.162 305.235 492.91C300.184 498.395 271.594 532.158 265.253 540.133C263.073 542.871 259.337 547.831 256.948 551.145C252.614 557.165 250.953 558.979 249.748 559C249.397 559.005 245.168 553.777 240.347 547.375Z";

export default function PetalImage({ src, alt, size = 420, className = "" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox="0 0 500 559"
      width={size}
      height={(size * 559) / 500}
      className={`shrink-0 ${className}`}
    >
      <defs>
        <clipPath id={`petal-clip-${uid}`}>
          <path d={OUTER_PATH} />
        </clipPath>
      </defs>

      <image
        href={src}
        x="0"
        y="0"
        width="500"
        height="559"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#petal-clip-${uid})`}
      />

      <path
        d={OUTER_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        className="text-neutral-800/60"
      />
    </svg>
  );
}

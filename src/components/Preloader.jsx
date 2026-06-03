"use client";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ isLoading, setIsLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.3, ease: "easeOut" }}
          className="w-full h-screen flex items-center justify-center fixed inset-0 z-50"
        >
          <motion.img
            src="/logo-black.png"
            alt="Loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            onAnimationComplete={() => {
              // This triggers when logo finishes appearing
              setTimeout(() => {
                setIsLoading(false);
              }, 500); // Small delay before exit animation
            }}
            className="w-64 h-auto object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

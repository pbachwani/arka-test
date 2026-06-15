"use client";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ isLoading, setIsLoading, onExit }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.3, ease: "easeOut" }}
          onAnimationComplete={() => {
            onExit?.();
          }}
          className="w-full h-screen flex items-center justify-center fixed inset-0 z-50 bg-background"
        >
          <motion.img
            src="/logo-black.png"
            alt="Loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            }}
            className="w-64 h-auto object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

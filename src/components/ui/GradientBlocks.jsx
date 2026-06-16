"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const GradientBlocks = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const blocks = [
    {
      id: 1,
      title: "VATTA",
      description:
        "Create stunning visual experiences that captivate and engage your audience with beautiful, intuitive interfaces.",
      cta: "Learn More",
      gradient: "from-[#0E126C] to-[#CE3E26] from-[80%] to-[100%]",
      color: "bg-[#0E126C]",
    },
    {
      id: 2,
      title: "PITTA",
      description:
        "Build robust and scalable solutions with cutting-edge technology and best practices for modern web applications.",
      cta: "Learn More",
      gradient: "from-[#CE3E26] to-[#CE3E26]",
      color: "bg-[#CE3E26]",
    },
    {
      id: 3,
      title: "KAPHA",
      description:
        "Transform your vision into reality with strategic planning and innovative approaches that drive measurable results.",
      cta: "Learn More",
      gradient: "from-[#CE3E26] to-[#0D4424] from-[10%] to-[30%]",
      color: "bg-[#0D4424]",
    },
  ];

  const handleBlockClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Desktop View */}
      <div className="hidden md:flex w-full max-w-6xl h-96 gap-0 rounded-2xl overflow-hidden shadow-2xl">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            layout
            onClick={() => handleBlockClick(index)}
            onHoverStart={() => handleBlockClick(index)}
            className={`relative bg-linear-to-r ${block.gradient} cursor-pointer overflow-hidden group`}
            initial={{ flex: 1 }}
            animate={{
              flex: expandedIndex === index ? 2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            onMouseEnter={() => !expandedIndex && setExpandedIndex(index)}
            onMouseLeave={() => setExpandedIndex(null)}
          >
            {/* Background overlay */}
            {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" /> */}

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
              {/* Title - Always visible */}
              <motion.h3
                className="text-2xl md:text-3xl font-bold"
                animate={{ y: expandedIndex === index ? -10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {block.title}
              </motion.h3>

              {/* Expandable content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-sm md:text-base leading-relaxed opacity-90">
                      {block.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors w-fit"
                    >
                      {block.cta}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full max-w-2xl space-y-8">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            className={`${block.color} rounded-xl overflow-hidden shadow-lg`}
          >
            {/* Header - Always visible */}
            <button
              onClick={() => handleBlockClick(index)}
              className="w-full text-left p-4 text-white font-bold text-lg md:text-xl flex justify-between items-center  transition-colors"
            >
              {block.title}
              <motion.span
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                arrow
              </motion.span>
            </button>

            {/* Expandable content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {block.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors w-full"
                    >
                      {block.cta}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GradientBlocks;

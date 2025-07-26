"use client";
import { motion } from "framer-motion";
import React from "react";
import useParallax from "@/hooks/use-parallax";

// Config: Define shapes with position, size, and gradients
const shapes = [
  {
    id: 1,
    size: "w-12 h-12",
    position: "top-[10%] left-[15%]",
    gradient: "bg-gradient-to-r from-pink-400 via-red-400 to-yellow-300",
  },
  {
    id: 2,
    size: "w-16 h-16",
    position: "top-[30%] right-[20%]",
    gradient: "bg-gradient-to-r from-purple-500 to-indigo-400",
  },
  {
    id: 3,
    size: "size-64",
    position: "bottom-[20%] left-[10%]",
    gradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
  },
  {
    id: 4,
    size: "size-48",
    position: "bottom-[10%] right-[10%]",
    gradient: "bg-gradient-to-r from-green-300 to-emerald-500",
  },
];

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0], // Float up and down
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const FloatingShapes = () => {
  const parallax = useParallax();
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          className={`absolute ${shape.size} ${shape.position} ${shape.gradient} opacity-50 blur-xl rounded-full animate-pulse`}
          style={{
            transform: `translateY(${parallax * 0.5}px) rotate(${parallax * 0.1}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;

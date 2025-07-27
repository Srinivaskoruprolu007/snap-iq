"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(true);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-16">
          {/* Text Content - appears first */}
          <motion.div
            className="w-full text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Transform Your Images with AI-Powered Magic
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-10 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              SnapIQ combines cutting-edge AI with intuitive design to help you
              create stunning visuals in seconds, not hours.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8 py-6 text-lg font-medium"
                >
                  Start Creating
                </Button>
              </Link>

              <Button
                variant="glass"
                size="lg"
                className="px-8 py-6 text-lg font-medium"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Demo Card - appears after text */}
          <motion.div
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: textVisible ? 1 : 0.8,
              y: textVisible ? 0 : 10,
            }}
            transition={{ duration: 0.8, delay: 1 }}
            onMouseEnter={() => setTextVisible(false)}
            onMouseLeave={() => setTextVisible(true)}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 min-h-96">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm">SnapIQ Editor</div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: "✂️", label: "Crop" },
                    { icon: "📐", label: "Resize" },
                    { icon: "🎨", label: "Adjust" },
                    { icon: "🤖", label: "AI Tools" },
                  ].map((tool, index) => (
                    <motion.div
                      key={index}
                      className="backdrop-blur-lg bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer"
                      title={tool.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-1">{tool.icon}</div>
                      <div className="text-xs text-gray-400">{tool.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="w-full h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center">
                    <motion.div
                      className="text-white font-bold"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                      }}
                    >
                      Your Canvas
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;

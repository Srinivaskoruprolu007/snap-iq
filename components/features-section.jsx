"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const FeatureSection = () => {
  const features = [
    {
      icon: "✨",
      title: "AI-Powered Enhancements",
      description: "Automatically improve image quality with our advanced AI algorithms that adjust lighting, colors, and sharpness."
    },
    {
      icon: "✂️",
      title: "Smart Cropping",
      description: "Let AI suggest perfect crops based on composition rules or automatically remove backgrounds with one click."
    },
    {
      icon: "🎨",
      title: "Style Transfer",
      description: "Transform your photos into artwork by applying styles from famous paintings or custom design presets."
    },
    {
      icon: "⚡",
      title: "Batch Processing",
      description: "Edit hundreds of images at once with our lightning-fast batch processing tools powered by AI."
    },
    {
      icon: "🔍",
      title: "Object Recognition",
      description: "Our AI automatically identifies objects in your images for smart tagging and organization."
    },
    {
      icon: "🤖",
      title: "Auto Corrections",
      description: "Fix common photo issues like red-eye, blemishes, and distortions automatically with AI."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            AI-Powered Editing Features
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Transform your images with our cutting-edge AI tools designed for both professionals and beginners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default FeatureSection;
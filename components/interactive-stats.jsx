"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const InteractiveStats = () => {
  const stats = [
    { id: 1, value: 50000, label: "Images Processed", suffix: "+" },
    { id: 2, value: 250000, label: "Active Users", suffix: "+" },
    { id: 3, value: 100000, label: "Transformations", suffix: "+" },
    { id: 4, value: 98, label: "User Satisfaction", suffix: "%" },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label, suffix }) => {
  const [count, setCount] = useState(0);
  const duration = 2; // seconds
  const steps = 60; // frames per second
  const increment = value / (duration * steps);

  useEffect(() => {
    let currentCount = 0;
    let animationFrameId;

    const animate = () => {
      currentCount += increment;
      if (currentCount < value) {
        setCount(Math.floor(currentCount));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    // Start animation when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${value}`);
    if (element) observer.observe(element);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (element) observer.unobserve(element);
    };
  }, [value, increment]);

  return (
    <motion.div
      id={`stat-${value}`}
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold mb-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {new Intl.NumberFormat().format(count)}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          {suffix}
        </span>
      </div>
      <div className="text-sm sm:text-base text-gray-300">{label}</div>
    </motion.div>
  );
};

export default InteractiveStats;

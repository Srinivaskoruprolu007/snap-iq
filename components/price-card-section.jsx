"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";

const PricingCard = ({
  id,
  plan,
  price,
  features,
  featured = false,
  planId,
  buttonText,
  delay = 0,
}) => {
  const { has } = useAuth();
  const isCurrentPlan = id ? has?.({ plan: id }) : false;

  const handlePopup = async () => {
    if (isCurrentPlan) return;

    try {
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId: planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: featured ? 1.05 : 1.03 }}
      className={`relative h-full ${featured ? "z-10" : "z-0"}`}
    >
      {featured && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
            Most Popular
          </div>
        </div>
      )}

      <div
        className={`h-full flex flex-col backdrop-blur-lg border rounded-3xl p-8 transition-all duration-300 ${
          featured
            ? "bg-gradient-to-b from-blue-500/20 to-purple-600/20 border-blue-400/50 shadow-lg shadow-purple-500/20"
            : "bg-white/5 border-white/10 hover:border-white/20"
        }`}
      >
        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-bold mb-2 ${
              featured
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                : "text-white"
            }`}
          >
            {plan}
          </h3>
          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            ${price}
            {price > 0 && <span className="text-lg text-gray-400">/month</span>}
          </div>
        </div>

        <ul className="flex-1 space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={featured ? "primary" : "glass"}
          size="xl"
          className="w-full mt-auto"
          onClick={handlePopup}
          disabled={isCurrentPlan || !planId}
        >
          {isCurrentPlan ? "Current Plan" : buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const plans = [
    {
      id: "free_user",
      plan: "Free",
      price: 0,
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize",
        "Color adjustments",
        "Text Tool",
      ],
      buttonText: "Get Started Free",
    },
    {
      id: "pro",
      plan: "Pro",
      price: 9,
      features: [
        "Unlimited projects",
        "Unlimited exports",
        "All Editing Tools",
        "AI Background Remover",
        "AI Image Extender",
        "AI Retouch, Upscaler and more",
      ],
      featured: true,
      planId: "cplan_30Se5v8VJ49QeyIUf4NHSrG13M0",
      buttonText: "Upgrade to Pro",
    },
    {
      id: "premium",
      plan: "Premium",
      price: 29,
      features: [
        "All Pro features plus:",
        "4K resolution exports",
        "Custom AI model training",
        "Commercial license",
        "24/7 priority support",
      ],
      planId: "cplan_30SeUXRbylsM3ns9VCS5GrTK4SI",
      buttonText: "Get Premium",
    },
  ];

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Simple{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade when you need more power. No hidden fees,
            cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              delay={index * 0.1} // Staggered animation
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

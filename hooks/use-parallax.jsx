"use client";
import { useEffect, useState } from "react";

const useParallax = () => {
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const handleMouse = () => setParallax(window.scrollY);
    window.addEventListener("scroll", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleMouse);
    };
  }, []);
  return parallax;
};

export default useParallax;

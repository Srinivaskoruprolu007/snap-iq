"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50
                 bg-white/10 backdrop-blur-xl 
                 border border-white/30
                 rounded-full px-6 py-3 
                 shadow-md hover:shadow-xl 
                 hover:scale-105 transition-all 
                 duration-300 ease-in-out"
    >
      <div className="flex items-center space-x-8 justify-around gap-8">
        <Link href={"/"} className="flex items-center space-x-2">
          <Image
            src="/favicon.png"
            width={40}
            height={40}
            alt="SnapIQ logo"
            className="rounded-full"
          />
        </Link>
        {pathname === "/" && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={"/"}
              className="text-white font-semibold text-lg drop-shadow-[0_1px_3px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Features
            </Link>
            <Link
              href={"/about"}
              className="text-white font-semibold text-lg drop-shadow-[0_1px_3px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Pricing
            </Link>
            <Link
              href={"/contact"}
              className="text-white font-semibold text-lg drop-shadow-[0_1px_3px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

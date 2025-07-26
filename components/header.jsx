"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { PersonIcon, EnterIcon } from "@radix-ui/react-icons";
import useStoreUser from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";

const Header = () => {
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useStoreUser();
  if (pathname.includes("/editor")) {
    return null;
  }
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl"
    >
      <div className="bg-white/5 backdrop-blur-2xl rounded-full px-3 py-1.5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/favicon.png"
              width={50}
              height={25}
              alt="SnapIQ logo"
              className="rounded-full hover:opacity-80 transition-all duration-300"
            />
          </Link>

          {pathname === "/" && (
            <nav className="hidden md:flex items-center gap-10">
              {["Features", "Pricing", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  href={item === "Features" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white/80 font-medium text-base hover:text-white transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-white/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>
          )}

          <Unauthenticated>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <Button
                  variant="secondary"
                  className="rounded-full flex items-center gap-2"
                >
                  <EnterIcon className="h-4 w-4" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="primary"
                  className="rounded-full flex items-center gap-2"
                >
                  <PersonIcon className="h-4 w-4" />
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </Unauthenticated>
          <Authenticated>
            <div className="flex items-center gap-4">
              <Button className="backdrop-blur-xl size-14 rounded-full">
                <UserButton />
              </Button>
            </div>
          </Authenticated>
        </div>
        {isLoading && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
            <BarLoader width={"90%"} color="#ffa6f1" className="rounded-3xl" />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

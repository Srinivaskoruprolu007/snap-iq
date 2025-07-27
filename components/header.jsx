"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { PersonIcon, EnterIcon, DashboardIcon } from "@radix-ui/react-icons";
import useStoreUser from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";

const Header = () => {
  const pathname = usePathname();
  const { isLoading } = useStoreUser();

  if (pathname.includes("/editor")) return null;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl rounded-full transition-all duration-300 hover:bg-white/20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/favicon.png"
            alt="SnapIQ logo"
            width={42}
            height={42}
            className="rounded-full hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* Navigation */}
        {pathname === "/" && (
          <nav className="hidden md:flex items-center gap-10">
            {["Features", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Features" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-white/80 hover:text-white font-medium text-base transition-colors duration-300 group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>
        )}

        {/* Authenticated / Unauthenticated */}
        <div className="flex items-center gap-4">
          <Unauthenticated>
            <SignInButton mode="modal">
              <Button
                variant="secondary"
                className="rounded-full gap-2 px-4 py-2"
              >
                <EnterIcon className="size-4" />
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className="rounded-full gap-2 px-4 py-2"
              >
                <PersonIcon className="size-4" />
                Sign Up
              </Button>
            </SignUpButton>
          </Unauthenticated>

          <Authenticated>
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="hidden md:flex items-center justify-center rounded-xl size-10 hover:bg-secondary/30 transition"
                >
                  <DashboardIcon className="size-5" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                className="rounded-full size-10 p-0 backdrop-blur-md hover:bg-white/20 transition"
              >
                <UserButton
                  appearance={{
                    elements: {
                      userButton: {
                        width: "100%",
                        height: "100%",
                      },
                      userButtonAvatar: {
                        width: "100%",
                        height: "100%",
                      },
                    },
                  }}
                />
              </Button>
            </div>
          </Authenticated>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
          <BarLoader
            width="90%"
            color="rgb(var(--accent))"
            className="rounded-3xl"
          />
        </div>
      )}
    </motion.header>
  );
};

export default Header;

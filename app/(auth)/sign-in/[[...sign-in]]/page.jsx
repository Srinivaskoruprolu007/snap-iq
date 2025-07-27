import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground z-[9999]">
      <SignIn />
    </div>
  );
};

export default SignInPage;

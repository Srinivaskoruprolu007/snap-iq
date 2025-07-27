import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground z-[9999]">
      <SignUp />
    </div>
  );
};

export default SignUpPage;

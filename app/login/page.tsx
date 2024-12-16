'use client'
import { LoginForm } from "@/components/ui/login-form";
import React from "react";

export default function Login() {
  const handleGoogleSignup = () => {
    // Redirect the user to the /google route on your backend
    const googleSignupUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    window.location.href = `${googleSignupUrl}/api/auth/google`;
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h2 className="lg:text-3xl lg:w-4/6 text-center mx-auto font-bold mb-8">
          Welcome, Log into your account
        </h2>
        <LoginForm />

        {/* added the google social auth button */}
        <button
          onClick={handleGoogleSignup}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          signIn with google
      </button>
      </div>
    </div>
  );
}

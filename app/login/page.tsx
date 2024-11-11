import { LoginForm } from "@/components/ui/login-form";
import React from "react";

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h2 className="lg:text-3xl lg:w-4/6 text-center mx-auto font-bold mb-8">
          Welcome, Log into your account
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

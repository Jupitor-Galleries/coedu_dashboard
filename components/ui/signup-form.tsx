"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const response = await fetch(`${backend_url}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: (e.target as any).name.value,
        email: (e.target as any).email.value,
        password,
      }),
    });
    if (response.ok) {
      toast.success("Registration successful");
    } else {
      const errorData = await response.json()
      console.log(errorData);
      toast.error(errorData.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-[#667085] text-center font-medium">
            It is our great pleasure to have you on board!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full mb-4 flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            <FcGoogle className="mr-2" />
            Sign up with Google
          </Button>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Input id="name" type="text" placeholder="Enter your name" />
              <Input id="email" type="email" placeholder="Enter your email" />
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  className="absolute inset-y-0 right-0 px-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

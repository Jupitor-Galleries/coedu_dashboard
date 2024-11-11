"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";

export function SignupForm() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    length: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle form submission
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordRequirements({
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      length: value.length >= 8,
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-[#667085] text-center font-medium">
          It is our great pleasure to have you on board!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {step === 1 && (
              <>
                <Input
                  id="admin"
                  type="text"
                  placeholder="Enter the name of admin"
                />
                <Input
                  id="school"
                  type="text"
                  placeholder="Enter the name of school"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter the school email"
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
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
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    Password requirements:
                  </p>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center text-sm ${
                        passwordRequirements.uppercase
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordRequirements.uppercase ? (
                        <IoCheckmark className="h-5 w-5 mr-2 fill-current" />
                      ) : (
                        <LiaTimesSolid className="h-5 w-5 mr-2 fill-current" />
                      )}
                      At least one uppercase letter
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        passwordRequirements.lowercase
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordRequirements.lowercase ? (
                        <IoCheckmark className="h-5 w-5 mr-2 fill-current" />
                      ) : (
                        <LiaTimesSolid className="h-5 w-5 mr-2 fill-current" />
                      )}
                      At least one lowercase letter
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        passwordRequirements.number
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordRequirements.number ? (
                        <IoCheckmark className="h-5 w-5 mr-2 fill-current" />
                      ) : (
                        <LiaTimesSolid className="h-5 w-5 mr-2 fill-current" />
                      )}
                      At least one number
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        passwordRequirements.length
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {passwordRequirements.length ? (
                        <IoCheckmark className="h-5 w-5 mr-2 fill-current" />
                      ) : (
                        <LiaTimesSolid className="h-5 w-5 mr-2 fill-current" />
                      )}
                      At least 8 characters
                    </div>
                  </div>
                </div>
              </>
            )}
            <Button type="submit" className="w-full">
              {step === 1 ? "Continue" : "Sign Up"}
            </Button>
          </div>
        </form>
        {step === 1 && (
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

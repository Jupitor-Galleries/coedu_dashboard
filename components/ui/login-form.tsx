"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from 'next/navigation';

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('success') === 'true';
    
    if (status) {
      // save token and navigate to the dashboard
      const token = searchParams.get('token');
      if (token) {
        localStorage.setItem('coEdu_jwt', token);
        // navigate to the dashboard
        alert("success, we are navigating you to the dashboard");
        router.push('/organization');
      } else {
        console.error('No token found!');
        alert("error while logging in");
      }
    } else {
      // show error message
      const message = searchParams.get('message');
      if (message) {
        alert(message);
      }
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    // Redirect the user to the /google route on your backend
    const googleLoginUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    window.location.href = `${googleLoginUrl}/api/auth/google`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const response = await fetch(`${backend_url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        password,
      }),
    });
    setLoading(false);
    if (response.ok) {
      console.log(response);
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('coEdu_jwt', token);
      toast.success("Login successful");
      router.push('/organization');
    } else {
      const errorData = await response.json();
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
          <Button onClick={handleGoogleLogin} className="w-full mb-4 flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            <FcGoogle className="mr-2" />
            {loading ? "Loading..." : "Sign in with Google"}
          </Button>
          <h4 className="text-gray-300 text-center pb-2">- OR -</h4>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

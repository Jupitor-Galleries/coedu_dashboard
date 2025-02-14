import { LoginForm } from "@/components/ui/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h2 className="lg:text-3xl lg:w-4/6 text-center mx-auto font-bold mb-8">Welcome, login to your account </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

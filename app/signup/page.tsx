import { SignupForm } from "@/components/ui/signup-form";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h2 className="lg:text-3xl lg:w-4/6 text-center mx-auto font-bold mb-8">Welcome, create your organizations account</h2>
        <SignupForm />
      </div>
    </div>
  );
}

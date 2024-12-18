'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { SignupForm } from "@/components/ui/signup-form";
import { useRouter } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const message = searchParams.get('message')

  const router = useRouter()

  useEffect(() => {
    const status = searchParams.get('success') === 'true';
    
    if (status) {
      // save token and navigate to the dashboard
      const token = searchParams.get('token');
      if (token) {
        localStorage.setItem('coEdu_jwt', token);
        // navigate to the dashboard
        alert("success, we are navigating you to the dashboard")
        router.push('/dashboard')
      } else {
        console.error('No token found!');
        alert("error while signing up")
      }
    }else{
      // show error message
      const message = searchParams.get('message');
      if (message){
        alert(message)
      }
    }
  }, [searchParams]);
  const handleGoogleSignup = () => {
    // Redirect the user to the /google route on your backend
    const googleSignupUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    window.location.href = `${googleSignupUrl}/api/auth/google`;
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <h2 className="lg:text-3xl lg:w-4/6 text-center mx-auto font-bold mb-8">Welcome, create your organizations account</h2>
        <SignupForm />
        <button
          onClick={handleGoogleSignup}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Signup with Google
      </button>
      </div>

    </div>
  );
}

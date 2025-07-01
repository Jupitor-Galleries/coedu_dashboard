"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingHeader from '@/components/LandingHeader';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LandingFooter from '@/components/LandingFooter';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const token = localStorage.getItem("coEdu_jwt");

      // if (!token) {
      //   // router.push("/login");
      //   return;
      // }

      try {
        // Validate token
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        // Token is valid, check for classId
        const classId = localStorage.getItem("classId");

        if (!classId) {
          router.push("/organization");
          return;
        }

        // Fetch class details
        const classResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/${classId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!classResponse.ok) {
          throw new Error("Failed to fetch class details");
        }

        const classDetails = await classResponse.json();
        const organizationId = classDetails.class.organization;

        if (organizationId) {
          router.push(`/dashboard?organizationId=${organizationId}&classId=${classId}`);
        } else {
          router.push("/organization");
        }
      } catch (error: unknown) {
        console.error("Error:", error);
        localStorage.removeItem("coEdu_jwt");
        localStorage.removeItem("classId");
        // router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5FF]">
      <LandingHeader />
      <main className="flex-1 flex flex-col gap-0">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default HomePage;

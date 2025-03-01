import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ClassContextType {
  classId: string | null;
  setClassId: (id: string | null) => void;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider = ({ children }: { children: React.ReactNode }) => {
  const [classId, setClassId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndClass = async () => {
      const token = localStorage.getItem("coEdu_jwt");

      if (!token) {
        // No token? Log out and go to /login
        localStorage.removeItem("classId");
        router.push("/login");
        return;
      }

      try {
        // Validate token with backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate-token`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
           },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        // Token is valid, check for classId
        const storedClassId = localStorage.getItem("classId");
        if (storedClassId) {
          setClassId(storedClassId);
        } else {
          router.push("/organization"); // No classId? Go to /organization
        }
      } catch (error) {
        console.error("Auth validation failed:", error);
        localStorage.removeItem("coEdu_jwt");
        localStorage.removeItem("classId");
        router.push("/login"); // Invalid token? Log out.
      }
    };

    checkAuthAndClass();
  }, []);

  useEffect(() => {
    if (classId) {
      localStorage.setItem("classId", classId);
    }
  }, [classId]);

  return (
    <ClassContext.Provider value={{ classId, setClassId }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error("useClass must be used within a ClassProvider");
  }
  return context;
};

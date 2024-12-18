'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../functions'; 

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/login');
  }, [router]);

  return "loading........"; // or a loading spinner if you prefer
}
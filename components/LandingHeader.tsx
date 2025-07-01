import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const LandingHeader: React.FC = () => (
  <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-gray-200">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.svg" alt="CoEdu Logo" width={40} height={40} />
        <span className="font-bold text-xl text-blue-900 tracking-tight">COEDU</span>
      </Link>
      <nav className="hidden md:flex gap-8">
        {navLinks.map(link => (
          <Link key={link.label} href={link.href} className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex gap-2">
        <Link href="/login"><Button variant="outline">Login</Button></Link>
        <Link href="/signup"><Button>Sign up</Button></Link>
      </div>
    </div>
  </header>
);

export default LandingHeader; 
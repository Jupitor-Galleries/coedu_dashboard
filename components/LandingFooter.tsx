import Link from 'next/link';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact', href: '#waitlist' },
];

const LandingFooter: React.FC = () => (
  <footer className="w-full bg-[#F1F5FF] border-t border-gray-200 py-6 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
      <div className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} CoEdu. All rights reserved.</div>
      <div className="flex gap-6">
        {footerLinks.map(link => (
          <Link key={link.label} href={link.href} className="text-gray-600 hover:text-blue-800 text-sm transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default LandingFooter;

import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import ContactSection from '@/components/ContactSection';

const ContactPage = () => (
  <div className="min-h-screen flex flex-col bg-[#F1F5FF]">
    <LandingHeader />
    <main className="flex-1 flex flex-col">
      <ContactSection />
    </main>
    <LandingFooter />
  </div>
);

export default ContactPage; 
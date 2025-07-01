import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import AboutPage from '@/components/AboutPage';

const About = () => (
  <div className="min-h-screen flex flex-col bg-[#F1F5FF]">
    <LandingHeader />
    <main className="flex-1 flex flex-col">
      <AboutPage />
    </main>
    <LandingFooter />
  </div>
);

export default About; 
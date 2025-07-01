import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import FeaturesPage from '@/components/FeaturesPage';

const Features = () => (
  <div className="min-h-screen flex flex-col bg-[#F1F5FF]">
    <LandingHeader />
    <main className="flex-1 flex flex-col">
      <FeaturesPage />
    </main>
    <LandingFooter />
  </div>
);

export default Features; 
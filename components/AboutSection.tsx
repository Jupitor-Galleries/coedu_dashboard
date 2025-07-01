import Image from 'next/image';

const AboutSection: React.FC = () => (
  <section className="py-16 px-4 md:px-24 bg-white flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">What is CoEdu?</h2>
      <p className="text-lg text-gray-700 mb-4">
        CoEdu is a powerful content management and distribution platform designed to streamline the delivery of educational materials. Ideal for EdTech companies, NGOs, and institutions serving remote learners, CoEdu makes it easy to manage, distribute, and track educational content across multiple social media platforms.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>Centralized content management for all your learning materials</li>
        <li>Automated delivery to WhatsApp, Telegram, and more</li>
        <li>Real-time analytics and engagement tracking</li>
        <li>Easy onboarding for organizations and instructors</li>
      </ul>
    </div>
    <div className="flex-1 flex justify-center">
      <Image src="/images/logo.svg" alt="About CoEdu" width={350} height={350} className="rounded-2xl shadow-xl bg-[#F1F5FF] p-8" />
    </div>
  </section>
);

export default AboutSection; 
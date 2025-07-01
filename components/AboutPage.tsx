import Image from 'next/image';

const AboutPage: React.FC = () => (
  <section className="py-16 px-4 md:px-24 bg-white flex flex-col md:flex-row items-center gap-12 min-h-[60vh]">
    <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">About CoEdu</h2>
      <p className="text-lg text-gray-700 mb-4">
        CoEdu is your assistant for student engagement across all your content sources. Whether you create content on our platform or share materials via Google Drive or any storage, CoEdu enables students to engage, ask questions, and interact with your educational resources.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Allow students to ask questions and interact with your content</li>
        <li>Support for content from Google Drive or any storage</li>
        <li>Upcoming features: polls, richer engagement tools</li>
        <li>Analytics on student engagement and content performance</li>
      </ul>
      <p className="text-base text-gray-600">
        Think of CoEdu as your digital assistant, helping your students engage with all the data sources you have, while you track and improve their learning experience.
      </p>
    </div>
    <div className="flex-1 flex justify-center">
      <Image src="/images/logo.svg" alt="About CoEdu" width={350} height={350} className="rounded-2xl shadow-xl bg-[#F1F5FF] p-8" />
    </div>
  </section>
);

export default AboutPage; 
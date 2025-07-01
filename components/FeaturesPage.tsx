import Image from 'next/image';

const features = [
  {
    icon: '/whatsapp.png',
    title: 'WhatsApp Delivery',
    desc: 'Send learning content directly to students on their favorite messaging app.'
  },
  {
    icon: '/globe.svg',
    title: 'Global Access',
    desc: 'Reach students anywhere, anytime, with reliable content distribution.'
  },
  {
    icon: '/file.svg',
    title: 'Content from Any Storage',
    desc: 'Share materials from Google Drive or any storage, not just what you create on CoEdu.'
  },
  {
    icon: '/window.svg',
    title: 'Student Engagement',
    desc: 'Students can ask questions and interact with your content.'
  },
  {
    icon: '/window.svg',
    title: 'Upcoming: Polls',
    desc: 'Engage your students with polls and interactive features (coming soon).' 
  },
  {
    icon: '/window.svg',
    title: 'Analytics',
    desc: 'Get insights on student engagement and content performance.'
  },
  {
    icon: '/window.svg',
    title: 'Your Assistant',
    desc: 'CoEdu acts as your assistant, helping students engage with all your data sources.'
  },
];

const FeaturesPage: React.FC = () => (
  <section className="py-16 px-4 md:px-24 bg-[#F1F5FF] min-h-[60vh]">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center p-8 bg-white rounded-xl shadow hover:shadow-xl transition-shadow">
          <Image src={feature.icon} alt={feature.title} width={56} height={56} className="mb-4" />
          <div className="text-xl font-semibold mb-2 text-center">{feature.title}</div>
          <div className="text-gray-600 text-center">{feature.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesPage; 
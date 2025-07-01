import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
];

const FeaturesSection: React.FC = () => (
  <section className="py-10 px-4 md:px-16 bg-[#F1F5FF]">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How CoEdu Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, idx) => (
        <Card key={idx} className="flex flex-col items-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col items-center">
            <Image src={feature.icon} alt={feature.title} width={40} height={40} className="mb-2" />
            <CardTitle className="text-lg text-center">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-gray-600 text-sm">{feature.desc}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default FeaturesSection; 
import Image from 'next/image';

const testimonials = [
  {
    name: 'Elton Chirinda',
    role: 'EdTech Director',
    quote: 'CoEdu has revolutionized how we deliver content to our students. Engagement is at an all-time high!',
    avatar: '/images/logo.svg',
  },
  {
    name: 'Devotion Chikutuva',
    role: 'Proxima Robotics Instructor',
    quote: 'The ability to reach remote learners on WhatsApp is a game changer. Setup was seamless!',
    avatar: '/images/logo.svg',
  },
  {
    name: 'Amina Yusuf',
    role: 'Online Instructor',
    quote: 'I love how easy it is to manage and track my class announcements. Highly recommended!',
    avatar: '/images/logo.svg',
  },
];

const TestimonialsSection: React.FC = () => (
  <section className="py-16 px-4 md:px-24 bg-white">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => (
        <div key={idx} className="bg-[#F1F5FF] rounded-xl shadow p-8 flex flex-col items-center text-center">
          <Image src={t.avatar} alt={t.name} width={64} height={64} className="rounded-full mb-4" />
          <p className="text-lg italic mb-4 text-gray-700">“{t.quote}”</p>
          <div className="font-semibold text-blue-800">{t.name}</div>
          <div className="text-sm text-gray-500">{t.role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection; 
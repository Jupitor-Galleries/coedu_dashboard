'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiMail, FiPhone } from 'react-icons/fi';

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or a service
  };

  return (
    <section className="py-16 px-4 md:px-24 bg-white flex flex-col items-center" id="contact">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Us</h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Have questions or want to learn more? Reach out to us directly or send us a message below.
      </p>
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
        <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-3 text-lg text-gray-700">
            <FiMail className="text-blue-800" />
            <span>coedugh@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-700">
            <FiPhone className="text-blue-800" />
            <span>+233 20 804 7508</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 bg-[#F1F5FF] p-8 rounded-xl shadow">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
          />
          <Button type="submit" className="w-full" disabled={submitted}>
            {submitted ? 'Message Sent!' : 'Send Message'}
          </Button>
          {submitted && <p className="text-green-600 text-center">Thank you for reaching out!</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection; 
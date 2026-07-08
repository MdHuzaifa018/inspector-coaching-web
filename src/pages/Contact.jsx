import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

const contactInfo = [
  { icon: <FaMapMarkerAlt className="text-xl text-blue-500" />, label: 'Address', value: '123 Academy Lane, Police Line Area,\nLucknow, Uttar Pradesh — 226001' },
  { icon: <FaPhone className="text-xl text-blue-500" />, label: 'Phone', value: '+91 8252529139' },
  { icon: <FaEnvelope className="text-xl text-blue-500" />, label: 'Email', value: 'info@inspectorsacademy.com\nadmin@inspectorsacademy.com' },
  { icon: <FaClock className="text-xl text-blue-500" />, label: 'Office Hours', value: 'Mon – Sat: 7:00 AM – 8:00 PM\nSunday: 8:00 AM – 2:00 PM' },
];

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/enquiries', { ...data, targetExam: 'General Enquiry' });
      toast.success('Message sent! We will contact you soon.');
      reset();
    } catch {
      toast.error('Failed to send. Please try again.');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-5xl sm:text-6xl font-black text-slate-900 mb-4">Contact Us</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-slate-600 text-lg max-w-xl mx-auto">
            Have a question? Want a free counselling session? Our team is here to help you.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none"><path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#F8FAFC"/></svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Reach Out To Us</h2>
              <div className="space-y-6 mb-8">
                {contactInfo.map((c, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">{c.icon}</div>
                    <div>
                      <div className="font-black text-slate-900 mb-1">{c.label}</div>
                      <div className="text-gray-500 text-sm whitespace-pre-line">{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a href="https://wa.me/918252529139" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-colors shadow-lg"
              >
                <FaWhatsapp className="text-2xl" /> Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-64">
                <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6749413009226!2d80.9461516751535!3d26.846695876745077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" />
              </div>
            </div>

            {/* Contact Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-black text-slate-900 mb-2">Send A Message</h2>
              <p className="text-gray-400 mb-8">We typically respond within 24 hours.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input {...register('name')} placeholder="Rajesh Kumar" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input {...register('phone')} placeholder="+91 98765 43210" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
                  <input {...register('email')} type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                  <textarea {...register('message')} rows={5} placeholder="I want to know more about the Police SI batch..." className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-black text-lg shadow-lg shadow-blue-300/40 hover:scale-[1.02] transition-transform disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

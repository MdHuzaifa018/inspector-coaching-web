import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const MapSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Location</p>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Find Us Here</h2>
        <p className="text-gray-500 text-lg">Visit us in person for a free counselling session. We'd love to meet you!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Info Cards */}
        <div className="flex flex-col gap-6">
          {[
            { icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />, title: 'Address', text: '123 Academy Lane, Police Line Area, Lucknow, Uttar Pradesh — 226001' },
            { icon: <FaPhone className="text-2xl text-blue-500" />, title: 'Contact', text: '+91 98765 43210\n+91 87654 32109' },
            { icon: <FaClock className="text-2xl text-blue-500" />, title: 'Office Hours', text: 'Mon – Sat: 7:00 AM – 8:00 PM\nSunday: 8:00 AM – 2:00 PM' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">{item.icon}</div>
              <div>
                <div className="font-black text-slate-900 mb-1">{item.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{item.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border border-gray-100 min-h-[380px]"
        >
          <iframe
            title="Inspector's Academy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6749413009226!2d80.9461516751535!3d26.846695876745077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '380px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default MapSection;

import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaBookOpen, FaRunning, FaClipboardCheck, FaUsers, FaTrophy } from 'react-icons/fa';

const features = [
  { icon: <FaUserTie className="text-2xl" />, title: 'Trained by Real Officers', desc: 'Learn from officers with active field experience. Real insight, real strategies.', color: 'bg-blue-50 text-blue-600' },
  { icon: <FaBookOpen className="text-2xl" />, title: 'Premium Study Material', desc: 'Handcrafted notes, previous year papers, and weekly test series for all exams.', color: 'bg-indigo-50 text-indigo-600' },
  { icon: <FaRunning className="text-2xl" />, title: 'Physical Training', desc: 'Daily PT sessions with expert trainers to prepare you for physical efficiency tests.', color: 'bg-cyan-50 text-cyan-600' },
  { icon: <FaClipboardCheck className="text-2xl" />, title: 'Regular Mock Tests', desc: 'Exam-pattern mock tests every week with detailed performance analysis.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: <FaUsers className="text-2xl" />, title: 'Small Batch Size', desc: 'Maximum 30 students per batch to ensure every student gets personal attention.', color: 'bg-violet-50 text-violet-600' },
  { icon: <FaTrophy className="text-2xl" />, title: 'Proven Track Record', desc: 'Over 5,000+ selections in police, CRPF, SSC & UPSC in the last 15 years.', color: 'bg-amber-50 text-amber-600' },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

const WhyChooseUs = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Why Us</p>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Why Choose Inspector's Academy?</h2>
        <p className="text-gray-500 text-lg">Everything you need to crack the most competitive exams — under one roof.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-300 cursor-default bg-white"
          >
            <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
            <p className="text-gray-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

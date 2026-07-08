import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaSun, FaMoon, FaUsers } from 'react-icons/fa';
import { batchesAPI } from '../../services/api';

const mockBatches = [
  {
    name: 'Morning Batch',
    time: '6:00 AM – 9:00 AM',
    days: 'Mon – Sat',
    subjects: ['GK & Current Affairs', 'Reasoning', 'Physical Training'],
    seats: 30,
    filled: 24,
    tag: 'Most Popular',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Evening Batch',
    time: '4:00 PM – 7:00 PM',
    days: 'Mon – Sat',
    subjects: ['Mathematics', 'English', 'General Studies'],
    seats: 30,
    filled: 18,
    tag: 'Seats Available',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    name: 'Weekend Crash Batch',
    time: '8:00 AM – 2:00 PM',
    days: 'Sat & Sun Only',
    subjects: ['Full Syllabus Coverage', 'Mock Tests', 'Revision'],
    seats: 20,
    filled: 20,
    tag: 'Full',
    tagColor: 'bg-red-100 text-red-600',
  },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }) };

const getBatchIcon = (name) => {
  if (name.toLowerCase().includes('morning')) {
    return <FaSun className="text-2xl text-amber-500" />;
  }
  if (name.toLowerCase().includes('evening')) {
    return <FaMoon className="text-2xl text-indigo-500" />;
  }
  return <FaClock className="text-2xl text-blue-500" />;
};

const BatchTimings = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await batchesAPI.getAll();
        if (res.data && res.data.success) {
          setBatches(res.data.data.length > 0 ? res.data.data : mockBatches);
        } else {
          setBatches(mockBatches);
        }
      } catch (err) {
        console.error('Error fetching batches:', err);
        setBatches(mockBatches);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Schedule</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Batch Timings</h2>
          <p className="text-gray-500 text-lg">Choose a batch that fits your schedule. All batches include PT, classroom coaching, and test series.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {batches.map((b, i) => {
            const pct = Math.round((b.filled / b.seats) * 100);
            return (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center">
                    {getBatchIcon(b.name)}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${b.tagColor || 'bg-green-100 text-green-700'}`}>{b.tag}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-1">{b.name}</h3>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg mb-1">
                  <FaClock className="text-sm" /> {b.time}
                </div>
                <p className="text-gray-400 text-sm mb-5 font-medium">{b.days}</p>

                <ul className="space-y-2 mb-6">
                  {b.subjects.map((s, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>

                <div className="mb-2 flex justify-between text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><FaUsers /> {b.filled}/{b.seats} Seats Filled</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${pct >= 100 ? 'bg-red-400' : pct >= 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BatchTimings;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { resultsAPI } from '../services/api';

const mockResults = [
  { name: 'Sanjay Yadav', rank: 'AIR 42', exam: 'UPSC CSE', year: '2023', img: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Priya Singh', rank: 'Rank 1', exam: 'UP Police SI', year: '2023', img: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Mohit Kumar', rank: 'AIR 156', exam: 'SSC CGL', year: '2023', img: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Anita Sharma', rank: 'Rank 3', exam: 'Delhi Police HC', year: '2023', img: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Rahul Verma', rank: 'Rank 8', exam: 'CRPF Selection', year: '2023', img: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Deepak Tiwari', rank: 'Rank 2', exam: 'Bihar Police SI', year: '2023', img: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Kavita Rao', rank: 'Rank 5', exam: 'SSC CGL', year: '2022', img: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Amit Singh', rank: 'Rank 12', exam: 'UPSC CSE', year: '2022', img: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Sunita Devi', rank: 'Rank 1', exam: 'UP Police Constable', year: '2022', img: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Vikas Mishra', rank: 'AIR 89', exam: 'State PSC', year: '2022', img: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Rakesh Gupta', rank: 'Rank 4', exam: 'RPF Constable', year: '2021', img: 'https://i.pravatar.cc/150?img=16' },
  { name: 'Neha Pandey', rank: 'Rank 7', exam: 'Delhi Police HC', year: '2021', img: 'https://i.pravatar.cc/150?img=25' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } }) };

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('All');
  const [examFilter, setExamFilter] = useState('All');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await resultsAPI.getAll();
        if (res.data && res.data.success) {
          setResults(res.data.data.length > 0 ? res.data.data : mockResults);
        } else {
          setResults(mockResults);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        setResults(mockResults);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const years = ['All', ...new Set(results.map(r => String(r.year)).sort((a, b) => b - a))];
  const exams = ['All', ...new Set(results.map(r => r.exam))];

  const filtered = results.filter(r =>
    (yearFilter === 'All' || String(r.year) === yearFilter) &&
    (examFilter === 'All' || r.exam === examFilter)
  );

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Our Legacy</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-5xl sm:text-6xl font-black text-slate-900 mb-4">Selection Results</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-slate-600 text-lg max-w-xl mx-auto">
            Thousands of our students are now serving the nation in uniform. Proud of every single one.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none"><path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#F8FAFC"/></svg>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm font-bold text-gray-500 mr-2">Year:</span>
              {years.map(y => (
                <button key={y} onClick={() => setYearFilter(y)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${yearFilter === y ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
                  {y}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm font-bold text-gray-500 mr-2">Exam:</span>
              {exams.map(e => (
                <button key={e} onClick={() => setExamFilter(e)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${examFilter === e ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((r, i) => (
              <motion.div key={r._id || i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <img src={r.img} alt={r.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-50 shadow-md" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shadow-sm border border-amber-200">
                    <FaTrophy className="text-xs" />
                  </div>
                </div>
                <div className="text-2xl font-black text-blue-600">{r.rank}</div>
                <div className="font-black text-slate-900 text-lg leading-tight mt-1">{r.name}</div>
                <div className="text-gray-400 text-sm font-medium">{r.exam}</div>
                <div className="mt-3 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{r.year}</div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400">
                <FaMedal className="text-5xl mx-auto mb-4 opacity-30" />
                <p className="text-lg font-bold">No results found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;

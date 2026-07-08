import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import { resultsAPI } from '../../services/api';

const mockRankers = [
  { name: 'Sanjay Yadav', rank: 'AIR 42', exam: 'UPSC CSE 2023', img: 'https://i.pravatar.cc/200?img=33', badge: 'Gold' },
  { name: 'Priya Singh', rank: 'Rank 1', exam: 'UP Police SI 2023', img: 'https://i.pravatar.cc/200?img=5', badge: 'Gold' },
  { name: 'Mohit Kumar', rank: 'AIR 156', exam: 'SSC CGL 2023', img: 'https://i.pravatar.cc/200?img=11', badge: 'Silver' },
  { name: 'Anita Sharma', rank: 'Rank 3', exam: 'Delhi Police HC 2023', img: 'https://i.pravatar.cc/200?img=9', badge: 'Bronze' },
  { name: 'Rahul Verma', rank: 'Rank 8', exam: 'CRPF Selection 2023', img: 'https://i.pravatar.cc/200?img=12', badge: 'Silver' },
  { name: 'Deepak Tiwari', rank: 'Rank 2', exam: 'Bihar Police SI 2023', img: 'https://i.pravatar.cc/200?img=15', badge: 'Gold' },
];

const badgeMap = {
  Gold: { icon: <FaTrophy />, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
  Silver: { icon: <FaMedal />, color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200' },
  Bronze: { icon: <FaMedal />, color: 'text-orange-400', bg: 'bg-orange-50 border-orange-200' },
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

const TopRankers = () => {
  const [rankers, setRankers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankers = async () => {
      try {
        const res = await resultsAPI.getAll();
        if (res.data && res.data.success) {
          setRankers(res.data.data.length > 0 ? res.data.data : mockRankers);
        } else {
          setRankers(mockRankers);
        }
      } catch (err) {
        console.error('Error fetching rankers:', err);
        setRankers(mockRankers);
      } finally {
        setLoading(false);
      }
    };
    fetchRankers();
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Hall of Fame</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Our Top Rankers</h2>
          <p className="text-gray-500 text-lg">Proud to have trained India's finest officers. Here are some of our top achievers.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rankers.map((r, i) => {
            const badge = badgeMap[r.badge] || badgeMap.Gold;
            return (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className={`bg-white rounded-3xl p-6 border ${badge.bg} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5`}
              >
                <div className="relative flex-shrink-0">
                  <img src={r.img} alt={r.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100 shadow-md" />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 ${badge.color} shadow-sm text-sm`}>
                    {badge.icon}
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-black ${badge.color}`}>{r.rank}</div>
                  <div className="font-black text-slate-900 text-lg leading-tight">{r.name}</div>
                  <div className="text-gray-400 text-sm font-medium mt-1">{r.exam}</div>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(5)].map((_, j) => <FaStar key={j} className="text-amber-400 text-xs" />)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopRankers;

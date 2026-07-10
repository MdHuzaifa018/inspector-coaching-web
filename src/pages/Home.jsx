import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import { CONTACT_CONFIG } from '../config';
import BatchTimings from '../components/sections/BatchTimings';
import AdmissionProcess from '../components/sections/AdmissionProcess';
import TopRankers from '../components/sections/TopRankers';
import Gallery from '../components/sections/Gallery';
import FAQSection from '../components/sections/FAQSection';
import MapSection from '../components/sections/MapSection';
import { FaShieldAlt, FaBookOpen, FaUserGraduate, FaTrophy, FaStar, FaChevronRight, FaQuoteLeft, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import CountUpModule from 'react-countup';
import { coursesAPI, testimonialsAPI } from '../services/api';

const CountUp = CountUpModule.default || CountUpModule;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' } })
};

const mockCourses = [
  { id: 1, title: 'UPSC / State PSC', duration: '12 Months', desc: 'Comprehensive coaching for civil services with weekly test series and personal mentorship.' },
  { id: 2, title: 'SSC CGL Target Batch', duration: '8 Months', desc: 'Focused preparation for SSC CGL Tier I & II with previous year analysis.' },
  { id: 3, title: 'Police Sub-Inspector', duration: '6 Months', desc: 'Physical fitness + written exam coaching for Sub-Inspector post in state police.' },
];

const stats = [
  { value: 5000, label: 'Successful Selections', suffix: '+' },
  { value: 15, label: 'Years of Experience', suffix: '+' },
  { value: 98, label: 'Success Rate', suffix: '%' },
  { value: 50, label: 'Expert Faculty', suffix: '+' },
];

const mockTestimonials = [
  { name: 'Rahul Sharma', text: 'The guidance here is unparalleled. Cleared my SI exam on the very first attempt!', role: 'Sub-Inspector, UP Police', img: 'https://i.pravatar.cc/100?img=11' },
  { name: 'Priya Verma', text: 'Best institute for SSC CGL. The faculty is extremely supportive and result-oriented.', role: 'Income Tax Inspector', img: 'https://i.pravatar.cc/100?img=5' },
  { name: 'Amit Kumar', text: 'Physical training and written exam coaching under one roof. Highly recommended!', role: 'Constable, CRPF', img: 'https://i.pravatar.cc/100?img=12' },
];

const getCourseColor = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('upsc') || t.includes('state')) return 'from-blue-500 to-indigo-600';
  if (t.includes('ssc') || t.includes('cgl')) return 'from-cyan-500 to-blue-500';
  if (t.includes('police') || t.includes('sub-inspector') || t.includes('si')) return 'from-indigo-500 to-purple-600';
  return 'from-blue-500 to-indigo-600';
};

const getCourseIcon = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('upsc') || t.includes('state')) return <FaBookOpen className="text-3xl" />;
  if (t.includes('ssc') || t.includes('cgl')) return <FaTrophy className="text-3xl" />;
  if (t.includes('police') || t.includes('sub-inspector') || t.includes('si')) return <FaShieldAlt className="text-3xl" />;
  return <FaBookOpen className="text-3xl" />;
};

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [coursesRes, testimonialsRes] = await Promise.all([
          coursesAPI.getAll(),
          testimonialsAPI.getAll()
        ]);
        
        if (coursesRes.data && coursesRes.data.success) {
          setCourses(coursesRes.data.data.length > 0 ? coursesRes.data.data : mockCourses);
        } else {
          setCourses(mockCourses);
        }

        if (testimonialsRes.data && testimonialsRes.data.success) {
          setTestimonials(testimonialsRes.data.data.length > 0 ? testimonialsRes.data.data : mockTestimonials);
        } else {
          setTestimonials(mockTestimonials);
        }
      } catch (err) {
        console.error('Error fetching home page API data:', err);
        setCourses(mockCourses);
        setTestimonials(mockTestimonials);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
        {/* Soft premium light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50" />
        
        {/* Designer glow blobs in the background */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-cyan-200/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle decorative dot pattern grid */}
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT – Text Content */}
            <div>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-widest uppercase">
                  Admissions Open — 2026 Batch
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight"
              >
                We Train<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                  Champions
                </span><br />
                In Uniform
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="text-base sm:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed"
              >
                India's most trusted police coaching institute. Learn directly from serving officers with <strong className="text-slate-900 font-extrabold">5,000+ successful selections</strong> in state police, CRPF, SSC & UPSC examinations.
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <button
                  onClick={() => navigate('/admission')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-base sm:text-lg shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.45)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Join Next Batch
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => { const el = document.querySelector('#results'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-300 text-slate-700 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  View Selections
                </button>
              </motion.div>

              {/* Social Proof Section */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={4}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {[11, 5, 12, 14].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="student" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md" />
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400 text-sm gap-0.5">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>
                  <p className="text-slate-600 text-sm font-semibold mt-0.5">5,000+ students selected</p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT – Interactive Premium Image Collage */}
            <div className="relative h-[480px] sm:h-[560px] hidden lg:block">
              {/* Designer decorative background rings */}
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-200/60" />
              <div className="absolute inset-16 rounded-full border border-indigo-100" />

              {/* Founder Image 1 (Main) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute right-0 top-0 w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50 border border-blue-100 group z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                <img
                  src="/founder1.jpg"
                  alt="Founder in uniform"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1594834749740-74b3f696062b?q=80&w=600&auto=format&fit=crop'; }}
                />
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-black rounded-full shadow-md">FOUNDER</span>
                  <p className="text-white font-black text-xl mt-1.5 leading-tight">The Inspector</p>
                </div>
              </motion.div>

              {/* Founder Image 2 (Combat Training) */}
              <motion.div
                initial={{ opacity: 0, y: -40, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute left-0 bottom-0 w-[260px] h-[340px] rounded-3xl overflow-hidden shadow-xl shadow-indigo-100/40 border border-indigo-100 group hover:z-20 transition-all"
              >
                <img
                  src="/founder2.jpg"
                  alt="Combat training"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop'; }}
                />
              </motion.div>

              {/* Floating Badge (15+ Years Field Experience) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white border border-blue-100 rounded-2xl px-5 py-4 shadow-xl shadow-blue-100/50 flex items-center gap-3 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaShieldAlt className="text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none"><CountUp end={15} duration={3} />+ Yrs</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">Field Experience</div>
                </div>
              </motion.div>

              {/* Floating Stat Pill (🏆 5000+ Selections) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute top-8 left-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg shadow-blue-200/50 z-20 hover:scale-105 transition-transform"
              >
                🏆 5,000+ Selections
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dynamic Wave bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-black text-blue-600 leading-none">
                  <CountUp end={s.value} duration={2.5} enableScrollSpy scrollSpyOnce />{s.suffix}
                </div>
                <div className="text-gray-500 text-sm font-medium mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT FOUNDER ─────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-3xl -z-10" />
              <img
                src="/founder2.jpg"
                alt="Founder"
                className="rounded-3xl shadow-2xl w-full h-[480px] object-cover object-top"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop'; }}
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-black">5K+</div>
                <div className="text-sm font-medium opacity-90">Students Selected</div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">About The Founder</p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Trained by Officers,<br /><span className="text-blue-600">For Officers</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded by a serving officer with over 15 years of experience in law enforcement, The Inspector's Academy brings real-world field expertise directly into the classroom.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We don't just teach the syllabus — we prepare you mentally, physically, and strategically to succeed in the most competitive government exams in India.
              </p>
              <ul className="space-y-3 mb-8">
                {['Practical field knowledge from real officers', 'Intense physical + mental training', 'Personal mentorship & doubt sessions', 'Result-oriented strategic study plans'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <FaCheckCircle className="text-blue-500 text-lg flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/admission')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Start Your Journey →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COURSES ───────────────────────────────────────────── */}
      <section id="courses" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Our Programs</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Elite Coaching Programs</h2>
            <p className="text-gray-500 text-lg">Specialized batches designed to target specific exams with maximum precision.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course._id || course.id || i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-400 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCourseColor(course.title)} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {getCourseIcon(course.title)}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{course.title}</h3>
                <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
                  {course.duration}
                </span>
                <p className="text-gray-500 mb-6 leading-relaxed">{course.description || course.desc}</p>
                <button className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                  Explore Course <FaChevronRight className="text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS / ACHIEVEMENTS ────────────────────────────── */}
      <section id="results" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-3">Our Legacy</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Selection Results</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-16">
              Our students have secured positions across the most prestigious law enforcement and government agencies in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { exam: 'UP Police SI', count: '1,240+', year: '2023' },
              { exam: 'SSC CGL Inspector', count: '870+', year: '2023' },
              { exam: 'CRPF Selection', count: '650+', year: '2023' },
              { exam: 'Delhi Police HC', count: '430+', year: '2023' },
              { exam: 'State PSC', count: '520+', year: '2023' },
              { exam: 'RPF Constable', count: '780+', year: '2023' },
            ].map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors group"
              >
                <div className="text-3xl font-black text-cyan-300 mb-1">{r.count}</div>
                <div className="text-white font-bold">{r.exam}</div>
                <div className="text-slate-400 text-sm mt-1">Selections in {r.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Success Stories</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">What Our Achievers Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-slate-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative"
              >
                <FaQuoteLeft className="text-4xl text-blue-100 absolute top-6 right-6" />
                <div className="flex text-amber-400 gap-1 mb-5">{[...Array(5)].map((_,j)=><FaStar key={j} className="text-sm"/>)}</div>
                <p className="text-gray-700 text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image || t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" />
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-blue-600 text-sm font-medium">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ──────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden p-12 sm:p-16 text-center bg-white border border-blue-100/70 shadow-2xl shadow-blue-100/30"
          >
            {/* Elegant backdrop design blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-80 h-80 bg-blue-200/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-indigo-200/30 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Limited Seats Available</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Ready to Wear<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">The Uniform?</span>
              </h2>
              <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Admissions for the 2026 batch are open. Seats are strictly limited to ensure personalized attention for every student.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/admission')}
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-black text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20"
                >
                  Apply For Admission →
                </button>
                <a
                  href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello, I want to inquire about admission at Inspector's Academy")}`}
                  target="_blank" rel="noreferrer"
                  className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-lg transition-all hover:scale-105 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-2xl" /> WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─────────────────────────────────────── */}
      <WhyChooseUs />

      {/* ─── BATCH TIMINGS ─────────────────────────────────────── */}
      <BatchTimings />

      {/* ─── ADMISSION PROCESS ─────────────────────────────────── */}
      <AdmissionProcess />

      {/* ─── TOP RANKERS ───────────────────────────────────────── */}
      <TopRankers />

      {/* ─── GALLERY ───────────────────────────────────────────── */}
      <Gallery />

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <FAQSection />

      {/* ─── MAP ───────────────────────────────────────────────── */}
      <MapSection />

    </div>
  );
};

export default Home;

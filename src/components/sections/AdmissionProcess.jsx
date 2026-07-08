import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const steps = [
  { step: '01', title: 'Submit Application', desc: 'Fill out the online admission form with your details and target exam. Takes less than 2 minutes.', color: 'from-blue-600 to-cyan-500' },
  { step: '02', title: 'Counselling Call', desc: 'Our team will call you within 24 hours for a free counselling session to understand your goals.', color: 'from-indigo-600 to-blue-500' },
  { step: '03', title: 'Choose Your Batch', desc: 'Select the batch timing and course that best fits your schedule and preparation level.', color: 'from-cyan-600 to-teal-500' },
  { step: '04', title: 'Pay & Enroll', desc: 'Complete the enrollment by paying the nominal course fee. Multiple payment options available.', color: 'from-violet-600 to-indigo-500' },
  { step: '05', title: 'Start Training', desc: 'Attend your first class and receive your complete study kit. Your journey to the uniform begins!', color: 'from-emerald-600 to-cyan-500' },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 } }) };

const AdmissionProcess = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">How To Join</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Admission Process</h2>
          <p className="text-gray-500 text-lg">Simple 5-step process to get enrolled at Inspector's Academy.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-transparent" />

          <div className="space-y-12">
            {steps.map((s, i) => {
              const isRight = i % 2 !== 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isRight ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full">
                    <div className={`bg-slate-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-shadow ${isRight ? 'lg:text-right' : ''}`}>
                      <span className={`inline-block text-xs font-black tracking-widest uppercase bg-gradient-to-r ${s.color} text-transparent bg-clip-text mb-2`}>
                        Step {s.step}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">{s.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200`}>
                    {s.step}
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 w-full hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-16">
          <button
            onClick={() => navigate('/admission')}
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-black text-lg shadow-lg shadow-blue-300/40 hover:scale-105 transition-transform"
          >
            Apply For Admission →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionProcess;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { faqsAPI } from '../../services/api';

const mockFaqs = [
  { q: 'Who can apply for admission?', a: 'Any student who has completed or is appearing in 10th/12th grade can apply. There is no upper age limit for most programs.' },
  { q: 'What is the duration of each course?', a: 'Courses range from 6 months (Police Constable / SI) to 12 months (UPSC / State PSC). Weekend crash batches are 3–4 months.' },
  { q: 'Is physical training included?', a: 'Yes! All batches include daily physical training sessions conducted by certified PT instructors from 6:00 AM to 7:30 AM.' },
  { q: 'Do you provide study materials?', a: 'Yes, we provide comprehensive printed notes, previous year question papers, and a monthly magazine for current affairs — all included in the course fee.' },
  { q: 'What is the batch size?', a: 'We keep batch sizes to a maximum of 30 students to ensure personalized attention and direct interaction with faculty.' },
  { q: 'Are online classes available?', a: 'Yes! We offer hybrid learning. Live online classes and recorded lecture access are available for students who cannot attend physically.' },
  { q: 'What is the fee structure?', a: 'Fees vary by course (typically ₹15,000 – ₹45,000). EMI options are available. Contact us for the exact fee for your target exam.' },
  { q: 'Is hostel facility available?', a: 'Yes, hostel accommodation is available separately for outstation students at affordable rates. Contact us for details.' },
  { q: 'How do I get admission?', a: 'Submit the online admission form, receive a counselling call within 24 hours, choose your batch, and pay the course fee to get enrolled.' },
  { q: 'What is your selection success rate?', a: 'We are proud to have a 98% course completion rate and have produced 5,000+ selections in police and government services over 15 years.' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } }) };

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await faqsAPI.getAll();
        if (res.data && res.data.success) {
          setFaqs(res.data.data.length > 0 ? res.data.data : mockFaqs);
        } else {
          setFaqs(mockFaqs);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setFaqs(mockFaqs);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">FAQs</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-lg">Everything you need to know before enrolling.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-5 text-left font-bold text-slate-900 transition-colors ${open === i ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-50'}`}
              >
                <span className="pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${open === i ? 'text-white' : 'text-blue-500'}`}
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 text-gray-600 leading-relaxed border-t border-blue-50 bg-white">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

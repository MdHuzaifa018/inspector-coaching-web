import React from 'react';
import AdmissionForm from '../components/AdmissionForm';
import { motion } from 'framer-motion';

const Admission = () => {
  return (
    <div className="w-full min-h-screen bg-background dark:bg-[#0b1120] pt-32 pb-24 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-primary z-0 rounded-b-[40px] md:rounded-b-[80px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">Start Your Journey</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Take the first step towards a prestigious career in law enforcement. Seats are limited.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AdmissionForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Admission;

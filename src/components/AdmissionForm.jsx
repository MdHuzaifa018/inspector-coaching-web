import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { coursesAPI } from '../services/api';
import { CONTACT_CONFIG } from '../config';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Enter a valid 10-digit phone number' }),
  email: z.string().email({ message: 'Enter a valid email address' }).optional().or(z.literal('')),
  targetExam: z.string().min(1, { message: 'Please select a target exam' }),
  message: z.string().optional()
});

const AdmissionForm = () => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await coursesAPI.getAll();
        if (res.data && res.data.success && res.data.data.length > 0) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching courses for select:', err);
      }
    };
    fetchCourses();
  }, []);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/enquiries`, data);
      if (response.data.success) {
        toast.success('Your enquiry has been submitted successfully! We will contact you soon.');
        
        // Open WhatsApp with admission details
        const text = `*New Admission Application*\n\n` +
          `*Name:* ${data.name}\n` +
          `*Phone:* ${data.phone}\n` +
          `*Email:* ${data.email || 'N/A'}\n` +
          `*Target Exam:* ${data.targetExam}\n` +
          `*Message:* ${data.message || 'N/A'}`;
        
        const encodedText = encodeURIComponent(text);
        const whatsappURL = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodedText}`;
        window.open(whatsappURL, '_blank');

        reset();
      }
    } catch (error) {
      toast.error('Failed to submit enquiry. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-secondary p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">Apply for Admission</h2>
        <p className="text-gray-500 dark:text-gray-400">Fill out the form below and our team will get in touch with you shortly.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
          <input
            type="text"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
            placeholder="+91 9876543210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address (Optional)</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
            placeholder="johndoe@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Exam</label>
          <select
            {...register('targetExam')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.targetExam ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all`}
          >
            <option value="">Select Exam...</option>
            {courses.length > 0 ? (
              courses.map(course => (
                <option key={course._id || course.id} value={course.title}>
                  {course.title}
                </option>
              ))
            ) : (
              <>
                <option value="UPSC">UPSC / Civil Services</option>
                <option value="State PSC">State PSC</option>
                <option value="SSC CGL">SSC CGL Target Batch</option>
                <option value="Police SI">Police Sub-Inspector</option>
                <option value="Constable">Constable Batch</option>
              </>
            )}
            <option value="Other">Other</option>
          </select>
          {errors.targetExam && <p className="text-red-500 text-xs mt-1">{errors.targetExam.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Message (Optional)</label>
          <textarea
            {...register('message')}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
            placeholder="Any specific query?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const schema = z.object({
  email: z.string().email({ message: 'Valid email is required' }),
  password: z.string().min(6, { message: 'Password is required' }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${apiUrl}/auth/login`, data);
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Login Successful');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-secondary rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white text-2xl">
            <FaLock />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-primary dark:text-white mb-2">Admin Portal</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to manage the academy</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b1120] text-primary dark:text-white focus:ring-2 focus:ring-accent outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-70"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

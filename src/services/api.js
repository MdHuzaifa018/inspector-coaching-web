import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add Auth Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API endpoints
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  getMe: () => API.get('/auth/me')
};

export const coursesAPI = {
  getAll: () => API.get('/courses'),
  create: (data) => API.post('/courses', data),
  update: (id, data) => API.put(`/courses/${id}`, data),
  delete: (id) => API.delete(`/courses/${id}`)
};

export const enquiriesAPI = {
  getAll: () => API.get('/enquiries'),
  create: (data) => API.post('/enquiries', data),
  updateStatus: (id, data) => API.put(`/enquiries/${id}`, data)
};

export const galleryAPI = {
  getAll: () => API.get('/gallery'),
  create: (data) => API.post('/gallery', data),
  upload: (formData) => API.post('/gallery/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => API.delete(`/gallery/${id}`)
};

export const testimonialsAPI = {
  getAll: () => API.get('/testimonials'),
  getAdminAll: () => API.get('/testimonials/admin'),
  create: (data) => API.post('/testimonials', data),
  update: (id, data) => API.put(`/testimonials/${id}`, data),
  delete: (id) => API.delete(`/testimonials/${id}`)
};

export const faqsAPI = {
  getAll: () => API.get('/faqs'),
  create: (data) => API.post('/faqs', data),
  update: (id, data) => API.put(`/faqs/${id}`, data),
  delete: (id) => API.delete(`/faqs/${id}`)
};

export const batchesAPI = {
  getAll: () => API.get('/batches'),
  create: (data) => API.post('/batches', data),
  update: (id, data) => API.put(`/batches/${id}`, data),
  delete: (id) => API.delete(`/batches/${id}`)
};

export const resultsAPI = {
  getAll: () => API.get('/results'),
  create: (data) => API.post('/results', data),
  update: (id, data) => API.put(`/results/${id}`, data),
  delete: (id) => API.delete(`/results/${id}`)
};

export default API;

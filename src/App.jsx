import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/ui/BackToTop'
import WhatsAppButton from './components/ui/WhatsAppButton'
import ScrollProgress from './components/ui/ScrollProgress'
import LoadingScreen from './components/ui/LoadingScreen'
import Home from './pages/Home'
import Admission from './pages/Admission'
import Contact from './pages/Contact'
import Results from './pages/Results'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Enquiries from './pages/admin/Enquiries'
import Courses from './pages/admin/Courses'
import Batches from './pages/admin/Batches'
import ResultsAdmin from './pages/admin/Results'
import Testimonials from './pages/admin/Testimonials'
import Gallery from './pages/admin/Gallery'
import FAQs from './pages/admin/FAQs'
import ProtectedRoute from './components/ui/ProtectedRoute'

// Admin pages don't show the main Navbar/Footer
const isAdminPath = (path) => path.startsWith('/admin');

const AppLayout = () => {
  const location = useLocation();
  const admin = isAdminPath(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollProgress />
      <LoadingScreen />
      {!admin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/admin/batches" element={<ProtectedRoute><Batches /></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute><ResultsAdmin /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/admin/faqs" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
        </Routes>
      </main>
      {!admin && <Footer />}
      {!admin && <BackToTop />}
      {!admin && <WhatsAppButton />}
      <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App

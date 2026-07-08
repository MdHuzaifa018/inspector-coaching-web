import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { enquiriesAPI, coursesAPI, batchesAPI, resultsAPI, testimonialsAPI, galleryAPI, faqsAPI } from '../../services/api';
import { FaUserGraduate, FaBookOpen, FaClock, FaTrophy, FaComments, FaImages, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    courses: 0,
    batches: 0,
    results: 0,
    testimonials: 0,
    gallery: 0,
    faqs: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enqRes, courseRes, batchRes, resultRes, testRes, galleryRes, faqRes] = await Promise.all([
          enquiriesAPI.getAll(),
          coursesAPI.getAll(),
          batchesAPI.getAll(),
          resultsAPI.getAll(),
          testimonialsAPI.getAll(),
          galleryAPI.getAll(),
          faqsAPI.getAll()
        ]);

        const enquiriesData = enqRes.data.data || [];
        setStats({
          enquiries: enquiriesData.length,
          courses: (courseRes.data.data || []).length,
          batches: (batchRes.data.data || []).length,
          results: (resultRes.data.data || []).length,
          testimonials: (testRes.data.data || []).length,
          gallery: (galleryRes.data.data || []).length,
          faqs: (faqRes.data.data || []).length
        });

        // Set the latest 5 enquiries
        const sortedEnquiries = [...enquiriesData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentEnquiries(sortedEnquiries.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const cardData = [
    { title: 'Total Enquiries', value: stats.enquiries, icon: <FaUserGraduate />, color: 'text-blue-600 bg-blue-50 border-blue-100', link: '/admin/enquiries' },
    { title: 'Active Courses', value: stats.courses, icon: <FaBookOpen />, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', link: '/admin/courses' },
    { title: 'Active Batches', value: stats.batches, icon: <FaClock />, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', link: '/admin/batches' },
    { title: 'Selections/Rankers', value: stats.results, icon: <FaTrophy />, color: 'text-amber-600 bg-amber-50 border-amber-100', link: '/admin/results' },
    { title: 'Testimonials', value: stats.testimonials, icon: <FaComments />, color: 'text-rose-600 bg-rose-50 border-rose-100', link: '/admin/testimonials' },
    { title: 'Gallery Images', value: stats.gallery, icon: <FaImages />, color: 'text-purple-600 bg-purple-50 border-purple-100', link: '/admin/gallery' },
    { title: 'Active FAQs', value: stats.faqs, icon: <FaQuestionCircle />, color: 'text-cyan-600 bg-cyan-50 border-cyan-100', link: '/admin/faqs' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Real-time statistics and summary of all website sections.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading statistics...</div>
        ) : (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cardData.map((card, i) => (
                <Link 
                  key={i} 
                  to={card.link}
                  className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-center gap-5 hover:-translate-y-0.5"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${card.color} shrink-0`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{card.title}</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{card.value}</h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Enquiries & Fast Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Enquiries */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 xl:col-span-2 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Recent Enquiries</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Latest admissions form submissions.</p>
                  </div>
                  <Link to="/admin/enquiries" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    View All →
                  </Link>
                </div>

                {recentEnquiries.length === 0 ? (
                  <div className="py-10 text-center text-gray-400">No enquiries submitted yet.</div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {recentEnquiries.map((enq) => (
                      <div key={enq._id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <FaEnvelope />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">{enq.name}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Phone: <span className="font-medium text-slate-700">{enq.phone}</span> | Exam: <span className="font-medium text-slate-700">{enq.targetExam}</span>
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-2xs font-bold ${
                          enq.status === 'New' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          enq.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-green-50 text-green-700 border border-green-100'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-2">CMS Quick Links</h2>
                  <p className="text-xs text-gray-400 mb-6">Instantly navigate to content managers.</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/admin/courses" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Manage Courses
                    </Link>
                    <Link to="/admin/batches" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Manage Batches
                    </Link>
                    <Link to="/admin/results" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Manage Results
                    </Link>
                    <Link to="/admin/testimonials" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Testimonials
                    </Link>
                    <Link to="/admin/gallery" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Upload Photos
                    </Link>
                    <Link to="/admin/faqs" className="p-3 text-center bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl border border-slate-100 transition-colors font-bold text-xs">
                      Manage FAQs
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-6 text-center text-2xs text-gray-400 font-semibold uppercase tracking-wider">
                  Academy CMS Dashboard v1.0
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

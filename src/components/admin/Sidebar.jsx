import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBookOpen, FaUserGraduate, FaSignOutAlt, FaClock, FaTrophy, FaComments, FaImages, FaQuestionCircle } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Courses', path: '/admin/courses', icon: <FaBookOpen /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <FaUserGraduate /> },
    { name: 'Batch Timings', path: '/admin/batches', icon: <FaClock /> },
    { name: 'Results / Rankers', path: '/admin/results', icon: <FaTrophy /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaComments /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <FaImages /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-secondary h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-primary dark:text-white font-heading">Academy Admin</h2>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-1.5 px-4 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
                isActive ? 'bg-accent text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0b1120]'
              }`
            }
          >
            {link.icon} {link.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

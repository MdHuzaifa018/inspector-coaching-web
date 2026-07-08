import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '/', isRoute: true },
  { name: 'About', href: '#about', isRoute: false },
  { name: 'Courses', href: '#courses', isRoute: false },
  { name: 'Results', href: '/results', isRoute: true },
  { name: 'Contact', href: '/contact', isRoute: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/10 py-3 border-b border-gray-200'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg bg-blue-600">
                <FaShieldAlt className="text-lg text-white" />
              </div>
              <div>
                <div className={`font-black text-sm leading-none tracking-wider uppercase transition-colors ${scrolled ? 'text-gray-900' : 'text-slate-850'}`}>
                  Inspector's
                </div>
                <div className="font-black text-xs leading-none tracking-widest uppercase text-blue-600">
                  Academy
                </div>
              </div>
            </Link>
 
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group ${
                    scrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-slate-700 hover:text-blue-650 hover:bg-slate-100/50'
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-blue-600" />
                </button>
              ))}
            </div>
 
            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/admission')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
              >
                Apply Now →
              </motion.button>
            </div>
 
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-slate-800 hover:bg-slate-100'}`}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl bg-white shadow-2xl shadow-black/20 border border-gray-100 p-6 md:hidden"
          >
            <div className="flex flex-col gap-2 mb-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link)}
                  className="text-left px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => { setMenuOpen(false); navigate('/admission'); }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg"
            >
              Apply Now →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

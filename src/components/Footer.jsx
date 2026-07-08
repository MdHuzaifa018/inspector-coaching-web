import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
                IA
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                THE INSPECTOR'S ACADEMY
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Empowering the next generation of law enforcement officers with world-class coaching, rigorous training, and a commitment to excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#results" className="text-gray-400 hover:text-white transition-colors">Selections</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Our Courses</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">UPSC Coaching</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">State PSC</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SSC CGL</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Police Sub-Inspector</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Constable Batch</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <strong>Address:</strong><br />
               Inspector's Academy,Patna,Bihar
              </li>
              <li>
                <strong>Phone:</strong><br />
                +91 8252529139
              </li>
              <li>
                <strong>Email:</strong><br />
                info@inspectorsacademy.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-3">
          <p>&copy; {new Date().getFullYear()} The Inspector's Academy. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Crafted with <span className="text-red-500">♥</span> by{' '}
            <a 
              href="https://latest-portfolio-huzaif-sheikh.vercel.app/" // Replace with your portfolio link
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent underline transition-all font-semibold"
            >
              Md Huzaif Sheikh
            </a>
            <a 
              href="https://wa.me/918434890116" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 transition-colors ml-1 text-lg"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

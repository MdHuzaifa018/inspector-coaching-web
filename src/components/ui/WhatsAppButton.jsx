import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_CONFIG } from '../../config';

const WhatsAppButton = ({ number = CONTACT_CONFIG.whatsappNumber, message = 'Hello! I want to inquire about admission at Inspector\'s Academy.' }) => (
  <motion.a
    href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl shadow-green-400/40 transition-colors"
    aria-label="Chat on WhatsApp"
  >
    <FaWhatsapp className="text-3xl" />
    {/* Pulse ring */}
    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
  </motion.a>
);

export default WhatsAppButton;

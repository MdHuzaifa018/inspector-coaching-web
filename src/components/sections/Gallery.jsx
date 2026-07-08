import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryAPI } from '../../services/api';

const mockImages = [
  { imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800', caption: 'Classroom session', span: 'col-span-2' },
  { imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800', caption: 'Physical training', span: '' },
  { imageUrl: 'https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=800', caption: 'Study group', span: '' },
  { imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800', caption: 'Library', span: '' },
  { imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10579a0ab?q=80&w=800', caption: 'Award ceremony', span: 'col-span-2' },
  { imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=800', caption: 'Morning PT', span: '' },
];

const fadeUp = { hidden: { opacity: 0, scale: 0.95 }, show: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.08 } }) };

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await galleryAPI.getAll();
        if (res.data && res.data.success) {
          setImages(res.data.data.length > 0 ? res.data.data : mockImages);
        } else {
          setImages(mockImages);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setImages(mockImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-3">Life At Academy</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Our Gallery</h2>
          <p className="text-slate-400 text-lg">A glimpse into the training, discipline, and camaraderie at Inspector's Academy.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-[220px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className={`relative group overflow-hidden rounded-2xl ${img.span || ''}`}
            >
              <img
                src={img.imageUrl}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white font-bold text-sm tracking-wide uppercase">{img.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

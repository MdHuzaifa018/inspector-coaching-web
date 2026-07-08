import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { testimonialsAPI, galleryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaTimes, FaUpload } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    image: 'https://i.pravatar.cc/100',
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      // Use getAdminAll to load both active and inactive testimonials
      const res = await testimonialsAPI.getAdminAll();
      setTestimonials(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.warn('getAdminAll failed, falling back to standard getAll:', error);
      try {
        const res = await testimonialsAPI.getAll();
        setTestimonials(res.data.data || []);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load testimonials');
        setLoading(false);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      text: '',
      image: 'https://i.pravatar.cc/100',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTestimonial(t);
    setFormData({
      name: t.name,
      role: t.role,
      text: t.text,
      image: t.image,
      isActive: t.isActive !== undefined ? t.isActive : true,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploading(true);
    try {
      const res = await galleryAPI.upload(uploadData);
      if (res.data && res.data.success) {
        setFormData(prev => ({ ...prev, image: res.data.data }));
        toast.success('Avatar uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.text) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial._id, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await testimonialsAPI.create(formData);
        toast.success('Testimonial created successfully');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Testimonials</h1>
            <p className="text-gray-500 mt-1">Review and manage student success quotes and reviews.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105"
          >
            + Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-lg font-bold">No Testimonials Found</p>
            <p className="text-sm mt-1">Add student reviews to show on home page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t._id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                        onError={(e) => { e.target.src = 'https://i.pravatar.cc/100'; }}
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight">{t.name}</h4>
                        <span className="text-xs text-blue-600 font-bold">{t.role}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${t.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {t.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm italic leading-relaxed mb-6">"{t.text}"</p>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleOpenEdit(t)}
                    className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t._id)}
                    className="py-3 px-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-bold transition-all flex items-center justify-center"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50 bg-slate-50/50">
              <h2 className="text-2xl font-black text-slate-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl">
                <img 
                  src={formData.image} 
                  alt="Avatar Preview" 
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200" 
                  onError={(e) => { e.target.src = 'https://i.pravatar.cc/100'; }}
                />
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Student Photo</label>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors">
                      <FaUpload /> {uploading ? 'Uploading...' : 'Upload Image'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    <input 
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or enter URL..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Student Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priyal Singh" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Role / Designation *</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Sub Inspector (UP Police 2021 batch)" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Review / Testimonial Text *</label>
                <textarea 
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  placeholder="Tell others about their training experience and results..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                  Show on Home page
                </label>
              </div>

              <div className="pt-6 border-t border-slate-50 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;

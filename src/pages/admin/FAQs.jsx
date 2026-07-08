import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { faqsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaTimes, FaQuestionCircle } from 'react-icons/fa';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    q: '',
    a: '',
    order: 0,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await faqsAPI.getAll();
      // Sort by order ascending
      const sorted = (res.data.data || []).sort((a, b) => a.order - b.order);
      setFaqs(sorted);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load FAQs');
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingFAQ(null);
    setFormData({
      q: '',
      a: '',
      order: faqs.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      q: faq.q,
      a: faq.a,
      order: faq.order !== undefined ? faq.order : 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await faqsAPI.delete(id);
      toast.success('FAQ deleted successfully');
      fetchFaqs();
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.q || !formData.a) {
      toast.error('Please fill in both question and answer fields');
      return;
    }

    const payload = {
      ...formData,
      order: Number(formData.order),
    };

    try {
      if (editingFAQ) {
        await faqsAPI.update(editingFAQ._id, payload);
        toast.success('FAQ updated successfully');
      } else {
        await faqsAPI.create(payload);
        toast.success('FAQ created successfully');
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save FAQ');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage FAQs</h1>
            <p className="text-gray-500 mt-1">Configure and order frequently asked questions shown on the homepage.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105"
          >
            + Add FAQ
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-lg font-bold">No FAQs Found</p>
            <p className="text-sm mt-1">Get started by creating your first frequently asked question.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug">{faq.q}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    <div className="mt-3 text-xs text-gray-400 font-semibold">Display Order: {faq.order}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenEdit(faq)}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  <button 
                    onClick={() => handleDelete(faq._id)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all"
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
                {editingFAQ ? 'Edit FAQ' : 'Create FAQ'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Question *</label>
                <input 
                  type="text" 
                  value={formData.q}
                  onChange={(e) => setFormData({ ...formData, q: e.target.value })}
                  placeholder="e.g. What are the batch timings for SI training?" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Answer *</label>
                <textarea 
                  value={formData.a}
                  onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                  rows={5}
                  placeholder="Provide a clear, detailed answer to the question..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Display Order (Lower numbers show first)</label>
                <input 
                  type="number" 
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  placeholder="e.g. 0" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;

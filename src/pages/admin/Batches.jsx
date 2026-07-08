import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { batchesAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    days: '',
    subjects: '',
    seats: '',
    filled: '',
    tag: 'Seats Available',
    tagColor: 'bg-green-100 text-green-700',
  });

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const res = await batchesAPI.getAll();
      setBatches(res.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load batches');
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      time: '',
      days: '',
      subjects: '',
      seats: '',
      filled: '',
      tag: 'Seats Available',
      tagColor: 'bg-green-100 text-green-700',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      time: batch.time,
      days: batch.days,
      subjects: Array.isArray(batch.subjects) ? batch.subjects.join(', ') : '',
      seats: batch.seats,
      filled: batch.filled,
      tag: batch.tag || 'Seats Available',
      tagColor: batch.tagColor || 'bg-green-100 text-green-700',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this batch schedule?')) return;
    try {
      await batchesAPI.delete(id);
      toast.success('Batch deleted successfully');
      fetchBatches();
    } catch (error) {
      toast.error('Failed to delete batch');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.time || !formData.days || !formData.seats || formData.filled === '') {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      ...formData,
      seats: Number(formData.seats),
      filled: Number(formData.filled),
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      if (editingBatch) {
        await batchesAPI.update(editingBatch._id, payload);
        toast.success('Batch updated successfully');
      } else {
        await batchesAPI.create(payload);
        toast.success('Batch created successfully');
      }
      setModalOpen(false);
      fetchBatches();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save batch');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Batch Timings</h1>
            <p className="text-gray-500 mt-1">Configure morning, afternoon, evening and weekend course batches.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105"
          >
            + Add New Batch
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading batches...</div>
        ) : batches.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-lg font-bold">No Batches Found</p>
            <p className="text-sm mt-1">Get started by creating your first batch schedule.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {batches.map(batch => (
              <div key={batch._id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${batch.tagColor}`}>
                      {batch.tag}
                    </span>
                    <span className="text-sm text-gray-400 font-bold">
                      {batch.filled} / {batch.seats} Seats Filled
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{batch.name}</h3>
                  <div className="text-sm text-blue-600 font-bold mb-1">{batch.time}</div>
                  <div className="text-xs text-gray-500 font-semibold mb-4">{batch.days}</div>
                  
                  {batch.subjects && batch.subjects.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subjects Covered</div>
                      <div className="flex flex-wrap gap-1.5">
                        {batch.subjects.map((sub, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleOpenEdit(batch)}
                    className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(batch._id)}
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
                {editingBatch ? 'Edit Batch' : 'Create Batch'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Batch Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Morning Special SI Batch" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Timing *</label>
                  <input 
                    type="text" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 7:00 AM – 10:00 AM" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Days *</label>
                  <input 
                    type="text" 
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    placeholder="e.g. Mon – Sat" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Seats *</label>
                  <input 
                    type="number" 
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    placeholder="e.g. 50" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Filled Seats *</label>
                  <input 
                    type="number" 
                    value={formData.filled}
                    onChange={(e) => setFormData({ ...formData, filled: e.target.value })}
                    placeholder="e.g. 12" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subjects (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  placeholder="e.g. Indian Polity, GK, Quantitative Aptitude" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tag</label>
                  <select 
                    value={formData.tag}
                    onChange={(e) => {
                      const val = e.target.value;
                      let col = 'bg-green-100 text-green-700';
                      if (val === 'Filling Fast') col = 'bg-amber-100 text-amber-700';
                      if (val === 'Admission Closed') col = 'bg-red-100 text-red-700';
                      setFormData({ ...formData, tag: val, tagColor: col });
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  >
                    <option value="Seats Available">Seats Available</option>
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Admission Closed">Admission Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tag Style Preview</label>
                  <div className={`w-full px-4 py-3 rounded-xl font-bold text-center text-sm border border-slate-100 ${formData.tagColor}`}>
                    {formData.tag}
                  </div>
                </div>
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
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batches;

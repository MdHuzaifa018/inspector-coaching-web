import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { resultsAPI, galleryAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaTimes, FaUpload } from 'react-icons/fa';

const ResultsAdmin = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    exam: '',
    year: new Date().getFullYear(),
    img: '',
    badge: 'Gold',
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await resultsAPI.getAll();
      setResults(res.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load selection results');
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingResult(null);
    setFormData({
      name: '',
      rank: '',
      exam: '',
      year: new Date().getFullYear(),
      img: 'https://i.pravatar.cc/200',
      badge: 'Gold',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (res) => {
    setEditingResult(res);
    setFormData({
      name: res.name,
      rank: res.rank,
      exam: res.exam,
      year: res.year,
      img: res.img,
      badge: res.badge || 'Gold',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      await resultsAPI.delete(id);
      toast.success('Result deleted successfully');
      fetchResults();
    } catch (error) {
      toast.error('Failed to delete result');
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
        setFormData(prev => ({ ...prev, img: res.data.data }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rank || !formData.exam || !formData.year) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      ...formData,
      year: Number(formData.year),
    };

    try {
      if (editingResult) {
        await resultsAPI.update(editingResult._id, payload);
        toast.success('Result updated successfully');
      } else {
        await resultsAPI.create(payload);
        toast.success('Result created successfully');
      }
      setModalOpen(false);
      fetchResults();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save result');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Results & Rankers</h1>
            <p className="text-gray-500 mt-1">Manage successful student stories and rank displays.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105"
          >
            + Add New Result
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading results...</div>
        ) : results.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-lg font-bold">No Results Found</p>
            <p className="text-sm mt-1">Get started by creating your first student selection result.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-sm font-black">Student</th>
                    <th className="px-8 py-5 text-sm font-black">Rank</th>
                    <th className="px-8 py-5 text-sm font-black">Exam</th>
                    <th className="px-8 py-5 text-sm font-black">Year</th>
                    <th className="px-8 py-5 text-sm font-black">Badge</th>
                    <th className="px-8 py-5 text-sm font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((res) => (
                    <tr key={res._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4 flex items-center gap-4">
                        <img 
                          src={res.img} 
                          alt={res.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100" 
                          onError={(e) => { e.target.src = 'https://i.pravatar.cc/200'; }}
                        />
                        <div className="font-bold text-slate-900">{res.name}</div>
                      </td>
                      <td className="px-8 py-4 text-blue-600 font-bold">{res.rank}</td>
                      <td className="px-8 py-4 text-slate-600 font-medium">{res.exam}</td>
                      <td className="px-8 py-4 text-slate-500 font-semibold">{res.year}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          res.badge === 'Gold' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                          res.badge === 'Silver' ? 'bg-slate-100 text-slate-700' :
                          'bg-orange-50 text-orange-700'
                        }`}>
                          {res.badge}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEdit(res)}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button 
                            onClick={() => handleDelete(res._id)}
                            className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50 bg-slate-50/50">
              <h2 className="text-2xl font-black text-slate-900">
                {editingResult ? 'Edit Selection' : 'Create Selection'}
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
                  src={formData.img} 
                  alt="Student Preview" 
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200" 
                  onError={(e) => { e.target.src = 'https://i.pravatar.cc/200'; }}
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
                      value={formData.img}
                      onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                      placeholder="Or enter image URL..."
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
                  placeholder="e.g. Ramesh Kumar" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rank *</label>
                  <input 
                    type="text" 
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    placeholder="e.g. AIR 42 or Rank 2" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Selection Year *</label>
                  <input 
                    type="number" 
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2023" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Exam Title *</label>
                <input 
                  type="text" 
                  value={formData.exam}
                  onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                  placeholder="e.g. UPSC CSE or UP Police SI" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Award Category Badge</label>
                <select 
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                >
                  <option value="Gold">Gold (Highest Achievers)</option>
                  <option value="Silver">Silver (High Ranks)</option>
                  <option value="Bronze">Bronze (Selections)</option>
                </select>
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
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsAdmin;

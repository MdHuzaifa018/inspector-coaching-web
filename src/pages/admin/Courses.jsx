import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { coursesAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    fees: '',
    features: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await coursesAPI.getAll();
      setCourses(res.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load courses');
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      fees: '',
      features: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fees: course.fees,
      features: Array.isArray(course.features) ? course.features.join(', ') : '',
      isActive: course.isActive !== undefined ? course.isActive : true,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await coursesAPI.delete(id);
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.duration || !formData.fees) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      ...formData,
      fees: Number(formData.fees),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
    };

    try {
      if (editingCourse) {
        await coursesAPI.update(editingCourse._id, payload);
        toast.success('Course updated successfully');
      } else {
        await coursesAPI.create(payload);
        toast.success('Course created successfully');
      }
      setModalOpen(false);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save course');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Courses</h1>
            <p className="text-gray-500 mt-1">Add, update or remove academy training programs.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105"
          >
            + Add New Course
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-lg font-bold">No Courses Found</p>
            <p className="text-sm mt-1">Get started by creating your first course.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course._id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-blue-600 font-bold text-lg">₹{course.fees}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{course.title}</h3>
                  <div className="inline-block text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-4">
                    {course.duration}
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">{course.description}</p>
                  
                  {course.features && course.features.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Features</div>
                      <ul className="space-y-1.5">
                        {course.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {feat}
                          </li>
                        ))}
                        {course.features.length > 3 && (
                          <li className="text-xs text-blue-500 font-semibold">+{course.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button 
                    onClick={() => handleOpenEdit(course)}
                    className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(course._id)}
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
                {editingCourse ? 'Edit Course' : 'Create Course'}
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Course Title *</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. UPSC civil services" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Duration *</label>
                  <input 
                    type="text" 
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 12 Months" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Fees (INR) *</label>
                  <input 
                    type="number" 
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    placeholder="e.g. 35000" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description *</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Provide details about course syllabus and approach..." 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Key Features (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g. Physical Training, Study Materials, Mock Tests" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
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
                <label htmlFor="isActive" className="text-sm font-bold text-slate-700 cursor-pointerSelect select-none">
                  Active (Show on website)
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
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;

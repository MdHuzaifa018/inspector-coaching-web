import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load enquiries');
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/enquiries/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Status updated');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Enquiry deleted');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to delete enquiry');
    }
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-10">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-8">Manage Enquiries</h1>
        
        <div className="bg-white dark:bg-secondary rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-[#0b1120] text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Exam</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : enquiries.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No enquiries found.</td></tr>
                ) : enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-gray-50 dark:hover:bg-[#0b1120] transition-colors">
                    <td className="px-6 py-4 text-primary dark:text-white font-medium">{enq.name}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div>{enq.phone}</div>
                      <div className="text-xs">{enq.email}</div>
                    </td>
                    <td className="px-6 py-4 text-primary dark:text-white">{enq.targetExam}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={enq.status}
                        onChange={(e) => updateStatus(enq._id, e.target.value)}
                        className={`text-sm rounded-full px-3 py-1 font-medium border-none outline-none ${
                          enq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          enq.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => deleteEnquiry(enq._id)} className="text-red-500 hover:text-red-700 font-medium text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;

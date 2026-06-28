'use client';
import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaUserShield, FaUserCheck, FaBan, FaCheckCircle, FaFilter } from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'blocked'
  const [activeDropdown, setActiveDropdown] = useState(null); // থ্রি-ডট মেনু ট্র্যাক করার জন্য

  // ডাটা ফেচ করার ফাংশন
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`);
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("ইউজার ডাটা লোড করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  // স্ট্যাটাস ও রোল আপডেটের জন্য জেনেরিক হ্যান্ডলার
  const handleUpdateUser = async (email, updateData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      const result = await res.json();
      if (result.success) {
        // রিয়েল-টাইমে ফ্রন্টএন্ড স্টেট আপডেট
        setUsers(prev => prev.map(user => user.email === email ? { ...user, ...updateData } : user));
        setActiveDropdown(null); // মেনু ক্লোজ করা
      }
    } catch (error) {
      console.error("ইউজার আপডেট করতে ব্যর্থ:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            All Users 👤
          </h1>
          <p className="text-gray-500 text-sm">প্ল্যাটফর্মের সকল মেম্বারদের তালিকা এবং রোল ম্যানেজমেন্ট।</p>
        </div>

        {/* --- ফিল্টারিং অপশন --- */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-fit">
          <FaFilter className="text-gray-400 text-sm" />
          <select 
            className="outline-none text-sm font-medium text-gray-700 cursor-pointer bg-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* --- টেবিল সেকশন --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {loading ? (
              // লোডিং স্কেলিটন ট্র‍্যাক
              [1, 2, 3].map((n) => (
                <tr key={n} className="animate-pulse">
                  <td className="p-4 flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 rounded-full"></div><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-40 bg-gray-200 rounded"></div></td>
                  <td className="p-4"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
                  <td className="p-4"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
                  <td className="p-4 text-center"><div className="h-4 w-6 bg-gray-200 rounded mx-auto"></div></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">কোনো ইউজার ডাটা পাওয়া যায়নি।</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50/50 transition-colors">
                  {/* Avatar & Name */}
                  <td className="p-4 flex items-center gap-3">
                    <img 
                      src={user.image || "https://i.ibb.co.com/ff4S30p/avatar-placeholder.png"} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </td>
                  {/* Email */}
                  <td className="p-4 text-gray-600">{user.email}</td>
                  {/* Role */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      user.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                      user.role === 'volunteer' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {user.role || 'donor'}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'blocked' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {user.status === 'blocked' ? <FaBan size={10} /> : <FaCheckCircle size={10} />}
                      {user.status || 'active'}
                    </span>
                  </td>
                  {/* Three Dot Action Dropdown Menu */}
                  <td className="p-4 text-center relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FaEllipsisV />
                    </button>

                    {activeDropdown === index && (
                      <>
                        {/* ব্যাকড্রপ ক্লিক করলে ড্রপডাউন বন্ধ হওয়ার জন্য */}
                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                        
                        <div className="absolute right-4 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 text-left">
                          {/* Block / Unblock Condition */}
                          {user.status === 'blocked' ? (
                            <button 
                              onClick={() => handleUpdateUser(user.email, { status: 'active' })}
                              className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                            >
                              <FaUserCheck className="text-xs" /> Unblock User
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleUpdateUser(user.email, { status: 'blocked' })}
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <FaBan className="text-xs" /> Block User
                            </button>
                          )}

                          {/* Make Volunteer (Only if not already volunteer/admin) */}
                          {user.role !== 'volunteer' && user.role !== 'admin' && (
                            <button 
                              onClick={() => handleUpdateUser(user.email, { role: 'volunteer' })}
                              className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                            >
                              <FaUserCheck className="text-xs" /> Make Volunteer
                            </button>
                          )}

                          {/* Make Admin (Only if not already admin) */}
                          {user.role !== 'admin' && (
                            <button 
                              onClick={() => handleUpdateUser(user.email, { role: 'admin' })}
                              className="w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                            >
                              <FaUserShield className="text-xs" /> Make Admin
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // বা React Router হলে 'react-router-dom' থেকে নিন
import { FaHeartbeat, FaTrashAlt, FaEye, FaEdit, FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';

const AllBloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. সব ইউজারের ব্লাড রিকোয়েস্ট নিয়ে আসা
  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests`);
      const result = await res.json();
      if (result.success) {
        setRequests(result.data);
      }
    } catch (error) {
      console.error("ব্লাড রিকোয়েস্ট ডাটা লোড করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  // ২. রিকোয়েস্টের স্ট্যাটাস পরিবর্তন করা (Pending -> In Progress -> Done/Canceled)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        // রিয়েল-টাইমে ফ্রন্টএন্ড স্টেট আপডেট
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
      }
    } catch (error) {
      console.error("স্ট্যাটাস আপডেট করতে সমস্যা:", error);
    }
  };

  // ৩. অ্যাডমিন প্রিভিলেজ অনুযায়ী যেকোনো রিকোয়েস্ট ডিলিট করা
  const handleDeleteRequest = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিতভাবে এই রক্তের রিকোয়েস্টটি ডিলিট করতে চান?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setRequests(prev => prev.filter(req => req._id !== id));
      }
    } catch (error) {
      console.error("রিকোয়েস্ট ডিলিট করতে সমস্যা:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          All Blood Donation Requests 🩸
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          প্ল্যাটফর্মের সমস্ত ইউজারের করা রক্তের রিকোয়েস্ট তালিকা। অ্যাডমিন হিসেবে আপনি যেকোনো রিকোয়েস্ট এডিট, ডিলিট বা স্ট্যাটাস পরিবর্তন করতে পারবেন।
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="p-4">Recipient Name</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-center">Blood Group</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {loading ? (
              // লোডিং স্টেট স্কেলিটন
              [1, 2, 3].map((n) => (
                <tr key={n} className="animate-pulse">
                  <td className="p-4"><div className="h-4 w-28 bg-gray-200 rounded"></div></td>
                  <td className="p-4"><div className="h-4 w-36 bg-gray-200 rounded"></div></td>
                  <td className="p-4 text-center"><div className="h-6 w-12 bg-gray-200 rounded-full mx-auto"></div></td>
                  <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                  <td className="p-4"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
                  <td className="p-4 text-center"><div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div></td>
                </tr>
              ))
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">কোনো রক্তের আবেদন পাওয়া যায়নি।</td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* Recipient Name */}
                  <td className="p-4 font-semibold text-gray-800">{request.recipientName}</td>
                  
                  {/* Location */}
                  <td className="p-4 text-gray-600">
                    {request.upazila}, {request.district}
                  </td>
                  
                  {/* Blood Group */}
                  <td className="p-4 text-center">
                    <span className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-md font-bold text-xs border border-red-100">
                      {request.bloodGroup}
                    </span>
                  </td>
                  
                  {/* Date & Time */}
                  <td className="p-4 text-gray-500 text-xs">
                    <div>{request.donationDate}</div>
                    <div className="text-gray-400 mt-0.5">{request.donationTime}</div>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      request.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      request.status === 'inprogress' ? 'bg-blue-50 text-blue-600' :
                      request.status === 'done' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  
                  {/* Action Buttons */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* ১. স্ট্যাটাস ম্যানেজমেন্ট অ্যাকশন ড্রপডাউন/সিলেক্ট (অ্যাডমিন প্রিভিলেজ) */}
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
                        className="text-xs border border-gray-200 rounded p-1 bg-white outline-none cursor-pointer text-gray-600 font-medium"
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                      </select>

                      {/* ২. ভিউ ডিটেইলস বাটন */}
                      <Link 
                        href={`/dashboard/donor/donation-requests/${request._id}`}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </Link>

                      {/* ৩. এডিট বাটন */}
                      {/* <Link 
                      href={`/dashboard/donor/edit-donation-request/${request._id}`}
                        className="p-1.5 text-amber-500 hover:bg-amber-50 rounded transition-colors"
                        title="Edit Request"
                      >
                        <FaEdit size={14} />
                      </Link> */}

                      {/* ৪. ডিলিট বাটন (অ্যাডমিন প্রিভিলেজ) */}
                      <button 
                        onClick={() => handleDeleteRequest(request._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete Request"
                      >
                        <FaTrashAlt size={14} />
                      </button>

                    </div>
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

export default AllBloodDonationRequests;
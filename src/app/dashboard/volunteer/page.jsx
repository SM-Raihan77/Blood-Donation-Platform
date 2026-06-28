'use client';
import React, { useState, useEffect, useContext } from 'react';
import { FaUsers, FaHandHoldingHeart, FaHeartbeat } from 'react-icons/fa';
// আপনার প্রজেক্টের AuthContext-এর পাথ দিন
import { authClient } from '@/lib/auth-client'; 

const DashboardHome = () => {
  // সেশন থেকে ইউজার ডাটা নেওয়া
  const { data: session } = authClient.useSession();
   const user = session?.user;
 
   const adminUser = user?.name
     ? user
     : { name: "Donor User", email: "donor@example.com" };  

  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Axios-এর পরিবর্তে ডিফল্ট fetch ব্যবহার
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard-stats`);
        
        // fetch-এ ডাটাকে ম্যানুয়ালি .json() দিয়ে কনভার্ট করতে হয়
        const result = await response.json(); 
        
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-md mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          স্বাগতম, {adminUser.name}! 👋
        </h1>
        <p className="text-red-100 text-sm md:text-base max-w-xl">
          আপনার ড্যাশবোর্ডে স্বাগতম। এখান থেকে আপনি প্ল্যাটফর্মের কার্যক্রম এবং রক্তের জরুরি রিকোয়েস্টগুলো মনিটর করতে পারবেন।
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Users (Donors)</p>
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalDonors.toLocaleString()}</h3>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-blue-500"><FaUsers size={28} /></div>
        </div>

        {/* Card 2: Total Funding */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Funding</p>
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <h3 className="text-3xl font-bold text-gray-800 mt-2">৳{stats.totalFunding.toLocaleString()}</h3>
            )}
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-green-500"><FaHandHoldingHeart size={28} /></div>
        </div>

        {/* Card 3: Total Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Blood Donation Requests</p>
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRequests.toLocaleString()}</h3>
            )}
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-red-500"><FaHeartbeat size={28} /></div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
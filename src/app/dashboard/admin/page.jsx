'use client';
import React, { useState, useEffect } from 'react';
import { FaUsers, FaHandHoldingHeart, FaHeartbeat } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client'; 

const DashboardHome = () => {
  // Fetch user data from session
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
        
        const response = await fetch('http://localhost:5000/api/dashboard-stats');
        
        // Convert response data to JSON
        const result = await response.json(); 
        
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Error loading dashboard statistics:", error);
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
          Welcome back, {adminUser.name}! 
        </h1>
        <p className="text-red-100 text-sm md:text-base max-w-xl">
          Welcome to your dashboard. From here, you can easily monitor platform activities, track total configurations, and manage urgent blood donation requests.
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
          <div className="p-4 bg-red-50 rounded-lg text-red-600"><FaUsers size={28} /></div>
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
          <div className="p-4 bg-red-50 rounded-lg text-red-600"><FaHandHoldingHeart size={28} /></div>
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
          <div className="p-4 bg-red-50 rounded-lg text-red-600"><FaHeartbeat size={28} /></div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
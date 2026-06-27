'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { MapPin, Calendar, Clock, User, ArrowRight, Heart } from 'lucide-react';

const BloodDonationRequests = () => {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        // ব্যাকএন্ড API থেকে পেন্ডিং রিকোয়েস্টগুলো নেওয়া হচ্ছে
        const res = await fetch('http://localhost:5000/api/donation-requests?status=pending');
        const result = await res.json();
        
        if (result.success) {
          // শুধু pending স্ট্যাটাসের ডাটা ফিল্টার করে রাখা হলো
          const pendingData = result.data.filter(req => req.status === 'pending');
          setRequests(pendingData);
        }
      } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  // প্রাইভেট রুট প্রটেকশন এবং রিডাইরেকশন হ্যান্ডলার
  const handleViewDetails = (id) => {
    if (!session?.user) {
      // ইউজার লগইন না থাকলে মেসেজ দেখিয়ে লগইন পেজে পাঠানো হবে
      alert("অনুমতি নেই! বিস্তারিত দেখতে আপনাকে অবশ্যই প্রথমে লগইন করতে হবে।");
      router.push('/login');
    } else {
      // লগইন থাকলে ডাইনামিক ডিটেইলস পেজে রিডাইরেক্ট করবে
    router.push(`/donation-requests/${id}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* 📋 সেকশন হেডার */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-2">
            Pending Donation Requests 🩸
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            বর্তমানে সক্রিয় এবং অপেক্ষমাণ রক্তের জরুরি রিকোয়েস্টগুলোর তালিকা।
          </p>
        </div>

        {/* ⏳ ডাটা লোডিং কন্ডিশন (Skeleton Loading Effect) */}
        {loading || isAuthLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full pt-4"></div>
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          // 📭 ডাটা না থাকলে খালি স্টেট দেখাবে
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto mt-12">
            <Heart className="text-gray-300 mx-auto mb-3" size={40} />
            <h3 className="text-lg font-bold text-gray-700">কোনো আবেদন পাওয়া যায়নি</h3>
            <p className="text-gray-400 text-sm mt-1">এই মুহূর্তে কোনো পেন্ডিং ব্লাড রিকোয়েস্ট নেই।</p>
          </div>
        ) : (
          // 🗂️ মেইন কার্ড গ্রিড
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div 
                key={request._id} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* 🩸 Blood Group Badge */}
                <div className="absolute top-4 right-4 bg-red-50 text-red-600 border border-red-100 font-black px-3 py-1 rounded-xl text-sm">
                  {request.bloodGroup}
                </div>

                <div>
                  {/* Recipient Name Profile Label */}
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <User size={14} /> 
                    <span>Recipient Name</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 truncate">
                    {request.recipientName}
                  </h3>

                  {/* 📍 Location, Date & Time Meta */}
                  <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                    {/* Location */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="text-gray-400 mt-0.5 shrink-0" size={16} />
                      <span className="truncate">
                        {request.hospitalName || `${request.upazila}, ${request.district}`}
                      </span>
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-2.5">
                      <Calendar className="text-gray-400 shrink-0" size={16} />
                      <span>{request.donationDate}</span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center gap-2.5">
                      <Clock className="text-gray-400 shrink-0" size={16} />
                      <span>{request.donationTime}</span>
                    </div>
                  </div>
                </div>

                {/* 🔘 View Button */}
                <button
                  onClick={() => handleViewDetails(request._id)}
                  className="w-full bg-gray-50 group-hover:bg-red-600 text-gray-700 group-hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 border border-gray-100 group-hover:border-transparent"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
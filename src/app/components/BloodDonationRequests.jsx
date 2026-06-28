



'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { MapPin, Calendar, Clock, User, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react'; // Framer Motion ইম্পোর্ট করা হয়েছে

const BloodDonationRequests = () => {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fatching pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests?status=pending&page=${page}&limit=6`);
        const result = await res.json();
        // console.log("Current Page:", page);
        // console.log("API Response:", result);


        if (result.success) {
          // console.log(result);
          setRequests(result.data || []);
          setTotalPages(result.totalPages || 1);
        }
      } catch (error) {
        console.error("problem with fetching pending requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [page]);


  const handleViewDetails = (id) => {
    if (!session?.user) {
      alert("অনুমতি নেই! বিস্তারিত দেখতে আপনাকে অবশ্যই প্রথমে লগইন করতে হবে।");
      router.push('/login');
    } else {
      router.push(`/donation-requests/${id}`);
    }
  };

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

   
        <div className="mb-12 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-3 p-3 bg-red-100 text-red-600 rounded-full text-3xl"
          >
            🩸
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight"
          >
            Pending Donation Requests
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-2"
          >
            List of currently active and pending urgent blood requests.
          </motion.p>
        </div>

        {/* ⏳ Data Loading Condition (Skeleton Loading Effect) */}
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
          /* 📭 Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto mt-12"
          >
            <Heart className="text-gray-300 mx-auto mb-3 animate-pulse" size={40} />
            <h3 className="text-lg font-bold text-gray-700">No requests found</h3>
            <p className="text-gray-400 text-sm mt-1">There are no pending blood requests at this moment.</p>
          </motion.div>
        ) : (
          /* 🗂️ Main Card Grid (Motion Added) */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {requests.map((request) => (

              
              
              <div
                key={request._id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group"
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
                    <div className="flex items-start gap-2.5">
                      <MapPin className="text-gray-400 mt-0.5 shrink-0" size={16} />
                      <span className="truncate">
                        {request.hospitalName || `${request.upazila}, ${request.district}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="text-gray-400 shrink-0" size={16} />
                      <span>{request.donationDate}</span>
                    </div>
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
          </motion.div>
        )}
      </div>

      {/* 🔢 Pagination Control */}
      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === index + 1
                  ? "bg-red-600 text-white shadow-md shadow-red-100"
                  : "border bg-white hover:bg-gray-100"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationRequests;
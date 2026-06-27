// 'use client';
// import React, { useState, useEffect, use } from 'react';
// import { useRouter } from 'next/navigation';
// import { authClient } from '@/lib/auth-client';
// import { 
//   Heart, MapPin, Calendar, Clock, User, Phone, 
//   Building2, Droplet, FileText, AlertCircle, CheckCircle2, X 
// } from 'lucide-react';

// const DonationRequestDetails = ({ params }) => {
//   // Next.js 15+ এর নিয়ম অনুযায়ী params আনর‍্যাপ করা হয়েছে
//   const unwrappedParams = use(params);
//   const requestId = unwrappedParams.id;
  
//   const router = useRouter();
//   const { data: session, isPending: isAuthLoading } = authClient.useSession();
//   const loggedInUser = session?.user;

//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 🔒 সিকিউরিটি চেক: লগইন না থাকলে সরাসরি রিডাইরেক্ট করবে
//   useEffect(() => {
//     if (!isAuthLoading && !loggedInUser) {
//       router.push('/login');
//     }
//   }, [loggedInUser, isAuthLoading, router]);

//   // 📡 নির্দিষ্ট রিকোয়েস্টের বিস্তারিত তথ্য ফেচ করা
//   useEffect(() => {
//     if (!requestId) return;
    
//     const fetchRequestDetails = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/donation-requests/${requestId}`);
//         const result = await res.json();
//         if (result.success) {
//           setRequest(result.data);
//         }
//       } catch (error) {
//         console.error("বিস্তারিত তথ্য লোড করতে ব্যর্থ:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequestDetails();
//   }, [requestId]);

//   // 🤝 ডোনেশন কনফার্মেশন হ্যান্ডলার (পেন্ডিং থেকে ইন-প্রোগ্রেস করা)
//   const handleConfirmDonation = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch(`http://localhost:5000/api/donation-requests/${requestId}/donate`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           donorName: loggedInUser?.name,
//           donorEmail: loggedInUser?.email,
//           status: 'inprogress', // স্ট্যাটাস আপডেট
//         }),
//       });

//       const result = await res.json();

//       if (result.success) {
//         alert("ডোনেশন সফলভাবে কনফার্ম হয়েছে! রিকোয়েস্টটি এখন চলমান (In Progress)।");
//         setIsModalOpen(false);
//         // পেজের ডাটা রিফ্রেশ করা
//         setRequest(prev => ({ ...prev, status: 'inprogress' }));
//       } else {
//         alert(result.message || "কনফার্ম করতে সমস্যা হয়েছে।");
//       }
//     } catch (error) {
//       console.error("ডোনেশন সাবমিট এরর:", error);
//       alert("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isAuthLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center space-y-2">
//           <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="text-gray-500 text-sm font-medium">তথ্য লোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!request) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm border border-gray-100">
//           <AlertCircle className="text-red-500 mx-auto mb-3" size={40} />
//           <h3 className="font-bold text-lg text-gray-800">রিকোয়েস্টটি পাওয়া যায়নি</h3>
//           <p className="text-gray-400 text-sm mt-1">হয়তো রিকোয়েস্টটি মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
//         {/* 🩸 টপ ব্যানার ও ব্লাড গ্রুপ */}
//         <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase ${
//               request.status === 'pending' ? 'bg-yellow-400 text-yellow-950' : 'bg-blue-500 text-white'
//             }`}>
//               {request.status === 'pending' ? '⏳ Pending' : '🔄 In Progress'}
//             </span>
//             <h1 className="text-2xl font-black">{request.recipientName}-এর জন্য রক্তের আবেদন</h1>
//           </div>
//           <div className="bg-white text-red-600 font-black text-3xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shrink-0">
//             {request.bloodGroup}
//           </div>
//         </div>

//         {/* 📋 বিস্তারিত তথ্যের তালিকা */}
//         <div className="p-6 md:p-8 space-y-6">
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* হাসপাতাল ও লোকেশন */}
//             <div className="space-y-4">
//               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">📍 চিকিৎসা ও স্থান</h3>
//               <div className="flex gap-3 items-start text-sm">
//                 <Building2 className="text-gray-400 shrink-0 mt-0.5" size={18} />
//                 <div>
//                   <p className="font-semibold text-gray-800">হাসপাতালের নাম</p>
//                   <p className="text-gray-600">{request.hospitalName}</p>
//                 </div>
//               </div>
//               <div className="flex gap-3 items-start text-sm">
//                 <MapPin className="text-gray-400 shrink-0 mt-0.5" size={18} />
//                 <div>
//                   <p className="font-semibold text-gray-800">ঠিকানা</p>
//                   <p className="text-gray-600">{request.upazila}, {request.district}</p>
//                 </div>
//               </div>
//             </div>

//             {/* সময় ও পরিমাণ */}
//             <div className="space-y-4">
//               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">📅 সময়সূচী ও পরিমাণ</h3>
//               <div className="flex gap-3 items-start text-sm">
//                 <Calendar className="text-gray-400 shrink-0 mt-0.5" size={18} />
//                 <div>
//                   <p className="font-semibold text-gray-800">তারিখ</p>
//                   <p className="text-gray-600">{request.donationDate}</p>
//                 </div>
//               </div>
//               <div className="flex gap-3 items-start text-sm">
//                 <Clock className="text-gray-400 shrink-0 mt-0.5" size={18} />
//                 <div>
//                   <p className="font-semibold text-gray-800">সময়</p>
//                   <p className="text-gray-600">{request.donationTime}</p>
//                 </div>
//               </div>
//               <div className="flex gap-3 items-start text-sm">
//                 <Droplet className="text-gray-400 shrink-0 mt-0.5" size={18} />
//                 <div>
//                   <p className="font-semibold text-gray-800">রক্তের পরিমাণ</p>
//                   <p className="text-gray-600">{request.donationQuantity || '১ ব্যাগ'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <hr className="border-gray-100" />

//           {/* যোগাযোগ ও রোগীর অবস্থা */}
//           <div className="space-y-4">
//             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ℹ️ অতিরিক্ত তথ্য</h3>
//             <div className="flex gap-3 items-start text-sm">
//               <Phone className="text-gray-400 shrink-0 mt-0.5" size={18} />
//               <div>
//                 <p className="font-semibold text-gray-800">যোগাযোগের নম্বর</p>
//                 <p className="text-gray-600">{request.contactNumber || '+880 XXXXX-XXXXXX'}</p>
//               </div>
//             </div>
//             <div className="flex gap-3 items-start text-sm">
//               <FileText className="text-gray-400 shrink-0 mt-0.5" size={18} />
//               <div>
//                 <p className="font-semibold text-gray-800">রোগীর সমস্যা / কারণ</p>
//                 <p className="text-gray-600 leading-relaxed">{request.medicalReason || 'জরুরি প্রয়োজনে রক্ত লাগবে।'}</p>
//               </div>
//             </div>
//           </div>

//           {/* 🔘 অ্যাকশন বাটন সেকশন */}
//           <div className="pt-6 border-t border-gray-100 mt-8 flex justify-end">
//             {request.status === 'pending' ? (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm"
//               >
//                 <Heart size={18} className="fill-white" />
//                 <span>Donate</span>
//               </button>
//             ) : (
//               <div className="bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl flex items-center gap-2 text-sm border border-gray-200">
//                 <CheckCircle2 size={18} className="text-gray-400" />
//                 <span>Donation in Progress</span>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* ================= 📋 DONATION CONFIRMATION MODAL ================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
//           <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            
//             {/* ক্লোজ বাটন */}
//             <button 
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
//             >
//               <X size={20} />
//             </button>

//             {/* মডাল হেডার */}
//             <div className="text-center mb-6">
//               <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <Heart size={24} className="fill-red-600" />
//               </div>
//               <h2 className="text-xl font-extrabold text-gray-800">ডোনেশন নিশ্চিত করুন</h2>
//               <p className="text-xs text-gray-400 mt-1">আপনি কি এই রোগীকে রক্ত দিতে ইচ্ছুক?</p>
//             </div>

//             {/* মডাল ফর্ম */}
//             <form onSubmit={handleConfirmDonation} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Donor Name</label>
//                 <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium">
//                   <User size={16} className="text-gray-400" />
//                   <input 
//                     type="text" 
//                     value={loggedInUser?.name || ''} 
//                     readOnly 
//                     className="bg-transparent w-full focus:outline-none cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Donor Email</label>
//                 <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium">
//                   <User size={16} className="text-gray-400" />
//                   <input 
//                     type="email" 
//                     value={loggedInUser?.email || ''} 
//                     readOnly 
//                     className="bg-transparent w-full focus:outline-none cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-800 text-xs flex gap-2">
//                 <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
//                 <span>কনফার্ম করার সাথে সাথে রিকোয়েস্টটির স্ট্যাটাস <strong>Pending</strong> থেকে <strong>In Progress</strong>-এ পরিবর্তিত হয়ে যাবে।</span>
//               </div>

//               {/* অ্যাকশন বাটনসমূহ */}
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-colors text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <span>Confirm</span>
//                   )}
//                 </button>
//               </div>

//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default DonationRequestDetails;


'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { 
  Heart, MapPin, Calendar, Clock, User, Phone, 
  Building2, Droplet, FileText, AlertCircle, CheckCircle2, X 
} from 'lucide-react';

const DonationRequestDetails = ({ params }) => {
  // Next.js 15+ এর নিয়ম অনুযায়ী params আনর‍্যাপ করা
  const unwrappedParams = use(params);
  const requestId = unwrappedParams?.id;
  
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const loggedInUser = session?.user;

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Base URL (Environment Variable বা fallback localhost)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // 🔒 সিকিউরিটি চেক: লগইন না থাকলে রিডাইরেক্ট
  useEffect(() => {
    if (!isAuthLoading && !loggedInUser) {
      router.push('/login');
    }
  }, [loggedInUser, isAuthLoading, router]);

  // 📡 নির্দিষ্ট রিকোয়েস্টের বিস্তারিত তথ্য ফেচ করার ফাংশন
  const fetchRequestDetails = async () => {
    if (!requestId) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/donation-requests/${requestId}`);
      const result = await res.json();
      if (result.success) {
        setRequest(result.data);
      }
    } catch (error) {
      console.error("বিস্তারিত তথ্য লোড করতে ব্যর্থ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  // 🤝 ডোনেশন কনফার্মেশন হ্যান্ডলার
  const handleConfirmDonation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/donation-requests/${requestId}/donate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorName: loggedInUser?.name,
          donorEmail: loggedInUser?.email,
          status: 'inprogress',
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("ডোনেশন সফলভাবে কনফার্ম হয়েছে! রিকোয়েস্টটি এখন চলমান (In Progress)।");
        setIsModalOpen(false);
        // ডাটা পুনরায় ফেচ করে পেজ আপডেট করা
        fetchRequestDetails();
      } else {
        alert(result.message || "কনফার্ম করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      console.error("ডোনেশন সাবমিট এরর:", error);
      alert("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm font-medium"> his তথ্য লোড হচ্ছে, দয়া করে অপেক্ষা করুন...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm border border-gray-100">
          <AlertCircle className="text-red-500 mx-auto mb-3" size={40} />
          <h3 className="font-bold text-lg text-gray-800">রিকোয়েস্টটি পাওয়া যায়নি</h3>
          <p className="text-gray-400 text-sm mt-1">হয়তো রিকোয়েস্টটি মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* 🩸 টপ ব্যানার ও ব্লাড গ্রুপ */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase ${
              request.status === 'pending' ? 'bg-yellow-400 text-yellow-950' : 'bg-blue-500 text-white'
            }`}>
              {request.status === 'pending' ? '⏳ Pending' : '🔄 In Progress'}
            </span>
            <h1 className="text-2xl font-black">{request.recipientName}-এর জন্য রক্তের আবেদন</h1>
          </div>
          <div className="bg-white text-red-600 font-black text-3xl w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shrink-0">
            {request.bloodGroup}
          </div>
        </div>

        {/* 📋 বিস্তারিত তথ্যের তালিকা */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* হাসপাতাল ও লোকেশন */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">📍 চিকিৎসা ও স্থান</h3>
              <div className="flex gap-3 items-start text-sm">
                <Building2 className="text-gray-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-gray-800">হাসপাতালের নাম</p>
                  <p className="text-gray-600">{request.hospitalName}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start text-sm">
                <MapPin className="text-gray-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-gray-800">ঠিকানা</p>
                  <p className="text-gray-600">{request.upazila}, {request.district}</p>
                </div>
              </div>
            </div>

            {/* সময় ও পরিমাণ */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">📅 সময়সূচী ও পরিমাণ</h3>
              <div className="flex gap-3 items-start text-sm">
                <Calendar className="text-gray-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-gray-800">তারিখ</p>
                  <p className="text-gray-600">{request.donationDate}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start text-sm">
                <Clock className="text-gray-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-gray-800">সময়</p>
                  <p className="text-gray-600">{request.donationTime}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start text-sm">
                <Droplet className="text-gray-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-gray-800">রক্তের পরিমাণ</p>
                  <p className="text-gray-600">{request.donationQuantity || '১ ব্যাগ'}</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* যোগাযোগ ও রোগীর অবস্থা */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ℹ️ অতিরিক্ত তথ্য</h3>
            <div className="flex gap-3 items-start text-sm">
              <Phone className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-gray-800">যোগাযোগের নম্বর</p>
                <p className="text-gray-600">{request.contactNumber || '+880 XXXXX-XXXXXX'}</p>
              </div>
            </div>
            <div className="flex gap-3 items-start text-sm">
              <FileText className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-gray-800">রোগীর সমস্যা / কারণ</p>
                <p className="text-gray-600 leading-relaxed">{request.medicalReason || 'জরুরি প্রয়োজনে রক্ত লাগবে।'}</p>
              </div>
            </div>
          </div>

          {/* 🔘 অ্যাকশন বাটন সেকশন */}
          <div className="pt-6 border-t border-gray-100 mt-8 flex justify-end">
            {request.status === 'pending' ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm"
              >
                <Heart size={18} className="fill-white" />
                <span>Donate</span>
              </button>
            ) : (
              <div className="bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl flex items-center gap-2 text-sm border border-gray-200">
                <CheckCircle2 size={18} className="text-gray-400" />
                <span>Donation in Progress</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= 📋 DONATION CONFIRMATION MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart size={24} className="fill-red-600" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-800">ডোনেশন নিশ্চিত করুন</h2>
              <p className="text-xs text-gray-400 mt-1">আপনি কি এই রোগীকে রক্ত দিতে ইচ্ছুক?</p>
            </div>

            <form onSubmit={handleConfirmDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Donor Name</label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium">
                  <User size={16} className="text-gray-400" />
                  <input 
                    type="text" 
                    value={loggedInUser?.name || ''} 
                    readOnly 
                    className="bg-transparent w-full focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Donor Email</label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium">
                  <User size={16} className="text-gray-400" />
                  <input 
                    type="email" 
                    value={loggedInUser?.email || ''} 
                    readOnly 
                    className="bg-transparent w-full focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-800 text-xs flex gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <span>কনফার্ম করার সাথে সাথে রিকোয়েস্টটির স্ট্যাটাস <strong>Pending</strong> থেকে <strong>In Progress</strong>-এ পরিবর্তিত হয়ে যাবে।</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Confirm</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
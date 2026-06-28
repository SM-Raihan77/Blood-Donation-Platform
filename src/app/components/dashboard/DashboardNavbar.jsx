// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { authClient } from '@/lib/auth-client'; 
// import { Home, LayoutDashboard, User, LogOut } from 'lucide-react';

// const DashboardNavbar = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [isOpen, setIsOpen] = useState(false);

//   const getInitial = (name) => {
//     return name ? name.charAt(0).toUpperCase() : 'U';
//   };

//   const handleLogout = async () => {
//     try {
//       await authClient.signOut();
//       window.location.href = '/login';
//     } catch (error) {
//       console.error("লগআউট করতে সমস্যা হয়েছে:", error);
//     }
//   };

//   if (!user) return null;

//   return (
//     // 🌍 পুরো নেভবার কন্টেনার (justify-between এর কারণে প্রোফাইল ডান পাশে চলে যাবে)
//     <nav className="flex items-center justify-between w-full px-6 py-3 bg-white border-b border-gray-200">
      
//       {/* 🏷️ বাম পাশের টাইটেল বা লোগো */}
//       <div className="text-lg font-semibold text-gray-700">
//         Navbar
//       </div>

//       {/* 👤 ডান পাশের প্রোফাইল ড্রপডাউন সেকশন */}
//       <div className="relative inline-block text-left">
        
//         {/* 🔘 নেভবার প্রোফাইল বাটন */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-bold text-lg border border-gray-300 hover:bg-gray-300 transition-colors focus:outline-none"
//         >
//           {user.image ? (
//             <img 
//               src={user.image} 
//               alt={user.name} 
//               className="w-full h-full rounded-full object-cover"
//             />
//           ) : (
//             <span>{getInitial(user.name)}</span>
//           )}
//         </button>

//         {/* 📋 ড্রপডাউন মেনু */}
//         {isOpen && (
//           <>
//             <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>

//             <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-40">
              
//               {/* ইউজার ইনফো সেকশন */}
//               <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-md">
//                   {getInitial(user.name)}
//                 </div>
//                 <div className="overflow-hidden">
//                   <h4 className="text-sm font-bold text-gray-800 truncate">{user.name || 'kasemvai!'}</h4>
//                   <p className="text-xs text-gray-400 truncate">{user.email || 'donor@gmail.com'}</p>
//                 </div>
//               </div>

//               {/* মেনু লিংকসমূহ */}
//               <div className="mt-2 px-2 space-y-1">
                
//                 {/* 🏠 Home Link */}
//                 <Link
//                   href="/"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
//                 >
//                   <Home className="text-gray-400" size={18} />
//                   <span>Home</span>
//                 </Link>

//                 {/* 📊 Dashboard Link */}
//                 <Link
//                   href="/dashboard"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
//                 >
//                   <LayoutDashboard className="text-gray-400" size={18} />
//                   <span>Dashboard</span>
//                 </Link>

//                 {/* 👤 Profile Link */}
//                 <Link
//                   href="/dashboard/donor/profile"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
//                 >
//                   <User className="text-gray-400" size={18} />
//                   <span>Profile</span>
//                 </Link>

//                 <div className="border-t border-gray-100 my-1"></div>

//                 {/* 🚪 Logout Button */}
//                 <button
//                   onClick={() => {
//                     setIsOpen(false);
//                     handleLogout();
//                   }}
//                   className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
//                 >
//                   <LogOut className="text-red-400" size={18} />
//                   <span>Logout</span>
//                 </button>

//               </div>

//             </div>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default DashboardNavbar;



'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client'; 
import { Home, LayoutDashboard, User, LogOut, Megaphone } from 'lucide-react';

const DashboardNavbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    // 🌍 গ্যাপ কমানোর জন্য py-3 থেকে কমিয়ে py-1.5 এবং border-b নিশ্চিত করা হয়েছে
    <nav className="flex items-center justify-between w-full px-4 py-1.5 bg-white border-b border-gray-200 h-14">
      
      {/* 📢 বাম এবং মাঝখানের অংশ: ডান থেকে বামে স্ক্রলিং টেক্সট (Marquee Effect) */}
      <div className="flex-1 flex items-center gap-2 overflow-hidden mr-6 max-w-[70%] md:max-w-[80%]">
        {/* একটি ছোট অ্যানিমেটেড আইকন */}
        <Megaphone className="text-red-500 animate-pulse shrink-0" size={18} />
        
        {/* স্ক্রলিং কন্টেইনার */}
        <div className="w-full overflow-hidden whitespace-nowrap relative">
          <div className="inline-block animate-marquee text-sm font-semibold text-red-600">
            ⚠️ Emergency: O+ Blood needed at Comilla Sadar Hospital! Contact: +8801XXXXXXXXX || 🩸 Total 32 donors joined today. Be a hero, save lives!
          </div>
        </div>
      </div>

      {/* 👤 ডান পাশের প্রোফাইল ড্রপডাউন সেকশন */}
      <div className="relative inline-block text-left shrink-0">
        
        {/* 🔘 নেভবার প্রোফাইল বাটন */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-bold text-base border border-gray-300 hover:bg-gray-300 transition-colors focus:outline-none"
        >
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{getInitial(user.name)}</span>
          )}
        </button>

        {/* 📋 ড্রপডাউন মেনু */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>

            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-40">
              
              {/* ইউজার ইনফো সেকশন */}
              <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-md">
                  {getInitial(user.name)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-gray-800 truncate">{user.name || 'Guest User'}</h4>
                  <p className="text-xs text-gray-400 truncate">{user.email || 'user@gmail.com'}</p>
                </div>
              </div>

              {/* মেনু লিংকসমূহ */}
              <div className="mt-2 px-2 space-y-1">
                
                {/* 🏠 Home Link */}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Home className="text-gray-400" size={18} />
                  <span>Home</span>
                </Link>

                {/* 📊 Dashboard Link */}
                {/* <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="text-gray-400" size={18} />
                  <span>Dashboard</span>
                </Link> */}

                {/* 👤 Profile Link */}
                <Link
                  href="/dashboard/donor/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <User className="text-gray-400" size={18} />
                  <span>Profile</span>
                </Link>

                <div className="border-t border-gray-100 my-1"></div>

                {/* 🚪 Logout Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
                >
                  <LogOut className="text-red-400" size={18} />
                  <span>Logout</span>
                </button>

              </div>

            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
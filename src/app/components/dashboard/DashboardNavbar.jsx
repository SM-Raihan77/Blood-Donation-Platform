
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
    
    <nav className="flex items-center justify-between w-full px-4 py-1.5 bg-white border-b border-gray-200 h-14">
      
     
      <div className="flex-1 flex items-center gap-2 overflow-hidden mr-6 max-w-[70%] md:max-w-[80%]">
       
        <Megaphone className="text-red-500 animate-pulse shrink-0" size={18} />
        
      
        <div className="w-full overflow-hidden whitespace-nowrap relative">
          <div className="inline-block animate-marquee text-sm font-semibold text-red-600">
            ⚠️ Emergency: O+ Blood needed at Comilla Sadar Hospital! Contact: +8801XXXXXXXXX || 🩸 Total 32 donors joined today. Be a hero, save lives!
          </div>
        </div>
      </div>

    
      <div className="relative inline-block text-left shrink-0">
        
     
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

        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>

            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-40">
              
             
              <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-md">
                  {getInitial(user.name)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-gray-800 truncate">{user.name || 'Guest User'}</h4>
                  <p className="text-xs text-gray-400 truncate">{user.email || 'user@gmail.com'}</p>
                </div>
              </div>

          
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
// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { FaTicketAlt, FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
// // // import Logo from "./Logo";
// // // import ThemeSwitcher from "./ThemeSwitcher";react-icons/fa"

// // export default function Navbar() {
// //   const pathname = usePathname();
// //   const [isLoggedIn, setIsLoggedIn] = useState(true);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setDropdownOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setDropdownOpen(false);
// //     alert("Logged Out! (Design Only)");
// //   };



// //   const mockUser = {
// //     name: "Jane Doe",
// //     email: "jane@example.com",
// //     role: "attendee",
// //     image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
// //   };

// //   return (
// //     <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
// //       <div className="max-w-7xl mx-auto flex items-center justify-between">
// //         {/* LOGO */}
// //         {/* <Logo /> */}

// //         {/* NAVIGATION LINKS */}
// //         <div className="hidden sm:flex items-center gap-8">
// //           <Link
// //             href="/"
// //             className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             href="/events"
// //             className={`text-sm font-medium transition-colors ${pathname.startsWith("/events") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
// //           >
// //             Donation Requests
// //           </Link>
// //           {isLoggedIn && (
// //             <Link
// //               href={"/"}
// //               className={`text-sm font-medium transition-colors ${pathname.startsWith("/dashboard") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
// //             >
// //               Dashboard
// //             </Link>
// //           )}
// //         </div>

// //         {/* RIGHT ACTIONS */}
// //         <div className="flex items-center gap-4">


// //           {!isLoggedIn && (
// //             <div className="flex items-center gap-3">
// //               <button
// //                 onClick={() => setIsLoggedIn(true)}
// //                 className="inline-flex items-center justify-center font-semibold text-xs text-slate-300 hover:text-white h-9 px-4 rounded-xl hover:bg-white/5 transition"
// //               >
// //                 Login
// //               </button>
// //               <Link
// //                 href="/register"
// //                 className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition h-9 px-4 rounded-xl"
// //               >
// //                 Sign Up
// //               </Link>
// //             </div>
// //           )}

// //           {isLoggedIn && (
// //             <div className="relative" ref={dropdownRef}>
// //               <button
// //                 onClick={() => setDropdownOpen(!dropdownOpen)}
// //                 className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
// //               >
// //                 <img
// //                   className="w-9 h-9 rounded-full object-cover border border-pink-500 shadow-md shadow-pink-500/10"
// //                   src={mockUser.image}
// //                   alt="avatar"
// //                 />
// //               </button>

// //               {dropdownOpen && (
// //                 <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200">
// //                   {/* User info */}
// //                   <div className="px-4 py-2.5 border-b border-white/5 mb-1.5 cursor-default">
// //                     <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
// //                       {mockUser.role} Account
// //                     </p>
// //                     <p className="font-bold text-white text-sm mt-0.5">{mockUser.name}</p>
// //                     <p className="text-[11px] text-slate-400 truncate mt-0.5">{mockUser.email}</p>
// //                   </div>

// //                   {/* Actions */}
// //                   <Link
// //                     href="/dashboard/organizer"
// //                     onClick={() => setDropdownOpen(false)}
// //                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
// //                   >
// //                     <FaThLarge className="text-slate-400 text-sm shrink-0" />
// //                     <span>My Dashboard</span>
// //                   </Link>

// //                   <Link
// //                     href={`/dashboard/${mockUser.role}`}
// //                     onClick={() => setDropdownOpen(false)}
// //                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
// //                   >
// //                     <FaUser className="text-slate-400 text-sm shrink-0" />
// //                     <span>Profile Settings</span>
// //                   </Link>

// //                   <div className="border-t border-white/5 my-1.5" />

// //                   <button
// //                     onClick={handleLogout}
// //                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
// //                   >
// //                     <FaSignOutAlt className="text-sm shrink-0 text-red-400" />
// //                     <span>Log Out</span>
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaTicketAlt, FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
// // import Logo from "./Logo";
// // import ThemeSwitcher from "./ThemeSwitcher";
// import { useRouter } from "next/navigation";
// import { authClient, useSession } from "@/lib/auth-client";
// import Image from "next/image";

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     await authClient.signOut();
//     router.push("/");
//   };
//   // console.log(session);


//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* LOGO */}
//         {/* <Logo /> */}

//         {/* NAVIGATION LINKS */}
//         <div className="hidden sm:flex items-center gap-8">
//           <Link
//             href="/"
//             className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
//           >
//             Home
//           </Link>
//           <Link
//             href="/events"
//             className={`text-sm font-medium transition-colors ${pathname.startsWith("/events") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
//           >
//             Browse Events
//           </Link>
//           {session && session?.user && (
//             <Link
//               href={`/dashboard/${session?.user?.role}`}
//               className={`text-sm font-medium transition-colors ${pathname.startsWith("/dashboard") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
//             >
//               Dashboard
//             </Link>
//           )}
//         </div>

//         {/* RIGHT ACTIONS */}
//         <div className="flex items-center gap-4">


//           {!session && (
//             <div className="flex items-center gap-3">
//               <Link href="/login">
//                 <button
//                   className="inline-flex items-center justify-center font-semibold text-xs text-slate-300 hover:text-white h-9 px-4 rounded-xl hover:bg-white/5 transition"
//                 >
//                   Login
//                 </button>
//               </Link>
//               <Link
//                 href="/register"
//                 className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition h-9 px-4 rounded-xl"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}

//           {session && session?.user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
//               >
//                 <Image
//                   width={20}
//                   height={20}
//                   className="w-9 h-9 rounded-full object-cover border border-pink-500 shadow-md shadow-pink-500/10"
//                   src={session?.user?.image}
//                   alt="avatar"
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200">
//                   {/* User info */}
//                   <div className="px-4 py-2.5 border-b border-white/5 mb-1.5 cursor-default">
//                     <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
//                       {session.user.role} Account
//                     </p>
//                     <p className="font-bold text-white text-sm mt-0.5">{session.user.name}</p>
//                     <p className="text-[11px] text-slate-400 truncate mt-0.5">{session.user.email}</p>
//                   </div>

//                   {/* Actions */}
//                   <Link
//                     href="/dashboard/organizer"
//                     onClick={() => setDropdownOpen(false)}
//                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
//                   >
//                     <FaThLarge className="text-slate-400 text-sm shrink-0" />
//                     <span>My Dashboard</span>
//                   </Link>

//                   <Link
//                     href={`/dashboard/${session.user.role}`}
//                     onClick={() => setDropdownOpen(false)}
//                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
//                   >
//                     <FaUser className="text-slate-400 text-sm shrink-0" />
//                     <span>Profile Settings</span>
//                   </Link>

//                   <div className="border-t border-white/5 my-1.5" />

//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
//                   >
//                     <FaSignOutAlt className="text-sm shrink-0 text-red-400" />
//                     <span>Log Out</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//         </div>
//       </div>
//     </nav>
//   );
// }




"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  if (pathname.includes('dashboard')) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href={'/'}>
              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  loading="eager"
                  src="/logo.webp"
                  alt="logo"
                />
                <p className="font-bold">Tech Bazaar</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link
                href="/products"
                className="font-medium text-accent"
                aria-current="page"
              >
                Browse Products
              </Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
            {/* ইউজার লগইন থাকলে ডেস্কটপে এই Donation লিঙ্কটি দেখাবে */}
            {user && (
              <li>
                <Link href="/donation">Donation</Link>
              </li>
            )}
          </ul>

          {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link href="/login">Login</Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="User Avatar"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="new-file" textValue="New file">
                      <Link
                        className="flex items-center gap-2"
                        href={`/dashboard/${user?.role}`}
                      >
                        <MdDashboard />
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="copy-link" textValue="Copy link">
                      <CgProfile />
                      <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="delete-file"
                      textValue="Delete file"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      <BiLogOut />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="#" className="block py-2">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="block py-2 font-medium text-accent">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="block py-2">
                  Pricing
                </Link>
              </li>
              {/* ইউজার লগইন থাকলে মোবাইলেও Donation লিঙ্কটি দেখাবে */}
              {user && (
                <li>
                  <Link href="/donation" className="block py-2">
                    Donation
                  </Link>
                </li>
              )}
              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                <Link href="/login" className="block py-2">
                  Login
                </Link>
                <Link href="/register" className="block py-2">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
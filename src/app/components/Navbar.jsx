"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";


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
    // ন্যাভবারটি ফিক্সড করার পর পেজের অন্যান্য কন্টেন্ট যাতে উপরে চেপে না যায়, 
    // সেজন্য পেরেন্ট ডিভে h-16 নিশ্চিত করা হয়েছে।
    <div className="w-full h-16 relative">
      {/* fixed top-0 left-0 এবং w-full ব্যবহারের মাধ্যমে এটিকে স্ক্রিনের সাথে পার্মানেন্টলি আটকে দেওয়া হয়েছে */}
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-separator bg-background/80 backdrop-blur-lg shadow-sm">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          
          {/* লোগো এবং মোবাইল হ্যামবার্গার মেনু */}
          <div className="flex items-center gap-4 md:flex-1">
            <button
              className="md:hidden text-slate-700"
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
            
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-red-600 text-white p-2 rounded-full shadow-md shadow-red-200">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Bhado<span className="text-red-600">N.</span>
              </span>
            </div>
          </div>

          {/* ডেক্সটপ নেভিগেশন লিংকসমূহ */}
          <div className="hidden md:flex justify-center md:flex-1">
            <ul className="flex items-center gap-4">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/search">Search</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink href="/donation">Donation</NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* ইউজার প্রোফাইল / অথেনটিকেশন বাটনসমূহ */}
          <div className="flex items-center justify-end gap-4 md:flex-1">
            {!user && (
              <div className="hidden items-center gap-4 md:flex">
               
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-5">
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            )}

            {user && (
              <div className="flex items-center gap-4">
                <Dropdown placement="bottom-end">
                  <Dropdown.Trigger className="rounded-full cursor-pointer">
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
                        <NavLink
                          className="flex items-center gap-2 w-full h-full"
                          href={`/dashboard/${user?.role}`}
                        >
                          <MdDashboard />
                          <Label>Dashboard</Label>
                        </NavLink>
                      </Dropdown.Item>

                      <Dropdown.Item id="copy-link" textValue="Copy link">
                        <NavLink className="w-full h-full block" href={`dashboard/donor/profile`}>
                          <CgProfile className="inline mr-2" />
                          <Label>Profile</Label>
                        </NavLink>
                      </Dropdown.Item>

                      <Dropdown.Item
                        id="delete-file"
                        textValue="Delete file"
                        variant="danger"
                        onClick={handleSignOut}
                      >
                        <div className="flex items-center gap-2 text-red-600">
                          <BiLogOut />
                          <Label>Logout</Label>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            )}
            <ThemeSwitch />
          </div>

        </header>

        {/* মোবাইল রেসপনসিভ ড্রপডাউন মেনু */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden bg-background w-full shadow-lg absolute left-0 top-16">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <NavLink href="/" className="block py-2">Home</NavLink>
              </li>
              <li>
                <NavLink href="/search" className="block py-2">Search</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink href="/donation" className="block py-2">Donation</NavLink>
                  </li>
                  <li>
                    <NavLink href="/dashboard" className="block py-2">Dashboard</NavLink>
                  </li>
                </>
              )}
              {!user && (
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                  <NavLink href="/login" className="block py-2">Login</NavLink>
                  <NavLink href="/register" className="block py-2">Sign Up</NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
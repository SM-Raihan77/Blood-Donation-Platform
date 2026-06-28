"use client";

import React from "react";
import { Heart, Users, Home } from "lucide-react";
import { motion } from "motion/react"; // Framer Motion ইম্পোর্ট করা হয়েছে

// ড্রপলেট আইকনটি কাস্টম SVG দিয়ে তৈরি করা হয়েছে নিখুঁত লুকের জন্য
const DropletIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const StatsBar = () => {
  const stats = [
    {
      id: 1,
      value: "12,540+",
      label: "People Donated",
      icon: <DropletIcon className="w-5 h-5 text-red-600" />,
    },
    {
      id: 2,
      value: "35,780+",
      label: "Lives Saved",
      icon: <Heart className="w-5 h-5 text-red-600 fill-current" />,
    },
    {
      id: 3,
      value: "8,920+",
      label: "Active Donors",
      icon: <Users className="w-5 h-5 text-red-600" />,
    },
    {
      id: 4,
      value: "320+",
      label: "Partner Hospitals",
      icon: <Home className="w-5 h-5 text-red-600" />,
    },
  ];

  // পেরেন্ট কন্টেইনারের অ্যানিমেশন ভ্যারিয়েন্ট (Stagger Effect এর জন্য)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15, // একটির পর আরেকটি আইটেম অ্যানিমেট হবে
      },
    },
  };

  // প্রতিটি আলাদা স্ট্যাটস আইটেমের জন্য অ্যানিমেশন ভ্যারিয়েন্ট
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-12">
      {/* মূল গ্রিড কন্টেইনারকে motion.div করা হয়েছে এবং scroll বা view-তে আসলে অ্যানিমেশন ট্রিগার হবে */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-red-600 rounded-[24px] p-6 md:p-8 shadow-xl shadow-red-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative overflow-hidden"
      >
        
        {/* ব্যাকগ্রাউন্ডের হালকা ডেকোরেশন এফেক্ট */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />
        
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            className={`flex items-center gap-4 px-4 py-3 lg:justify-center ${
              index !== stats.length - 1
                ? "lg:border-r border-white/10"
                : ""
            }`}
          >
            {/* আইকন কন্টেইনার (সাদা গোলাকার ব্যাকগ্রাউন্ড) */}
            {/* হোভার করলে আইকনটি সামান্য স্কেল বা বড় হবে */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm shrink-0 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
            </motion.div>

            {/* টেক্সট কন্টেন্ট */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-medium text-red-100 opacity-90">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

  export default StatsBar;
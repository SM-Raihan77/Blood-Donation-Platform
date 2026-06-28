"use client";

import React from 'react';
import Image from 'next/image';
import { HelpCircle, ArrowRight } from 'lucide-react'; // চমৎকার লুকের জন্য আইকন ব্যবহার করা হয়েছে

export default function ExtratBannerSection() {
  return (
    <section className="max-w-7xl mx-auto w-full bg-slate-50/40 text-slate-800 py-12 px-6 md:px-16 lg:px-24 rounded-2xl border border-slate-200/60 shadow-xs my-16 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ডে হালকা ব্লাড-রেড গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-100/40 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* Left Side: Image Container */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          {/* গ্রাডিয়েন্ট বর্ডার পরিবর্তন করে আপনার ব্র্যান্ডের রেড টোন দেওয়া হয়েছে */}
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl p-1 bg-gradient-to-tr from-red-600/20 to-red-100/10 shadow-sm overflow-hidden group">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
              <Image
                src="/assets/Banner-5.jpeg"
                alt="Urgent blood donation support"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6">
          
          {/* Top Badge: Need Immediate Help? */}
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <HelpCircle size={14} />
            Need Immediate Help?
          </div>
          
          {/* Heading: রক্ত সংক্রান্ত জরুরি প্রয়োজনে বিভ্রান্ত বা চিন্তিত? */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">
            Are you looking for urgent blood or expert donor guidance?
          </h2>
          
          {/* Subtitle Text */}
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Our dedicated support team and experienced community coordinates are available 24/7 to guide you when you are in a critical medical emergency or confused about the blood match.
          </p>
          
          {/* Action Button: রেড থিম এবং স্মুথ হোভার সহ */}
          <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
            <span>Find Urgent Support</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
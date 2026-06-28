
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { Heart, Users } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const bannerImages = [
    "/assets/Banner-1.jpeg",
    "/assets/Banner-2.jpeg",
    "/assets/Banner-3.jpeg",
    "/assets/Banner-4.jpeg",
   
  ];

  return (
    <div className="max-w-7xl mx-auto w-full bg-slate-50/40 rounded-2xl overflow-hidden mt-6 p-6 md:p-12 relative">
      
      {/* Background soft red glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-100/50 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* items-stretch ব্যবহার করা হয়েছে যাতে দুই পাশের হাইট সমান থাকে */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* Left Side: Text Content */}
        <div className="text-center md:text-left order-2 md:order-1 flex flex-col justify-center space-y-6">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mx-auto md:mx-0 w-max"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Save Lives With One Donation
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            Your Blood <br />
            Can Save <br />
            Someone's <span className="text-red-600">Life</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto md:mx-0 leading-relaxed"
          >
            Every drop of blood you donate can bring hope, healing, and a second chance to someone in need.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Become a Donor
                <Heart className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/search" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-6 rounded-xl shadow-sm border border-slate-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Find Blood
                <Users className="w-4 h-4 text-slate-600" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Swiper Slider Fix */}
        {/* h-[350px] md:h-auto দিয়ে হাইট কলাপ্স হওয়া রোধ করা হয়েছে */}
        <div className="w-full h-[350px] md:h-auto min-h-[350px] md:min-h-[450px] flex order-1 md:order-2 relative rounded-2xl overflow-hidden shadow-sm">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect={"fade"}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="w-full h-full absolute inset-0"
          >
            {bannerImages.map((src, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Banner Image ${index + 1}`}
                  fill
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default Banner;
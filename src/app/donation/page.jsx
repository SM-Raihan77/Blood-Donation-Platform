"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaHeart, FaHandHoldingHeart } from "react-icons/fa";

const DonationPage = () => {
  const [amount, setAmount] = useState("50");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // কিছু প্রি-ডিফাইন্ড ডোনেশন অ্যামাউন্ট
  const presetAmounts = ["10", "25", "50", "100", "250"];

  const handleDonate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ১. আপনার ব্যাকএন্ড এপিআই (/api/funding) তে অ্যামাউন্ট পাঠানো
      const response = await fetch("/api/funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(amount) }), // সংখ্যা হিসেবে পাঠানো হলো
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // ২. ব্যাকএন্ড থেকে স্ট্রাইপের সেশন URL আসলে সেখানে রিডাইরেক্ট করা
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("পেমেন্ট সেশন তৈরি করা যায়নি। আবার চেষ্টা করুন।");
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error("Donation Error:", error);
      alert(error.message || "দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-content1/50 backdrop-blur-md border border-separator rounded-3xl p-6 md:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4 text-2xl animate-pulse">
            <FaHandHoldingHeart />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Support Our Mission
          </h1>
          <p className="mt-3 text-muted-foreground max-w-sm text-sm sm:text-base">
            আপনার একটি ছোট অবদান আমাদের প্রযুক্তিগত উদ্ভাবন এবং তরুণদের দক্ষতা উন্নয়নে বড় ভূমিকা রাখতে পারে।
          </p>
        </div>

        {/* ক্যাম্পেইন প্রোগ্রেস বার */}
        <div className="mb-8 bg-background/50 p-4 rounded-2xl border border-separator/50">
          <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
            <span>Raised: $12,450</span>
            <span>Goal: $20,000</span>
          </div>
          <div className="w-full bg-separator h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[62%] rounded-full transition-all duration-500"></div>
          </div>
          <div className="text-right text-[10px] text-accent font-semibold mt-1">
            62% Completed
          </div>
        </div>

        {/* ডোনেশন ফর্ম */}
        <form onSubmit={handleDonate} className="space-y-6">
          
          {/* অ্যামাউন্ট সিলেক্টর গ্রিড */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
              Select Amount (USD)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`py-3 text-sm font-medium rounded-xl border transition-all ${
                    amount === preset
                      ? "bg-accent border-accent text-white shadow-lg shadow-accent/20 scale-105"
                      : "bg-background border-separator hover:border-accent/50 text-foreground"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* ডোনেট বাটন */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold text-base py-6 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 bg-accent hover:bg-accent/90 text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            isLoading={isSubmitting}
          >
            {!isSubmitting && <FaHeart className="text-sm" />}
            {isSubmitting ? "Processing..." : "Donate Now"}
          </Button>
        </form>

        {/* ফুটার নোট */}
        <p className="text-center text-[11px] text-muted-foreground mt-6">
          Secured by industry-standard encryption. Your privacy and security are our top priorities.
        </p>

      </div>
    </div>
  );
};

export default DonationPage;
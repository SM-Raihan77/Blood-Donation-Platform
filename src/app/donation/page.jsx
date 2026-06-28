"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { FaHeart, FaHandHoldingHeart } from "react-icons/fa";

const DonationPage = () => {
  const [amount, setAmount] = useState("50");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined donation amounts
  const presetAmounts = ["10", "25", "50", "100", "250"];

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Send amount to your backend API (/api/funding)
      const response = await fetch("/api/funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // 2. Redirect to Stripe session URL from backend
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create payment session. Please try again.");
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error("Donation Error:", error);
      alert(error.message || "Sorry, something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-red-50/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-content1/50 backdrop-blur-md border border-separator rounded-3xl p-6 md:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl animate-pulse">
            <FaHandHoldingHeart />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Support Our Mission
          </h1>
          <p className="mt-3 text-muted-foreground max-w-sm text-sm sm:text-base">
            Your generous contribution helps us organize blood donation camps, manage critical blood supplies, and save innocent lives.
          </p>
        </div>

        {/* Campaign Progress Bar */}
        <div className="mb-8 bg-background/50 p-4 rounded-2xl border border-separator/50">
          <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
            <span>Raised: $12,450</span>
            <span>Goal: $20,000</span>
          </div>
          <div className="w-full bg-separator h-2 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full w-[62%] rounded-full transition-all duration-500"></div>
          </div>
          <div className="text-right text-[10px] text-red-600 font-semibold mt-1">
            62% Completed
          </div>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleDonate} className="space-y-6">
          
          {/* Amount Selector Grid */}
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
                      /* Red Theme Active State */
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 scale-105"
                      : "bg-background border-separator hover:border-red-600/50 text-foreground"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount Field (Added above the button) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
              Or Enter Custom Amount
            </label>
            <Input
              type="number"
              label="Amount"
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="bordered"
              className="w-full"
              min="1"
            />
          </div>

          {/* Donate Button */}
          <Button
            type="submit"
            color="danger"
            size="lg"
            className="w-full font-semibold text-base py-6 rounded-xl shadow-xl shadow-red-600/20 hover:shadow-red-600/30 bg-red-600 hover:bg-red-700 text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            isLoading={isSubmitting}
          >
            {!isSubmitting && <FaHeart className="text-sm" />}
            {isSubmitting ? "Processing..." : "Donate Now"}
          </Button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-muted-foreground mt-6">
          Secured by industry-standard encryption. Your privacy and security are our top priorities.
        </p>

      </div>
    </div>
  );
};

export default DonationPage;
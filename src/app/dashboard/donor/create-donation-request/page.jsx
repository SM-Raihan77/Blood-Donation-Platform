"use client";

import React, { useState, useEffect } from 'react';
import districtsData from '@/data/districts.json';
import upazilasData from '@/data/upazilas.json';

// গুরুত্বপূর্ণ সংশোধন: সরাসরি অবজেক্টটি ইম্পোর্ট করুন (পাথ আপনার প্রজেক্ট অনুযায়ী মিলিয়ে নিন)
import { authClient } from "@/lib/auth-client"; 

const findMainData = (jsonFile) => {
  if (!jsonFile || !Array.isArray(jsonFile)) return [];
  const targetObj = jsonFile.find(item => item && Array.isArray(item.data));
  return targetObj ? targetObj.data : [];
};

const allDistricts = findMainData(districtsData);
const allUpazilas = findMainData(upazilasData);

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateDonationRequest() {
  // ১. সেশন থেকে লগইন করা ইউজারের ডাটা আনা
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // সেশন লোড না হওয়া পর্যন্ত ডেমো বা ফলব্যাক ইউজার ডাটা
  const donorUser = user?.name ? user : { name: "Donor User", email: "donor@example.com" };

  // ২. স্টেটস 
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: ""
  });

  // ৩. ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা ফিল্টার করার এফেক্ট
  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = allUpazilas.filter(
        (upazila) => String(upazila.district_id) === String(selectedDistrictId)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId]);

  // ৪. সাধারণ ইনপুট চেঞ্জ হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ৫. ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();

    const actualDistrictName = allDistricts.find(d => String(d.id) === String(selectedDistrictId))?.name || "";
    const actualUpazilaName = filteredUpazilas.find(u => String(u.id) === String(e.target.upazila.value))?.name || "";

    const requestPayload = {
      requesterName: donorUser.name,
      requesterEmail: donorUser.email,
      recipientName: formData.recipientName,
      district: actualDistrictName, 
      upazila: actualUpazilaName,   
      hospitalName: formData.hospitalName,
      fullAddress: formData.fullAddress,
      bloodGroup: formData.bloodGroup,
      donationDate: formData.donationDate,
      donationTime: formData.donationTime,
      requestMessage: formData.requestMessage,
      status: "pending" 
    };

    console.log("Submitting Blood Donation Request Payload:", requestPayload);
    alert("Donation Request Created Successfully (Status: Pending)!");
    
    // ফর্ম এবং লোকেশন স্টেট রিসেট
    setFormData({
      recipientName: "",
      hospitalName: "",
      fullAddress: "",
      bloodGroup: "",
      donationDate: "",
      donationTime: "",
      requestMessage: ""
    });
    setSelectedDistrictId("");
    e.target.reset();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50 text-gray-800">
      
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
          Create Donation Request 🆕
        </h1>
        <p className="text-gray-600 mt-1">Fill up the form below to request for blood.</p>
      </div>

      {/* ফর্ম */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 border border-gray-100 space-y-5">
        
        {/* রিকোয়েস্টারের নাম ও ইমেইল (Read Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Requester Name</label>
            <input 
              type="text" 
              value={donorUser.name} 
              readOnly 
              className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Requester Email</label>
            <input 
              type="email" 
              value={donorUser.email} 
              readOnly 
              className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* রেসিপিয়েন্ট নাম */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Name *</label>
          <input 
            type="text" 
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
            placeholder="Enter recipient's name"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition"
          />
        </div>

        {/* ডিস্ট্রিক্ট ও উপজেলা */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient District *</label>
            <select 
              name="district"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition"
            >
              <option value="">Select District</option>
              {allDistricts.map((dist) => (
                <option key={dist.id} value={dist.id}>{dist.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Upazila *</label>
            <select 
              name="upazila"
              required
              disabled={!selectedDistrictId}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upz) => (
                <option key={upz.id} value={upz.id}>{upz.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* হাসপাতালের নাম */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital Name *</label>
          <input 
            type="text" 
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
            required
            placeholder="e.g., Dhaka Medical College Hospital"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition"
          />
        </div>

        {/* ফুল অ্যাড্রেস */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address Line *</label>
          <input 
            type="text" 
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            required
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition"
          />
        </div>

        {/* ব্লাড গ্রুপ, ডেট ও টাইম */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group *</label>
            <select 
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition"
            >
              <option value="">Select Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Donation Date *</label>
            <input 
              type="date" 
              name="donationDate"
              value={formData.donationDate}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Donation Time *</label>
            <input 
              type="time" 
              name="donationTime"
              value={formData.donationTime}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition bg-white"
            />
          </div>
        </div>

        {/* রিকোয়েস্ট মেসেজ */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Request Message (Details) *</label>
          <textarea 
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Explain in detail why you need blood..."
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition resize-none"
          ></textarea>
        </div>

        {/* সাবমিট বাটন */}
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md active:scale-[0.99]"
          >
            Create Donation Request
          </button>
        </div>

      </form>
    </div>
  );
}
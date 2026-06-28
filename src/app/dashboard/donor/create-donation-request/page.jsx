"use client";

import React, { useState, useEffect } from "react";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { authClient } from "@/lib/auth-client";

const findMainData = (jsonFile) => {
  if (!jsonFile || !Array.isArray(jsonFile)) return [];
  const targetObj = jsonFile.find((item) => item && Array.isArray(item.data));
  return targetObj ? targetObj.data : [];
};

const allDistricts = findMainData(districtsData);
const allUpazilas = findMainData(upazilasData);

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateDonationRequest() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const donorUser = user?.name
    ? user
    : { name: "Donor User", email: "donor@example.com" };

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedUpazilaId, setSelectedUpazilaId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = allUpazilas.filter(
        (upazila) =>
          String(upazila.district_id) === String(selectedDistrictId)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }

    // district change হলে upazila reset
    setSelectedUpazilaId("");
  }, [selectedDistrictId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      recipientName: "",
      hospitalName: "",
      fullAddress: "",
      bloodGroup: "",
      donationDate: "",
      donationTime: "",
      requestMessage: "",
    });
    setSelectedDistrictId("");
    setSelectedUpazilaId("");
    setFilteredUpazilas([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualDistrictName =
      allDistricts.find((d) => String(d.id) === String(selectedDistrictId))
        ?.name || "";

    const actualUpazilaName =
      filteredUpazilas.find((u) => String(u.id) === String(selectedUpazilaId))
        ?.name || "";

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
      status: "pending",
    };

    console.log("Payload যাচ্ছে:", requestPayload);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/donation-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create donation request");
      }

      alert("Donation Request Created Successfully!");
      resetForm();
    } catch (error) {
      console.error("Create donation request error:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="mb-6 w-full text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 flex items-center justify-center gap-2">
          Create Donation Request
        </h1>
        <p className="text-gray-600 mt-1">
          Fill up the form below to request for blood.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-100 space-y-5"
      >
        {/* requester info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Requester Name
            </label>
            <input
              type="text"
              value={donorUser.name}
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Requester Email
            </label>
            <input
              type="email"
              value={donorUser.email}
              readOnly
              className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* recipient name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Recipient Name *
          </label>
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

        {/* district + upazila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recipient District *
            </label>
            <select
              name="district"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition"
            >
              <option value="">Select District</option>
              {allDistricts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recipient Upazila *
            </label>
            <select
              name="upazila"
              value={selectedUpazilaId}
              onChange={(e) => setSelectedUpazilaId(e.target.value)}
              required
              disabled={!selectedDistrictId}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upz) => (
                <option key={upz.id} value={upz.id}>
                  {upz.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* hospital */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Hospital Name *
          </label>
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

        {/* address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Address Line *
          </label>
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

        {/* blood group + date + time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blood Group *
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none bg-white transition"
            >
              <option value="">Select Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Donation Date *
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Donation Time *
            </label>
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

        {/* message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Request Message (Details) *
          </label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Explain in detail why you need blood..."
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition resize-none"
          />
        </div>

        {/* submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Create Donation Request"}
          </button>
        </div>
      </form>
    </div>
  );
}


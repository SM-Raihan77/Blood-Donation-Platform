"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditDonationRequestPage() {
  const { id } = useParams();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    status: "pending",
  });

  // fetch existing request data by id
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/donation-requests/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch donation request");
        }

        const request = data?.data;

        setFormData({
          recipientName: request?.recipientName || "",
          district: request?.district || "",
          upazila: request?.upazila || "",
          hospitalName: request?.hospitalName || "",
          fullAddress: request?.fullAddress || "",
          bloodGroup: request?.bloodGroup || "",
          donationDate: request?.donationDate || "",
          donationTime: request?.donationTime || "",
          requestMessage: request?.requestMessage || "",
          status: request?.status || "pending",
        });
      } catch (error) {
        console.error("Error fetching request for edit:", error);
        alert("Failed to load donation request data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequest();
    }
  }, [id, API_URL]);

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // update submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/api/donation-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update donation request");
      }

      alert("Donation request updated successfully!");
      router.push("/dashboard/donor/my-donation-requests");
    } catch (error) {
      console.error("Error updating donation request:", error);
      alert(error.message || "Failed to update donation request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <p className="text-lg font-medium text-gray-600">
            Loading donation request data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Edit Donation Request
          </h1>
          <p className="text-gray-600 mt-1">
            Update the donation request information below.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/donor/my-donation-requests"
            className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Back to My Requests
          </Link>

          <Link
            href="/dashboard/donor"
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b bg-red-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Request Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Edit the fields and click update donation request.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recipient + Blood */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="Enter recipient name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* District + Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Upazila
              </label>
              <input
                type="text"
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                placeholder="Enter upazila"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Hospital + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Address + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address
              </label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                placeholder="Enter full address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Request Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows={5}
              placeholder="Write request message"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <Link
              href="/dashboard/donor/my-donation-requests"
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Donation Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DonationRequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRequestDetails = async () => {
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

        setRequest(data?.data || null);
      } catch (error) {
        console.error("Error fetching donation request details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequestDetails();
    }
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <p className="text-lg font-medium text-gray-600">
            Loading request details...
          </p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Request Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The donation request you are looking for does not exist or could not
            be loaded.
          </p>

          <Link
            href="/dashboard/donor/my-donation-requests"
            className="inline-block px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Back to My Donation Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-gray-50">
      {/* Top header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Donation Request Details
          </h1>
          <p className="text-gray-600 mt-1">
            View the complete information of this donation request.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/donor"
            className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/dashboard/donor/my-donation-requests"
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            My Requests
          </Link>
        </div>
      </div>

      {/* Main details card */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="px-6 py-5 border-b bg-red-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {request.recipientName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Request ID: {request._id}
              </p>
            </div>

            <span
              className={`capitalize inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold w-fit ${request.status === "done"
                  ? "bg-green-100 text-green-700"
                  : request.status === "canceled"
                    ? "bg-gray-200 text-gray-700"
                    : request.status === "inprogress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {request.status}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipient Information */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recipient Information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Recipient Name</p>
                <p className="font-medium text-gray-800">
                  {request.recipientName}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Blood Group</p>
                <p className="font-bold text-red-600">{request.bloodGroup}</p>
              </div>

              <div>
                <p className="text-gray-500">Recipient Location</p>
                <p className="font-medium text-gray-800">
                  {request.upazila}, {request.district}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Hospital Name</p>
                <p className="font-medium text-gray-800">
                  {request.hospitalName}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Full Address</p>
                <p className="font-medium text-gray-800">
                  {request.fullAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Donation Schedule */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Donation Schedule
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Donation Date</p>
                <p className="font-medium text-gray-800">
                  {request.donationDate}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Donation Time</p>
                <p className="font-medium text-gray-800">
                  {request.donationTime}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Request Status</p>
                <p className="font-medium text-gray-800 capitalize">
                  {request.status}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Created By</p>
                <p className="font-medium text-gray-800">
                  {request.requesterName}
                </p>
                <p className="text-gray-500 text-xs">
                  {request.requesterEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Request Message */}
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Request Message
            </h3>
            <p className="text-gray-700 leading-7">
              {request.requestMessage || "No request message provided."}
            </p>
          </div>

          {/* Donor Info (only if inprogress) */}
          {request.status === "inprogress" && (
            <div className="md:col-span-2 bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Donor Information
              </h3>

              {request.donorName || request.donorEmail ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-blue-700/70">Donor Name</p>
                    <p className="font-medium text-gray-800">
                      {request.donorName || "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700/70">Donor Email</p>
                    <p className="font-medium text-gray-800">
                      {request.donorEmail || "Not available"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  No donor information is available yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-5 border-t bg-white flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            href={`/dashboard/donor/edit-donation-request/${request._id}`}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-center"
          >
            Edit Request
          </Link>

          <Link
            href="/dashboard/donor/my-donation-requests"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition text-center"
          >
            Back to My Requests
          </Link>
        </div>
      </div>
    </div>
  );
}
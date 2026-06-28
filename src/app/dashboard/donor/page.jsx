

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function DashboardHome() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const donorUser = user?.name
    ? user
    : { name: "Donor User", email: "donor@example.com" };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH RECENT 3 REQUESTS
  // ==========================
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!user?.email) return;

        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/my-donation-requests?email=${user.email}&limit=3`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch requests");
        }

        setRequests(data?.data || []);
      } catch (error) {
        console.error("Fetch requests error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.email]);

  // ==========================
  // STATUS UPDATE HANDLER
  // ==========================
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/donation-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update status");
      }

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

      alert(`Status updated to ${newStatus} successfully!`);
    } catch (error) {
      console.error("Status update error:", error);
      alert(error.message || "Failed to update status");
    }
  };

  // ==========================
  // DELETE HANDLER
  // ==========================
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this donation request?"
    );

    if (!isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/donation-requests/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete request");
      }

      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );

      alert("Request deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Delete failed");
    }
  };

  if (isPending || loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50 text-gray-800">
      {/* --- WELCOME SECTION --- */}
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Welcome, {donorUser.name}! 🏠
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your blood donation requests from here.
        </p>
      </div>

      {/* --- RECENT REQUESTS SECTION --- */}
      {requests.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-700">
              Your Recent Donation Requests (Max 3)
            </h2>

            <Link
              href="/dashboard/donor/my-donation-requests"
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              View My All Requests
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider border-b">
                  <th className="p-4 font-semibold">Recipient Name</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Date & Time</th>
                  <th className="p-4 font-semibold text-center">Blood Group</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Donor Info</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                    {/* Recipient Name */}
                    <td className="p-4 font-medium text-gray-900">
                      {request.recipientName}
                    </td>

                    {/* Location */}
                    <td className="p-4 text-sm text-gray-600">
                      {request.upazila}, {request.district}
                    </td>

                    {/* Date & Time */}
                    <td className="p-4 text-sm text-gray-600">
                      <div>{request.donationDate}</div>
                      <div className="text-xs text-gray-400">
                        {request.donationTime}
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="p-4 text-center">
                      <span className="bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-md text-sm">
                        {request.bloodGroup}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`capitalize px-2.5 py-1 rounded-full font-medium text-xs ${
                          request.status === "done"
                            ? "bg-green-100 text-green-800"
                            : request.status === "canceled"
                            ? "bg-gray-100 text-gray-600"
                            : request.status === "inprogress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>

                    {/* Donor Info */}
                    <td className="p-4 text-sm">
                      {request.status === "inprogress" ? (
                        <div>
                          <p className="font-semibold text-gray-700">
                            {request.donorName || "Donor assigned"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {request.donorEmail || "No email"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === request._id ? null : request._id
                          )
                        }
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition focus:outline-none"
                      >
                        <span className="sr-only">Open actions</span>
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6 10a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {activeDropdown === request._id && (
                        <div className="absolute right-4 top-12 z-10 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg text-left overflow-hidden">
                          {/* View */}
                          <Link
                          href={`/dashboard/donor/donation-requests/${request._id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            View request
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/dashboard/donor/edit-donation-request/${request._id}`}
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Edit request
                          </Link>

                          {/* Done / Cancel শুধু inprogress হলে */}
                          {request.status === "inprogress" && (
                            <>
                              <button
                                onClick={() => {
                                  handleStatusChange(request._id, "done");
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-gray-50"
                              >
                                Mark as done
                              </button>

                              <button
                                onClick={() => {
                                  handleStatusChange(request._id, "canceled");
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-50"
                              >
                                Cancel request
                              </button>
                            </>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => {
                              handleDelete(request._id);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          >
                            Delete request
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* যদি কোনো request না থাকে, পুরো section hide না করে optional message দিতে চাইলে এটা রাখো */}
      {requests.length === 0 && (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 text-center">
          <p className="text-gray-500">
            You have not created any donation request yet.
          </p>
        </div>
      )}
    </div>
  );
}
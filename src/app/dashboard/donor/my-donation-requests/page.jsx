"use client";


import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function AllDonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const fetchDonationRequests = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        setLoading(false);
        return;
      }
      // console.log("Email:", session?.user?.email);
      // console.log("Page:", page);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests?status=pending&page=${page}&limit=6`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch donation requests");
        }

        setRequests(data?.data || []);
        setTotalPages(data?.totalPages || 1);
      } catch (err) {
        console.error("Fetch donation requests error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDonationRequests();
  }, [session, isPending, page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading donation requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No donation requests found
          </h2>
          <p className="text-gray-500 mt-2">
            There are no donation requests available right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mx-auto max-w-2xl text-center">
            All Donation Requests
          </h1>
          <p className="text-gray-600 mt-2 mx-auto max-w-2xl text-center">
            Browse all blood donation requests posted by users.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 hover:shadow-lg transition"
            >

              {/* top row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {request.recipientName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Requested by {request.requesterName}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : request.status === "inprogress"
                      ? "bg-blue-100 text-blue-700"
                      : request.status === "done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {request.status}
                </span>
              </div>

              {/* blood group */}
              <div className="mb-4">
                <span className="inline-block bg-red-100 text-red-600 font-bold px-4 py-2 rounded-lg text-lg">
                  {request.bloodGroup}
                </span>
              </div>

              {/* details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Hospital:</span>{" "}
                  {request.hospitalName}
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {request.upazila}, {request.district}
                </p>

                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {request.fullAddress}
                </p>

                <p>
                  <span className="font-semibold">Donation Date:</span>{" "}
                  {request.donationDate}
                </p>

                <p>
                  <span className="font-semibold">Donation Time:</span>{" "}
                  {request.donationTime}
                </p>

                <p>
                  <span className="font-semibold">Requester Email:</span>{" "}
                  {request.requesterEmail}
                </p>
              </div>

              {/* message */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Request Message
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {request.requestMessage}
                </p>
              </div>

              {/* footer */}
              <div className="mt-5 pt-4 border-t flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>

                <Link
                  href={`/donation-requests/${request._id}`}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  View Details
                </Link>
              </div>

            </div>


          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${page === index + 1
                ? "bg-red-600 text-white"
                : "border hover:bg-gray-100"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

  );
}
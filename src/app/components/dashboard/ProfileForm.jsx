"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client"; // adjust path to match your actual file
import { Pencil, X } from "lucide-react";

export default function ProfileForm() {
  const { data: session, isPending, refetch } = useSession();
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // Populate form once session data is available
  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        phone: user.phone || "",
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        district: user.district || "",
        upazila: user.upazila || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (session?.user) {
      const user = session.user;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        phone: user.phone || "",
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        district: user.district || "",
        upazila: user.upazila || "",
      });
    }
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // email intentionally excluded from the payload - it must never be updated
      const { email, ...updatableData } = formData;

      const res = await fetch(`${API_URL}/api/users/${session.user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatableData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update profile");
      }

      if (refetch) await refetch();

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
        <p className="text-lg font-medium text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header with edit toggle */}
      <div className="px-6 py-5 border-b bg-red-50 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing
              ? "Update your details and save changes."
              : "Click edit to update your information."}
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            <Pencil size={16} />
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={formData.image || "/default-avatar.png"}
            alt={formData.name || "User avatar"}
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
          />
          {isEditing && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                disabled={!isEditing}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          )}
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              // email is never editable, even in edit mode
              disabled
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter phone number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="">Select blood group</option>
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

        {/* District + Upazila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter district"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upazila
            </label>
            <input
              type="text"
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter upazila"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Action buttons - only visible while editing */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      setProfile(response.data);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to load profile",
        type: "error",
      });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axiosInstance.put("/user", formData);
      setProfile(response.data);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update profile",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="bg-[#fafafa] min-h-screen p-6 rounded-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-white rounded-xl shadow-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen p-6 rounded-2xl">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-400"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              {/* Avatar & Basic Info */}
              <div className="flex items-end gap-6 mb-6 md:mb-0">
                <div className="w-32 h-32 bg-white border-4 border-white rounded-full shadow-lg flex items-center justify-center">
                  <User className="w-16 h-16 text-orange-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username || ""}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      profile?.username || "Admin User"
                    )}
                  </h1>
                  <p className="text-gray-500">Admin Account</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-semibold"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Profile Information Sections */}
      <div className="grid grid-cols-4 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" />
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile?.email || "No email"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile?.phone || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Address
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile?.city || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile?.country || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" />
            Account Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg font-semibold capitalize">{profile?.role || "Administrator"}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Account Status</label>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Membership
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Member Since</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Updated</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}

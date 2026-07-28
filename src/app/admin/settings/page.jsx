"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  Mail,
  Smartphone,
  Shield,
  Download,
  Trash2,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("security");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    newArrivals: true,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  const handleNotificationChange = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      await axiosInstance.post("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSnackbar({
        open: true,
        message: "Password changed successfully",
        type: "success",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to change password",
        type: "error",
      });
    }
  };

  const handleSaveNotificationSettings = () => {
    setSnackbar({
      open: true,
      message: "Notification settings saved successfully",
      type: "success",
    });
  };

  return (
    <div className="bg-[#fafafa] min-h-screen p-6 rounded-2xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and security</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
          activeTab === "security"
            ? "bg-orange-500 text-white"
            : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Shield className="w-4 h-4" />
          Security
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "notifications"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Bell className="w-4 h-4" />
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "data"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Download className="w-4 h-4" />
          Data
        </button>
      </div>

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="space-y-6">
        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-orange-500" />
            Change Password
          </h2>

          <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold mt-8"
                >
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-orange-500" />
                Two-Factor Authentication
              </h2>
              <p className="text-gray-600 mb-6">
                Add an extra layer of security to your account with two-factor authentication.
              </p>
              <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold">
                Enable 2FA
              </button>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Bell className="w-6 h-6 text-orange-500" />
              Notification Preferences
            </h2>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors max-w-2xl">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleNotificationChange("emailNotifications")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* Order Updates */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Order Updates</h3>
                    <p className="text-sm text-gray-500">Get notified about order status changes</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.orderUpdates}
                    onChange={() => handleNotificationChange("orderUpdates")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* New Arrivals */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">New Arrivals</h3>
                    <p className="text-sm text-gray-500">Be notified about new products</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.newArrivals}
                    onChange={() => handleNotificationChange("newArrivals")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* Promotional Emails */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Promotional Emails</h3>
                    <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.promotionalEmails}
                    onChange={() => handleNotificationChange("promotionalEmails")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <button
                onClick={handleSaveNotificationSettings}
                className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold mt-8"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Data Settings */}
        {activeTab === "data" && (
          <div className="space-y-6">
            {/* Export Data */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-6 h-6 text-orange-500" />
                Export Your Data
              </h2>
              <p className="text-gray-600 mb-6">
                Download all your account data in a portable format for your records.
              </p>
              <button className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-xl shadow-sm border border-red-200 bg-red-50 p-8">
              <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <Trash2 className="w-6 h-6 text-red-500" />
                Delete Account
              </h2>
              <p className="text-red-700 mb-6">
                Once you delete your account, there is no going back. Please be certain before proceeding.
              </p>
              <button className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        )}

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


"use client"
import Link from "next/link";
import { User, Phone, MapPin, Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Cookies from 'js-cookie';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/signup', formData);
      setSuccess(response.data.message);

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 to-orange-500 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="bg-primary text-white flex flex-col justify-center items-center md:w-1/2 p-10 space-y-6">
          <h2 className="text-4xl font-extrabold text-center">Welcome Back!</h2>
          <p className="text-center text-base max-w-md">
            Login to your account to stay connected and explore all the amazing features we have for you.
          </p>
          <Link
            href="/login"
            className="mt-6 border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition duration-300 ease-in-out text-center"
          >
            Already Have an Account? Sign In
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center items-center md:w-1/2 p-10 bg-gray-50">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Register Your Account
          </h2>
          {/* Social Buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="flex items-center border-2 border-gray-300 rounded-full px-6 py-3 hover:bg-gray-200 transition duration-300 ease-in-out">
              <LogIn className="mr-2" size={20} />
              <span className="font-medium">Sign up with Google</span>
            </button>
          </div>
          <div className="flex items-center my-4 w-full max-w-sm">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-3 font-semibold text-gray-600">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <p className="text-sm mb-6 text-center text-gray-600">
            Fill out the form to create your account
          </p>
          {/* Messages */}
          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center mb-4">{success}</div>
          )}
          {/* Sign Up Form */}
          <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                required
              />
            </div>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              />
            </div>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              />
            </div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Signing up..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
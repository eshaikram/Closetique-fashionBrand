
'use client';

import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Sending login request:', { email });
    try {
      const response = await axiosInstance.post('/login', { email, password });
      console.log('Login response:', response.data);
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true, sameSite: 'Strict' });

      // Fetch user data to check isAdmin with retry
      let retries = 3;
      let userData = null;
      while (retries > 0) {
        try {
          const userResponse = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('User fetch response status:', userResponse.status);
          if (userResponse.ok) {
            userData = await userResponse.json();
            console.log('User data after login:', userData);
            break;
          } else {
            console.error('Failed to fetch user data:', await userResponse.json());
          }
        } catch (fetchError) {
          console.error('Error fetching user:', fetchError.message);
        }
        retries--;
        if (retries > 0) {
          console.log(`Retrying user fetch (${retries} attempts left)...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (userData) {
        if (userData.isAdmin) {
          console.log('Redirecting to admin dashboard');
          router.push('/admin/dashboard');
          router.refresh();
        } else {
          console.log('Redirecting to user dashboard');
          router.push('/');
          router.refresh();
        }
      } else {
        setError('Failed to verify user status after multiple attempts');
        setLoading(false);
      }
    } catch (err) {
      console.error('Client login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to log in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 to-orange-500 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-primary text-white flex flex-col justify-center items-center md:w-1/2 p-10 space-y-6">
          <h2 className="text-4xl font-extrabold text-center">Welcome Back!</h2>
          <p className="text-center text-base max-w-md">
            Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
          </p>
          <Link
            href="/register"
            className="mt-6 border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition duration-300 ease-in-out text-center"
          >
            No Account Yet? Sign Up
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center md:w-1/2 p-10 bg-gray-50">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Log In</h2>
          <div className="flex space-x-4 mb-6">
            <button className="flex items-center border-2 border-gray-300 rounded-full px-6 py-3 hover:bg-gray-200 transition duration-300 ease-in-out">
              <LogIn className="mr-2" size={20} />
              <span className="font-medium">Login with Google</span>
            </button>
          </div>
          <div className="flex items-center my-4 w-full max-w-sm">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-3 font-semibold text-gray-600">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <p className="text-sm mb-6 text-center text-gray-600">
            Enter your credentials to access your account
          </p>
          {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
          <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
                required
              />
            </div>
            <div className="mt-4 text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

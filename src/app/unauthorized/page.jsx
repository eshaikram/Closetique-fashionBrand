import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const metadata = { title: 'Unauthorized | Closetique' };

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white border border-orange-200 rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Access denied</h1>
        <p className="mt-2 text-sm text-gray-600">
          You do not have permission to view this page. If you believe this is a mistake,
          contact an administrator.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            Go home
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg border border-orange-300 text-orange-600 font-medium hover:bg-orange-50 transition"
          >
            Switch account
          </Link>
        </div>
      </div>
    </div>
  );
}

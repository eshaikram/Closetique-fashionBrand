// app/admin/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/user', {
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok || !data.isAdmin) {
          router.push('/unauthorized');
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p className="p-4">Loading...</p>;

  return isAdmin ? <div>Welcome to Admin Dashboard</div> : null;
}

'use client';
import { useAuthContext } from '@/context/AuthProvider';
import { useEffect } from 'react';

export default function Logout() {
  const { auth, logout } = useAuthContext();

  useEffect(() => {
    logout();
  }, [auth]);

  return (
    <div className="not-found">
      <h1>Logging out...</h1>
    </div>
  );
}

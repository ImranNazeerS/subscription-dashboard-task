import React from 'react';

export default function DashboardHeader({ user }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-text-primary tracking-tight">Dashboard</h1>
      <p className="text-text-secondary mt-1">Welcome back, {user?.name || user?.email}</p>
    </div>
  );
}

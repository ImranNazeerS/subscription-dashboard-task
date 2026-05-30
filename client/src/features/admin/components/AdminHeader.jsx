import React from 'react';
import { Search } from 'lucide-react';
import Input from '../../../shared/components/Input';

export default function AdminHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Admin Dashboard</h1>
        <p className="text-text-secondary mt-1">Manage all user subscriptions</p>
      </div>

      <div className="w-full md:w-72 relative">
        <Search className="w-4 h-4 text-text-muted absolute left-3 top-3.5 z-10" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

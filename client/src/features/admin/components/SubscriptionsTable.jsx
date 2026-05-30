import React from 'react';
import { cn } from '../../../lib/utils';
import { Users } from 'lucide-react';

export default function SubscriptionsTable({ subscriptions, isLoading }) {
  return (
    <div className="bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-border overflow-hidden">
      <div className="p-5 border-b border-border bg-surfaceSecondary/50 flex items-center gap-3">
        <Users className="w-5 h-5 text-text-secondary" />
        <h2 className="text-lg font-semibold text-text-primary">All Subscriptions</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text-secondary">
          <thead className="bg-surfaceSecondary/30 text-text-muted font-medium uppercase tracking-wider text-xs border-b border-border">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4">End Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-text-muted">Loading subscriptions...</td>
              </tr>
            ) : subscriptions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-text-muted">No subscriptions found.</td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr key={sub._id} className="hover:bg-surfaceSecondary/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-text-primary">{sub.user?.name}</div>
                    <div className="text-xs text-text-muted">{sub.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-text-primary">{sub.plan?.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wide",
                      sub.status === 'active' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                    )}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(sub.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(sub.end_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

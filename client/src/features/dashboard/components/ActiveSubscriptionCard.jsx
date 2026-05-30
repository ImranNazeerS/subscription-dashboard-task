import React from 'react';
import { Activity, CreditCard, Calendar } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function ActiveSubscriptionCard({ subscription }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-1">
        <span className="text-sm font-medium text-text-muted flex items-center gap-2">
          <Activity className="w-4 h-4" /> Plan Status
        </span>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wide",
            subscription.status === 'active' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {subscription.status}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-sm font-medium text-text-muted flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Plan Tier
        </span>
        <p className="text-lg font-bold text-text-primary mt-1">
          {subscription.plan?.name || 'Unknown Plan'}
        </p>
      </div>

      <div className="space-y-1">
        <span className="text-sm font-medium text-text-muted flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Valid Until
        </span>
        <p className="text-base font-medium text-text-primary mt-1">
          {new Date(subscription.end_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

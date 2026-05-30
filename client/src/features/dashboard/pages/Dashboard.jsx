import React from 'react';
import useAuthStore from '../../../store/authStore';
import { Calendar, CreditCard, Activity, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';
import { useMySubscription } from '../hooks/useMySubscription';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { subscription, isLoading } = useMySubscription();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-button-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Dashboard</h1>
        <p className="text-text-secondary mt-1">Welcome back, {user?.name || user?.email}</p>
      </div>

      <div className="bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-surfaceSecondary/50 flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-button-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Current Subscription</h2>
        </div>
        
        <div className="p-6">
          {subscription ? (
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
          ) : (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 bg-borderLight rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No Active Subscription</h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                You don't have an active subscription yet. Head over to the plans page to choose the right tier for you.
              </p>
              <Link 
                to="/plans" 
                className="bg-button-primary text-button-primary-text px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                View Plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import useAuthStore from '../../../store/authStore';
import { CreditCard } from 'lucide-react';
import { useMySubscription } from '../hooks/useMySubscription';
import DashboardHeader from '../components/DashboardHeader';
import ActiveSubscriptionCard from '../components/ActiveSubscriptionCard';
import EmptySubscriptionState from '../components/EmptySubscriptionState';

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
      <DashboardHeader user={user} />

      <div className="bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-surfaceSecondary/50 flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-button-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Current Subscription</h2>
        </div>
        
        <div className="p-6">
          {subscription ? (
            <ActiveSubscriptionCard subscription={subscription} />
          ) : (
            <EmptySubscriptionState />
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Zap } from 'lucide-react';
import { usePlans } from '../hooks/usePlans';
import PlansHeader from '../components/PlansHeader';
import PlanCard from '../components/PlanCard';
import PlansFooter from '../components/PlansFooter';

export default function Plans() {
  const { plans, currentSubscription, isLoading, handleSubscribe } = usePlans();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Zap className="w-8 h-8 text-button-primary animate-pulse" />
          <p className="text-sm text-text-muted animate-pulse">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <PlansHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {plans.map((plan, index) => {
          const isPopular = index === 1;

          let buttonText = 'Get started';
          let isCurrentPlan = false;

          if (currentSubscription && currentSubscription.plan) {
            const currentPrice = currentSubscription.plan.price;
            if (currentSubscription.plan._id === plan._id) {
              buttonText = 'Current Plan';
              isCurrentPlan = true;
            } else if (plan.price > currentPrice) {
              buttonText = 'Upgrade';
            } else {
              buttonText = 'Downgrade';
            }
          }

          return (
            <PlanCard
              key={plan._id || index}
              plan={plan}
              isPopular={isPopular}
              isCurrentPlan={isCurrentPlan}
              buttonText={buttonText}
              onSubscribe={handleSubscribe}
            />
          );
        })}
      </div>

      <PlansFooter />
    </div>
  );
}
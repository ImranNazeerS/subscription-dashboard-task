import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { usePlans } from '../hooks/usePlans';
import Button from '../../../shared/components/Button';

export default function Plans() {
  const { plans, isLoading, handleSubscribe } = usePlans();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Zap className="w-8 h-8 text-button-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-4">Choose the right plan for you</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Whether you're just getting started or scaling up, we have a plan that fits your needs perfectly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, index) => {
          const isPopular = index === 1; // Highlight the middle plan
          
          return (
            <div 
              key={plan._id || index}
              className={cn(
                "relative flex flex-col p-8 rounded-[var(--radius-xl)] border transition-all duration-300",
                isPopular 
                  ? "bg-cardDark text-text-inverse border-transparent shadow-[var(--shadow-card-hover)] transform md:-translate-y-4" 
                  : "bg-surface border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
              )}
            >
              {isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={cn("text-xl font-bold mb-2", isPopular ? "text-text-inverse" : "text-text-primary")}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className={cn("text-sm", isPopular ? "text-gray-400" : "text-text-muted")}>
                    / {plan.duration} days
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={cn("w-5 h-5 shrink-0", isPopular ? "text-success" : "text-button-primary")} />
                      <span className={isPopular ? "text-gray-300" : "text-text-secondary"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={isPopular ? "secondary" : "primary"}
                className="w-full py-6 font-semibold"
                onClick={() => handleSubscribe(plan._id)}
              >
                Get Started with {plan.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

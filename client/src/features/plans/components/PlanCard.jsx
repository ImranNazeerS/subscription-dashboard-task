import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import Button from '../../../shared/components/Button';

export default function PlanCard({ plan, isPopular, isCurrentPlan, buttonText, onSubscribe }) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-[var(--radius-xl)] transition-all duration-300 h-full',
        isPopular
          ? 'bg-card-dark text-text-inverse md:-translate-y-5 shadow-[0_24px_56px_rgba(8,8,8,0.22)] z-10'
          : 'bg-surface border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1'
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 inset-x-0 flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-success text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Most Popular
          </span>
        </div>
      )}

      <div className={cn('p-7 pb-0', isPopular && 'pt-9')}>
        {/* Plan name */}
        <p className={cn(
          'text-[10px] font-bold uppercase tracking-[0.15em] mb-5',
          isPopular ? 'text-white/40' : 'text-text-muted'
        )}>
          {plan.name}
        </p>

        {/* Price */}
        <div className="flex items-start gap-0.5 mb-1">
          <span className={cn(
            'text-lg font-bold mt-2',
            isPopular ? 'text-white/50' : 'text-text-muted'
          )}>
            ₹
          </span>
          <span className={cn(
            'text-5xl font-black tracking-tighter leading-none',
            isPopular ? 'text-white' : 'text-text-primary'
          )}>
            {plan.price.toLocaleString('en-IN')}
          </span>
        </div>

        <p className={cn(
          'text-xs mb-6',
          isPopular ? 'text-white/35' : 'text-text-muted'
        )}>
          per {plan.duration} days
        </p>

        {/* Divider */}
        <div className={cn(
          'h-px mb-6',
          isPopular ? 'bg-white/10' : 'bg-border'
        )} />

        {/* Features */}
        <ul className="space-y-3.5 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={cn(
                'mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center',
                isPopular ? 'bg-success/20' : 'bg-success/10'
              )}>
                <CheckCircle2 className="w-3 h-3 text-success" />
              </span>
              <span className={cn(
                'text-sm leading-snug',
                isPopular ? 'text-white/65' : 'text-text-secondary'
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-7 pt-0 mt-auto">
        <Button
          variant={isPopular ? 'secondary' : 'primary'}
          className={cn(
            'w-full py-3.5 font-semibold text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-2 transition-all duration-200',
            !isCurrentPlan && !isPopular && 'hover:gap-3',
            !isCurrentPlan && isPopular && 'hover:bg-surface-secondary'
          )}
          onClick={() => onSubscribe(plan._id)}
          disabled={isCurrentPlan}
        >
          {buttonText}
          {!isCurrentPlan && <ArrowRight className="w-3.5 h-3.5" />}
        </Button>
      </div>
    </div>
  );
}

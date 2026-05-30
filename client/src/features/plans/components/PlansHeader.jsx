import React from 'react';

export default function PlansHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
          Pricing Plans
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary leading-[1.08] mb-4">
        Choose what fits<br />
        <span className="text-text-muted font-light italic">your workflow</span>
      </h1>

      <p className="text-base text-text-secondary max-w-md mx-auto leading-relaxed">
        Simple, transparent pricing. No hidden fees.
        Scale up or down anytime.
      </p>
    </div>
  );
}

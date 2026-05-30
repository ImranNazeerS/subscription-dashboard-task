import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PlansFooter() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
      {[
        'No setup fees',
        'Cancel anytime',
        '7-day free trial',
      ].map((item) => (
        <span key={item} className="flex items-center gap-1.5 text-xs text-text-muted">
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          {item}
        </span>
      ))}
    </div>
  );
}

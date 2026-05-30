import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptySubscriptionState() {
  return (
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
  );
}

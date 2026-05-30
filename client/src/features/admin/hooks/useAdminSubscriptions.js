import { useState, useEffect } from 'react';
import { fetchAdminSubscriptions } from '../api/admin.api';

export const useAdminSubscriptions = (debouncedSearch) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubscriptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAdminSubscriptions(debouncedSearch);
        setSubscriptions(data || []);
      } catch (err) {
        console.error('Failed to fetch admin subscriptions', err);
        setError(err.response?.data?.message || 'Failed to load subscriptions');
        // Fallback dummy data for visual testing if backend not ready
        setSubscriptions([
          { _id: '1', user: { name: 'Alice Smith', email: 'alice@example.com' }, plan: { name: 'Pro' }, status: 'active', start_date: '2023-10-01', end_date: '2023-10-31' },
          { _id: '2', user: { name: 'Bob Jones', email: 'bob@example.com' }, plan: { name: 'Basic' }, status: 'expired', start_date: '2023-09-01', end_date: '2023-09-30' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, [debouncedSearch]);

  return { subscriptions, isLoading, error };
};

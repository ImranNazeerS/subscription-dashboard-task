import { useState, useEffect } from 'react';
import { fetchMySubscription } from '../api/dashboard.api';

export const useMySubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubscription = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMySubscription();
        setSubscription(data);
      } catch (err) {
        console.error('Failed to fetch subscription', err);
        setError(err.response?.data?.message || 'Failed to load subscription');
      } finally {
        setIsLoading(false);
      }
    };

    getSubscription();
  }, []);

  return { subscription, isLoading, error };
};

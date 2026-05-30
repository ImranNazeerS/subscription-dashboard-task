import { useState, useEffect } from 'react';
import { fetchPlans, subscribeToPlan } from '../api/plans.api';
import { useNavigate } from 'react-router-dom';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPlans();
        setPlans(data || []);
      } catch (err) {
        console.error('Failed to fetch plans', err);
        setError(err.response?.data?.message || 'Failed to load plans');
        // Fallback dummy data if backend is not ready
        setPlans([
          { _id: '1', name: 'Basic', price: 9, features: ['1 User', '5GB Storage', 'Basic Support'], duration: 30 },
          { _id: '2', name: 'Pro', price: 29, features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'], duration: 30 },
          { _id: '3', name: 'Enterprise', price: 99, features: ['Unlimited Users', '500GB Storage', '24/7 Dedicated Support', 'Custom Integrations'], duration: 30 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    getPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      await subscribeToPlan(planId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to subscribe', err);
      alert('Subscription failed. Please try again.');
    }
  };

  return { plans, isLoading, error, handleSubscribe };
};

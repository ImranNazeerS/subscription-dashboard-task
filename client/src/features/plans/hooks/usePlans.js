import { useState, useEffect } from 'react';
import { fetchPlans, createSubscriptionOrder, verifySubscriptionPayment, fetchMySubscription } from '../api/plans.api';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [plansData, subscriptionData] = await Promise.all([
          fetchPlans(),
          fetchMySubscription().catch(() => null) // Ignore error if not subscribed
        ]);
        setPlans(plansData || []);
        setCurrentSubscription(subscriptionData);
      } catch (err) {
        console.error('Failed to fetch data', err);
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

    getData();
  }, []);

  const handleSubscribe = async (planId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    try {
      // Step 1: Create subscription order via backend API
      const data = await createSubscriptionOrder(planId);

      // Free switch (Downgrade or fully prorated upgrade)
      if (data.freeSwitch) {
        alert(data.message || 'Switched plan successfully!');
        navigate('/dashboard');
        return;
      }

      // Normal Razorpay flow
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Subscription Task',
        description: 'Plan Subscription',
        order_id: data.orderId,
        prefill: {
          email: user?.email || '',
          name: user?.name || '',
        },
        theme: { color: '#FFB452' },
        handler: async function (response) {
          setIsLoading(true);
          try {
            // Step 3: Verify via backend API
            await verifySubscriptionPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId
            });

            alert('Payment successful!');
            navigate('/dashboard');
          } catch (verifyError) {
            alert(verifyError.response?.data?.message || 'Payment verification error');
            setIsLoading(false);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        alert(response.error.description || 'Payment could not be completed');
        setIsLoading(false);
      });
      
      setIsLoading(false);
      paymentObject.open();

    } catch (err) {
      console.error('Failed to process payment', err);
      alert('Error processing payment. Please try again.');
      setIsLoading(false);
    }
  };

  return { plans, currentSubscription, isLoading, error, handleSubscribe };
};

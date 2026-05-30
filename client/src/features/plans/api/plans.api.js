import api from '../../../lib/axios';

export const fetchPlans = async () => {
  const response = await api.get('/plans');
  return response.data.plans;
};

export const createSubscriptionOrder = async (planId) => {
  const response = await api.post('/create-order', { planId });
  return response.data;
};

export const verifySubscriptionPayment = async (data) => {
  const response = await api.post('/verify', data);
  return response.data;
};

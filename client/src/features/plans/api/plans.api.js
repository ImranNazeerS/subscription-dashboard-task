import api from '../../../lib/axios';

export const fetchPlans = async () => {
  const response = await api.get('/plans');
  return response.data.plans;
};

export const subscribeToPlan = async (planId) => {
  const response = await api.post(`/subscribe/${planId}`);
  return response.data;
};

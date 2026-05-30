import api from '../../../lib/axios';

export const fetchMySubscription = async () => {
  const response = await api.get('/my-subscription');
  return response.data.subscription;
};

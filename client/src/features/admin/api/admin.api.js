import api from '../../../lib/axios';

export const fetchAdminSubscriptions = async (search = '') => {
  const response = await api.get(`/admin/subscriptions?search=${encodeURIComponent(search)}`);
  return response.data.subscriptions;
};

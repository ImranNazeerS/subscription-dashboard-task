import React, { useState } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useAdminSubscriptions } from '../hooks/useAdminSubscriptions';
import AdminHeader from '../components/AdminHeader';
import SubscriptionsTable from '../components/SubscriptionsTable';

export default function AdminSubscriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { subscriptions, isLoading } = useAdminSubscriptions(debouncedSearch);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <AdminHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <SubscriptionsTable 
        subscriptions={subscriptions} 
        isLoading={isLoading} 
      />
    </div>
  );
}

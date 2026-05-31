import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useThemeStore from './store/themeStore';
import Layout from './shared/components/Layout';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Plans from './features/plans/pages/Plans';
import Dashboard from './features/dashboard/pages/Dashboard';
import AdminSubscriptions from './features/admin/pages/AdminSubscriptions';
import { RequireAuth, RequireAdmin } from './routes/ProtectedRoutes';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Navigate to="/plans" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="plans" element={<Plans />} />

          {/* Protected Routes (User) */}
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Protected Routes (Admin) */}
          <Route element={<RequireAdmin />}>
            <Route path="admin/subscriptions" element={<AdminSubscriptions />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/plans" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

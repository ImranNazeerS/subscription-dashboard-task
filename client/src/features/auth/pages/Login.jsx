import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useLogin } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const { handleLogin, serverError } = useLogin();
  
  const onSubmit = async (data) => {
    await handleLogin(data);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Welcome back</h1>
          <p className="text-text-muted mt-2 text-sm">Enter your credentials to access your account</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-center gap-2 text-danger text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        <LoginForm onSubmit={onSubmit} />

        <div className="mt-6 text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-button-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

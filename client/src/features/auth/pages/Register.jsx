import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useRegister } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  const { handleRegister, serverError } = useRegister();
  
  const onSubmit = async (data) => {
    await handleRegister(data);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-surface rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Create an account</h1>
          <p className="text-text-muted mt-2 text-sm">Sign up to choose your subscription plan</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-danger/10 border border-danger/20 rounded-lg flex items-center gap-2 text-danger text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{serverError}</p>
          </div>
        )}

        <RegisterForm onSubmit={onSubmit} />

        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-button-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

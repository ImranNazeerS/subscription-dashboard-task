import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useLogin } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function Login() {
  const { handleLogin, serverError } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email}
              className="pl-10"
              {...register('email')}
            />
            <Mail className="w-4 h-4 text-text-muted absolute left-3 top-[34px]" />
          </div>

          <div className="relative">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password}
              className="pl-10"
              {...register('password')}
            />
            <Lock className="w-4 h-4 text-text-muted absolute left-3 top-[34px]" />
          </div>

          <Button 
            type="submit" 
            className="w-full mt-2" 
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

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

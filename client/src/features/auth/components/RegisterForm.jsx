import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="relative">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name}
          className="pl-10"
          {...register('name')}
        />
        <User className="w-4 h-4 text-text-muted absolute left-3 top-[34px]" />
      </div>

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
        Create Account
      </Button>
    </form>
  );
}

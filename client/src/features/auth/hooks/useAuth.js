import { useState } from 'react';
import { loginUser, registerUser } from '../api/auth.api';
import useAuthStore from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [serverError, setServerError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setServerError('');
    try {
      const response = await loginUser(data);
      login(response.user || { email: data.email, role: 'user' });
      navigate('/plans');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  return { handleLogin, serverError, setServerError };
};

export const useRegister = () => {
  const [serverError, setServerError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setServerError('');
    try {
      const response = await registerUser(data);
      login(response.user || { email: data.email, role: 'user' });
      navigate('/plans');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to register. Please try again.');
    }
  };

  return { handleRegister, serverError, setServerError };
};

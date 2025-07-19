'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/outlined-button';
import { Input } from '@/components/ui/input';
import { useAuthStore, authService } from '@/services/auth.service';
import { LoginRequest } from '@/types';

export function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = await authService.validateLoginForm(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login(formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Error handling is managed by the store
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Display validation errors */}
        {validationErrors.length > 0 && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">
              <ul className="list-disc pl-5 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Display API errors */}
        {loading.error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{loading.error}</div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading.isLoading}
        >
          {loading.isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <button 
          onClick={() => router.push('/register')}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
} 
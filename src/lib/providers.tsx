'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/services/auth.service';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app startup
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}

// Auth Provider Component (if needed for specific auth context)
export function AuthProvider({ children }: ProvidersProps) {
  return <>{children}</>;
}

// Main App Provider
export function AppProviders({ children }: ProvidersProps) {
  return (
    <Providers>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Providers>
  );
} 
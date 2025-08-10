'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { material3Theme } from './theme';
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

// Material UI Theme Provider
export function MaterialThemeProvider({ children }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={material3Theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

// Main App Provider
export function AppProviders({ children }: ProvidersProps) {
  return (
    <MaterialThemeProvider>
      <Providers>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Providers>
    </MaterialThemeProvider>
  );
} 
// Auth Hook - Updated for Spogpaws API structure
import { useAuthStore, authService } from '@/services/auth.service';
import { UserDto } from '@/types';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    getCurrentUser,
    initializeAuth,
    clearError,
  } = useAuthStore();

  return {
    // State
    user,
    isAuthenticated,
    isLoading: loading.isLoading,
    error: loading.error,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    initializeAuth,
    clearError,

    // Helper methods from service
    validateLoginForm: authService.validateLoginForm.bind(authService),
    validateRegistrationForm: authService.validateRegistrationForm.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    isAdmin: authService.isAdmin.bind(authService),
    isUser: authService.isUser.bind(authService),
  };
} 
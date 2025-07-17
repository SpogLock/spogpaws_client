// Custom Auth Hook - Clean interface for React components
import { useCallback, useEffect } from 'react';
import { useAuthStore, authService } from '@/services/auth.service';
import { LoginRequest, RegisterRequest, UserDto } from '@/types';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    initializeAuth,
    clearError,
    setLoading,
  } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Memoized handlers
  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    const validationErrors = await authService.validateLoginForm(credentials);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }
    return login(credentials);
  }, [login]);

  const handleRegister = useCallback(async (userData: RegisterRequest) => {
    const validationErrors = await authService.validateRegistrationForm(userData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }
    return register(userData);
  }, [register]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleVerifyEmail = useCallback(async (token: string) => {
    return verifyEmail(token);
  }, [verifyEmail]);

  const handleForgotPassword = useCallback(async (email: string) => {
    return forgotPassword(email);
  }, [forgotPassword]);

  const handleResetPassword = useCallback(async (token: string, newPassword: string) => {
    return resetPassword(token, newPassword);
  }, [resetPassword]);

  // Role checking helpers
  const hasRole = useCallback((role: string) => {
    return authService.hasRole(role);
  }, [user]);

  const isVet = useCallback(() => {
    return authService.isVet();
  }, [user]);

  const isPetOwner = useCallback(() => {
    return authService.isPetOwner();
  }, [user]);

  const isAdmin = useCallback(() => {
    return authService.isAdmin();
  }, [user]);

  const isShelter = useCallback(() => {
    return authService.isShelter();
  }, [user]);

  return {
    // State
    user,
    isAuthenticated,
    loading,
    
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    verifyEmail: handleVerifyEmail,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    refreshToken,
    getCurrentUser,
    clearError,
    setLoading,
    
    // Utilities
    hasRole,
    isVet,
    isPetOwner,
    isAdmin,
    isShelter,
    
    // Computed properties
    isLoading: loading.isLoading,
    error: loading.error,
    userRole: user?.role,
    userName: user ? `${user.firstName} ${user.lastName}` : null,
    userEmail: user?.email,
    isVerified: user?.isVerified,
  };
}; 
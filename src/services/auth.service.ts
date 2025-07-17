// Authentication Service - Business Logic Layer
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  IAuthRepository,
  UserDto,
  LoginRequest,
  RegisterRequest,
  LoadingState,
  ApiError,
} from '@/types';
import { repositoryFactory } from '@/repositories';

// Authentication State Interface
interface AuthState {
  // State
  user: UserDto | null;
  isAuthenticated: boolean;
  loading: LoadingState;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<UserDto>;
  register: (userData: RegisterRequest) => Promise<UserDto>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  getCurrentUser: () => Promise<UserDto>;
  initializeAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
}

// Create Authentication Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      loading: {
        isLoading: false,
        error: null,
      },

      // Actions
      login: async (credentials: LoginRequest): Promise<UserDto> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const response = await authRepo.login(credentials);
          
          if (response.success && response.data) {
            const user = response.data.user;
            set({
              user,
              isAuthenticated: true,
              loading: { isLoading: false, error: null },
            });
            return user;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Login failed';
          set({
            loading: { isLoading: false, error: errorMessage },
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      register: async (userData: RegisterRequest): Promise<UserDto> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const response = await authRepo.register(userData);
          
          if (response.success && response.data) {
            const user = response.data.user;
            set({
              user,
              isAuthenticated: true,
              loading: { isLoading: false, error: null },
            });
            return user;
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Registration failed';
          set({
            loading: { isLoading: false, error: errorMessage },
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      logout: async (): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          await authRepo.logout();
        } catch (error) {
          // Continue with logout even if API call fails
          console.warn('Logout API call failed, but continuing with local logout');
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            loading: { isLoading: false, error: null },
          });
        }
      },

      refreshToken: async (): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository() as any;
        
        try {
          const refreshToken = authRepo.getRefreshTokenValue();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await authRepo.refreshToken({ refreshToken });
          
          if (response.success && response.data) {
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error) {
          // If refresh fails, logout user
          set({
            user: null,
            isAuthenticated: false,
            loading: { isLoading: false, error: 'Session expired' },
          });
          throw error;
        }
      },

      verifyEmail: async (token: string): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          await authRepo.verifyEmail(token);
          
          // Update user verification status if user is logged in
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, isVerified: true },
              loading: { isLoading: false, error: null },
            });
          } else {
            set({ loading: { isLoading: false, error: null } });
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Email verification failed';
          set({ loading: { isLoading: false, error: errorMessage } });
          throw error;
        }
      },

      forgotPassword: async (email: string): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          await authRepo.forgotPassword(email);
          set({ loading: { isLoading: false, error: null } });
        } catch (error: any) {
          const errorMessage = error.message || 'Password reset request failed';
          set({ loading: { isLoading: false, error: errorMessage } });
          throw error;
        }
      },

      resetPassword: async (token: string, newPassword: string): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          await authRepo.resetPassword(token, newPassword);
          set({ loading: { isLoading: false, error: null } });
        } catch (error: any) {
          const errorMessage = error.message || 'Password reset failed';
          set({ loading: { isLoading: false, error: errorMessage } });
          throw error;
        }
      },

      getCurrentUser: async (): Promise<UserDto> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const response = await authRepo.getCurrentUser();
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              loading: { isLoading: false, error: null },
            });
            return response.data;
          } else {
            throw new Error('Failed to get current user');
          }
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            loading: { isLoading: false, error: error.message },
          });
          throw error;
        }
      },

      initializeAuth: async (): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository() as any;
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const user = await authRepo.initializeAuth();
          
          set({
            user,
            isAuthenticated: !!user,
            loading: { isLoading: false, error: null },
          });
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            loading: { isLoading: false, error: null },
          });
        }
      },

      clearError: () => {
        set((state) => ({
          loading: { ...state.loading, error: null },
        }));
      },

      setLoading: (isLoading: boolean, error?: string) => {
        set({
          loading: { isLoading, error: error || null },
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Authentication Service Class for additional business logic
export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Business logic methods
  async validateLoginForm(credentials: LoginRequest): Promise<string[]> {
    const errors: string[] = [];

    if (!credentials.email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(credentials.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!credentials.password) {
      errors.push('Password is required');
    } else if (credentials.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return errors;
  }

  async validateRegistrationForm(userData: RegisterRequest): Promise<string[]> {
    const errors: string[] = [];

    if (!userData.firstName.trim()) {
      errors.push('First name is required');
    }

    if (!userData.lastName.trim()) {
      errors.push('Last name is required');
    }

    if (!userData.email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(userData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!userData.password) {
      errors.push('Password is required');
    } else {
      const passwordErrors = this.validatePassword(userData.password);
      errors.push(...passwordErrors);
    }

    if (!userData.phoneNumber) {
      errors.push('Phone number is required');
    } else if (!this.isValidPhoneNumber(userData.phoneNumber)) {
      errors.push('Please enter a valid phone number');
    }

    if (!userData.role) {
      errors.push('Please select a role');
    }

    return errors;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  private validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return errors;
  }

  // Helper methods
  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  }

  getCurrentUser(): UserDto | null {
    return useAuthStore.getState().user;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  isVet(): boolean {
    return this.hasRole('VET');
  }

  isPetOwner(): boolean {
    return this.hasRole('PET_OWNER');
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isShelter(): boolean {
    return this.hasRole('SHELTER');
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 
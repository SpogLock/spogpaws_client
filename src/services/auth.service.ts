// Authentication Service - Business Logic Layer
// Updated for Spogpaws API structure
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  IAuthRepository,
  UserDto,
  LoginRequest,
  RegisterRequest,
  LoadingState,
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
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<UserDto | null>;
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
          
          if (response.status === 'success' && response.data) {
            const { email, name, role, user_id } = response.data;
            const user: UserDto = { id: user_id, email, name, role };
            
            // Store user data
            if (typeof window !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(user));
            }
            
            set({
              user,
              isAuthenticated: true,
              loading: { isLoading: false, error: null },
            });
            return user;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            loading: { isLoading: false, error: errorMessage },
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      register: async (userData: RegisterRequest): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const response = await authRepo.register(userData);
          
          if (response.status === 'success') {
            set({ loading: { isLoading: false, error: null } });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({
            loading: { isLoading: false, error: errorMessage },
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
          console.warn('Logout API call failed, but continuing with local logout');
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            loading: { isLoading: false, error: null },
          });
        }
      },

      getCurrentUser: async (): Promise<UserDto | null> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          const response = await authRepo.getCurrentUser();
          
          if (response.status === 'success' && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
            });
            return response.data;
          }
          return null;
        } catch (error: unknown) {
          return null;
        }
      },

      initializeAuth: async (): Promise<void> => {
        const authRepo = repositoryFactory.getAuthRepository();
        
        try {
          set({ loading: { isLoading: true, error: null } });
          
          const response = await authRepo.getCurrentUser();
          
          if (response.status === 'success' && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              loading: { isLoading: false, error: null },
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              loading: { isLoading: false, error: null },
            });
          }
        } catch (error: unknown) {
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

    if (!userData.name.trim()) {
      errors.push('Name is required');
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

    if (!userData.role) {
      errors.push('Please select a role');
    }

    return errors;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isUser(): boolean {
    return this.hasRole('USER');
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 
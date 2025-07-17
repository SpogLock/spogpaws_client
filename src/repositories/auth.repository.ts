// Authentication Repository Implementation
import {
  IAuthRepository,
  IHttpClient,
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  UserDto,
} from '@/types';
import { API_ENDPOINTS } from '@/lib/api-config';

export class AuthRepository implements IAuthRepository {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store tokens after successful login
    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data;
      this.storeTokens(accessToken, refreshToken);
      this.storeUser(user);
      this.httpClient.setAuthToken(accessToken);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );

    // Store tokens after successful registration
    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data;
      this.storeTokens(accessToken, refreshToken);
      this.storeUser(user);
      this.httpClient.setAuthToken(accessToken);
    }

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await this.httpClient.post<ApiResponse<void>>(
        API_ENDPOINTS.AUTH.LOGOUT
      );

      // Clear local storage regardless of API response
      this.clearAuthData();
      this.httpClient.removeAuthToken();

      return response;
    } catch (error) {
      // Even if logout fails on server, clear local data
      this.clearAuthData();
      this.httpClient.removeAuthToken();
      throw error;
    }
  }

  async refreshToken(token: RefreshTokenRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REFRESH,
      token
    );

    // Update stored tokens
    if (response.success && response.data) {
      const { accessToken, refreshToken, user } = response.data;
      this.storeTokens(accessToken, refreshToken);
      this.storeUser(user);
      this.httpClient.setAuthToken(accessToken);
    }

    return response;
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.httpClient.post<ApiResponse<void>>(
      `${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`
    );
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return this.httpClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.httpClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword }
    );
  }

  async getCurrentUser(): Promise<ApiResponse<UserDto>> {
    return this.httpClient.get<ApiResponse<UserDto>>(
      API_ENDPOINTS.AUTH.CURRENT_USER
    );
  }

  // Helper methods for token management
  private storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  private storeUser(user: UserDto): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  // Utility methods for checking auth state
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      return !!token && !this.isTokenExpired(token);
    }
    return false;
  }

  getStoredUser(): UserDto | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshTokenValue(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      // If we can't parse the token, consider it expired
      return true;
    }
  }

  // Method to initialize auth state on app load
  async initializeAuth(): Promise<UserDto | null> {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }

    if (this.isTokenExpired(token)) {
      const refreshToken = this.getRefreshTokenValue();
      if (refreshToken) {
        try {
          const response = await this.refreshToken({ refreshToken });
          return response.data?.user || null;
        } catch (error) {
          this.clearAuthData();
          return null;
        }
      } else {
        this.clearAuthData();
        return null;
      }
    }

    // Token is valid, set it and get current user
    this.httpClient.setAuthToken(token);
    
    try {
      const response = await this.getCurrentUser();
      if (response.success && response.data) {
        this.storeUser(response.data);
        return response.data;
      }
    } catch (error) {
      // If getting current user fails, clear auth data
      this.clearAuthData();
      this.httpClient.removeAuthToken();
    }

    return null;
  }
} 
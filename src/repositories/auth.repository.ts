// Authentication Repository Implementation
// Updated to match documented Spogpaws API structure
import {
  IAuthRepository,
  IHttpClient,
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserDto,
  UpdateUserRequest,
  ResetPasswordRequest,
} from '@/types';
import { API_ENDPOINTS } from '@/lib/api-config';

export class AuthRepository implements IAuthRepository {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.USER.LOGIN,
      credentials
    );

    // Store token after successful login if response indicates success
    if (response.status === 'success' && response.data) {
      const { token } = response.data;
      this.storeToken(token);
      this.httpClient.setAuthToken(token);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await this.httpClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.USER.SIGNUP,
      userData
    );

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      // Clear local storage regardless of API response since there's no logout endpoint documented
      this.clearAuthData();
      this.httpClient.removeAuthToken();

      // Return a success response since logout is local
      return {
        status: 'success',
        statusCode: 200,
        message: 'Logout successful'
      };
    } catch (error) {
      // Even if logout fails, clear local data
      this.clearAuthData();
      this.httpClient.removeAuthToken();
      throw error;
    }
  }

  async getCurrentUser(): Promise<ApiResponse<UserDto>> {
    // Since there's no specific current user endpoint documented, 
    // we'll return the stored user data
    const user = this.getStoredUser();
    if (user) {
      return {
        status: 'success',
        statusCode: 200,
        message: 'User retrieved successfully',
        data: user
      };
    } else {
      return {
        status: 'error',
        statusCode: 401,
        message: 'No user found'
      };
    }
  }

  async getAllUsers(): Promise<ApiResponse<UserDto[]>> {
    return this.httpClient.get<ApiResponse<UserDto[]>>(
      API_ENDPOINTS.USER.GET_ALL
    );
  }

  async updateUser(userId: number, data: UpdateUserRequest): Promise<ApiResponse<UserDto>> {
    return this.httpClient.post<ApiResponse<UserDto>>(
      API_ENDPOINTS.USER.UPDATE(userId),
      data
    );
  }

  async deleteUser(userId: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.USER.DELETE(userId)
    );
  }

  async resetPassword(userId: number, data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return this.httpClient.put<ApiResponse<void>>(
      API_ENDPOINTS.USER.RESET_PASSWORD(userId),
      data
    );
  }

  // Helper methods for token management
  private storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
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
      localStorage.removeItem('user');
    }
  }

  // Utility methods for checking auth state
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      return !!token;
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

  // Method to initialize auth state on app load
  async initializeAuth(): Promise<UserDto | null> {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }

    // Set token and get stored user
    this.httpClient.setAuthToken(token);
    const user = this.getStoredUser();
    
    return user;
  }
} 
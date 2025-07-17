// HTTP Client implementation with authentication and error handling
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpClient, IApiConfig, ApiResponse, ApiError } from '@/types';

export class HttpClient implements IHttpClient {
  private client: AxiosInstance;
  private config: IApiConfig;

  constructor(config: IApiConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp for cache busting if needed
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`📥 ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const newToken = await this.refreshAccessToken(refreshToken);
              if (newToken) {
                this.setAuthToken(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            // Redirect to login or handle refresh failure
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        // Retry logic for network errors
        if (this.shouldRetry(error) && this.getRetryCount(originalRequest) < this.config.retryAttempts) {
          this.incrementRetryCount(originalRequest);
          await this.delay(this.config.retryDelay * this.getRetryCount(originalRequest));
          return this.client(originalRequest);
        }

        const apiError = this.transformError(error);
        console.error('API Error:', apiError);
        return Promise.reject(apiError);
      }
    );
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response || 
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT' ||
      (error.response?.status >= 500)
    );
  }

  private getRetryCount(config: any): number {
    return config.__retryCount || 0;
  }

  private incrementRetryCount(config: any): void {
    config.__retryCount = this.getRetryCount(config) + 1;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private transformError(error: any): ApiError {
    if (error.response?.data) {
      return {
        message: error.response.data.message || 'An error occurred',
        code: error.response.data.code || error.response.status.toString(),
        field: error.response.data.field,
      };
    }

    if (error.code === 'NETWORK_ERROR') {
      return {
        message: 'Network error - please check your internet connection',
        code: 'NETWORK_ERROR',
      };
    }

    if (error.code === 'TIMEOUT') {
      return {
        message: 'Request timeout - please try again',
        code: 'TIMEOUT',
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await axios.post(`${this.config.baseUrl}/auth/refresh`, {
        refreshToken,
      });
      
      const newToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', newToken);
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  }

  private handleAuthFailure(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  // Public methods implementing IHttpClient interface
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  }

  removeAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
  }

  // Additional utility methods
  setBaseURL(baseURL: string): void {
    this.client.defaults.baseURL = baseURL;
  }

  setTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout;
  }

  addRequestInterceptor(
    onFulfilled?: (config: any) => any,
    onRejected?: (error: any) => any
  ): number {
    return this.client.interceptors.request.use(onFulfilled, onRejected);
  }

  addResponseInterceptor(
    onFulfilled?: (response: AxiosResponse) => AxiosResponse,
    onRejected?: (error: any) => any
  ): number {
    return this.client.interceptors.response.use(onFulfilled, onRejected);
  }

  removeInterceptor(type: 'request' | 'response', id: number): void {
    this.client.interceptors[type].eject(id);
  }
} 
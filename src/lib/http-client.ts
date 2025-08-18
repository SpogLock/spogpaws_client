// HTTP Client implementation for Spogpaws API
// Updated to match documented API response structure
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IHttpClient, IApiConfig, ApiResponse } from '@/types';

interface RetryConfig extends AxiosRequestConfig {
  __retryCount?: number;
}

interface ApiError extends AxiosError {
  code?: string;
}

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

        // Handle token expiration (401 unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          this.handleAuthFailure();
          return Promise.reject(error);
        }

        // Retry logic for network errors
        if (this.shouldRetry(error) && this.getRetryCount(originalRequest) < this.config.retryAttempts) {
          this.incrementRetryCount(originalRequest);
          await this.delay(this.config.retryDelay * this.getRetryCount(originalRequest));
          return this.client(originalRequest);
        }

        // Transform error to match API response format
        const apiError = this.transformError(error);
        console.error('API Error:', apiError);
        return Promise.reject(apiError);
      }
    );
  }

  private shouldRetry(error: ApiError): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response || 
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT' ||
      (error.response?.status >= 500)
    );
  }

  private getRetryCount(config: RetryConfig): number {
    return config.__retryCount || 0;
  }

  private incrementRetryCount(config: RetryConfig): void {
    config.__retryCount = this.getRetryCount(config) + 1;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private transformError(error: ApiError): ApiResponse {
    if (error.response?.data) {
      // If response has data in Spogpaws format, return it
      const responseData = error.response.data as Record<string, unknown>;
      if (responseData.status && responseData.statusCode) {
        return {
          status: (responseData.status as string) === 'success' ? 'success' : 'error',
          statusCode: responseData.statusCode as number,
          message: (responseData.message as string) || 'An error occurred'
        };
      }
      
      // Transform to Spogpaws format
      return {
        status: 'error',
        statusCode: error.response.status,
        message: (responseData.message as string) || 'An error occurred'
      };
    }

    if (error.code === 'NETWORK_ERROR') {
      return {
        status: 'error',
        statusCode: 0,
        message: 'Network error - please check your internet connection'
      };
    }

    if (error.code === 'TIMEOUT') {
      return {
        status: 'error',
        statusCode: 0,
        message: 'Request timeout - please try again'
      };
    }

    return {
      status: 'error',
      statusCode: 0,
      message: error.message || 'An unexpected error occurred'
    };
  }

  private handleAuthFailure(): void {
    localStorage.removeItem('accessToken');
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

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
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
} 